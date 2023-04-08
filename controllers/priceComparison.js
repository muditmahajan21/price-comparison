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
    
    products = products.flat();

    products = products.map((product) => {
      product.searchQuery = search;
      product.sortType = sortType;
      return product;
    });
    await Product.insertMany(products);

    // Remove search query and sort type from the products
    products = products.map((product) => {
      delete product.searchQuery;
      delete product.sortType;
      return product;
    });

    res.status(200).json({ products, total_products_considered: products.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = priceComparisonRouter;