const priceComparisonRouter = require('express').Router();
const sortTypes = require('../consts').sortTypes;
const websites = require('../consts').websites;
const getProductsFromAmazon = require('./amazon');
const getProductsFromFlipkart = require('./flipkart');
const getProductsFromSnapdeal = require('./snapdeal');
const getProductsFromReliance = require('./reliance');

priceComparisonRouter.post('/', async (req, res) => {
  try {
    const search = req.body.search;
    const sortType = req.body.sortType;
    let queryWebsiyes = req.body.websites ? req.body.websites : [websites.ALL];
    const isSecondHand = req.body?.isSecondHand ? req.body?.isSecondHand : false;
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
    const products = await Promise.all(
      queryWebsiyes.map(async (website) => {
        switch (website) {
          case websites.AMAZON:
            return await getProductsFromAmazon({
              search,
              sortType,
              websites,
              isSecondHand,
              limit,
            });
          case websites.FLIPKART:
            return await getProductsFromFlipkart({
              search,
              sortType,
              websites,
              isSecondHand,
              limit,
            });
          case websites.SNAPDEAL:
            return await getProductsFromSnapdeal({
              search,
              sortType,
              websites,
              isSecondHand,
              limit,
            });
          case websites.RELIANCE:
            return await getProductsFromReliance({
              search,
              sortType,
              websites,
              isSecondHand,
              limit,
            });
            default:
              return [];
          }
        })
    );    

    res.status(200).json({ search, sortType, websites: queryWebsiyes, isSecondHand, limit, products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = priceComparisonRouter;