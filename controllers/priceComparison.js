const priceComparisonRouter = require('express').Router();
const Product = require('../models/product');
const sortTypes = require('../consts').sortTypes;
const websites = require('../consts').websites;
const getProductsFromAmazon = require('../parsers/amazon');
const getProductsFromFlipkart = require('../parsers/flipkart');
const getProductsFromSnapdeal = require('../parsers/snapdeal');
const getProductsFromReliance = require('../parsers/reliance');
const getProductsFromNykaa = require('../parsers/nykaa');

priceComparisonRouter.post('/', async (req, res) => {
  try {
    const search = req.body.search;
    const sortType = req.body.sortType;
    let queryWebsiyes = req.body.websites ? req.body.websites : [websites.ALL];
    const limit = req.body?.limit ? req.body?.limit : 3;

    if (!search) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    if (!sortType) {
      return res.status(400).json({ error: 'Sort type is required' });
    }

    if (!queryWebsiyes) {
      return res.status(400).json({ error: 'Websites are required' });
    }

    // If the sortType is not present in consts.js, return error
    if (!sortTypes[sortType]) {
      return res.status(400).json({ error: 'Invalid sort type' });
    }

    // If the websites are not present in consts.js, return error
    for (let i = 0; i < queryWebsiyes.length; i++) {
      if (!websites[queryWebsiyes[i]]) {
        return res.status(400).json({ error: 'Invalid website' });
      }
    }

    // Max limit is 10 and minimum is 1
    if (limit > 10 || limit < 1) {
      return res.status(400).json({ error: 'Limit should be between 1 and 10' });
    }

    // If any of the websites is all then set it to all the websites and remove all from the array
    if (queryWebsiyes.includes(websites.ALL)) {
      queryWebsiyes = Object.values(websites);
      queryWebsiyes.splice(queryWebsiyes.indexOf(websites.ALL), 1);
    }

    // Check in the databse if the search query and sort type is already present according to the limit
    // If it is present, return the products from the database instead of scraping the websites again
    // Also take care of the websites to include all the ones mentioned in the request

    // If the search query and sort type is already present in the database
    console.log('Getting products from database');
    const productsFromDatabase = await Product.find({
      searchQuery: search,
      sortType: sortType,
      website: { $in: queryWebsiyes },
    })
      .limit(limit * websites.length);

    // Get all the websites used found in the database for the search query and sort type
    const websitesUsed = productsFromDatabase.map((product) => product.website);
    // Get the websites that are not used in the database
    const websitesNotUsed = queryWebsiyes.filter((website) => !websitesUsed.includes(website));

    if (websitesNotUsed.length === 0) {
      productsFromDatabase.sort((a, b) => {
        if (sortType === sortTypes.PRICE_LOW_TO_HIGH) {
          return a.price - b.price;
        } else if (sortType === sortTypes.PRICE_HIGH_TO_LOW) {
          return b.price - a.price;
        } else if (sortType === sortTypes.RATING) {
          return b.rating - a.rating;
        }
      });

      if (productsFromDatabase.length >= limit) {
        // Remove searchQuery and sortType from the products and add total_products_considered
        let productsToSend = productsFromDatabase.map((product) => {
          return {
            name: product.name,
            url: product.url,
            rating: product.rating,
            price: product.price,
            website: product.website,
          }
        });
        const total = productsToSend.length;
        productsToSend = productsToSend.slice(0, limit);
        res.status(200).json({ productsToSend, total_products_considered: total });
        return;
      }
    }

    // Put the websites that are not used in the database in the queryWebsites array
    queryWebsiyes = websitesNotUsed;
    console.log('Scraping websites', queryWebsiyes);
    // For each website, get the products from that website
    let products = await Promise.all(
      queryWebsiyes.map(async (website) => {
        switch (website) {
          case websites.AMAZON:
            return await getProductsFromAmazon(req.body);
          case websites.FLIPKART:
            return await getProductsFromFlipkart(req.body);
          case websites.SNAPDEAL:
            return await getProductsFromSnapdeal(req.body);
          case websites.RELIANCE:
            return await getProductsFromReliance(req.body);
          case websites.NYKAA:
            return await getProductsFromNykaa(req.body);
            default:
              return [];
          }
        })
    );    
    
    // Add the products from the database to the products array

    products = products.flat();
    products = products.map((product) => {
      product.searchQuery = search;
      product.sortType = sortType;
      return product;
    });
    console.log('Saving products to database');
    await Product.insertMany(products);

    // Remove search query and sort type from the products
    products = products.map((product) => {
      delete product.searchQuery;
      delete product.sortType;
      return product;
    });
    
    products = products.concat(productsFromDatabase);

    // Sort the products according to the sort type
    products.sort((a, b) => {
      if (sortType === sortTypes.PRICE_LOW_TO_HIGH) {
        return a.price - b.price;
      } else if (sortType === sortTypes.PRICE_HIGH_TO_LOW) {
        return b.price - a.price;
      } else if (sortType === sortTypes.RATING) {
        return b.rating - a.rating;
      }
    });

    const total = products.length;
    // Limit the products to the limit mentioned in the request
    products = products.slice(0, limit);

    res.status(200).json({ products, total_products_considered: total });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = priceComparisonRouter;