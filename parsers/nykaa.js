const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;
const classNames = require('../consts').classNames;
const websites = require('../consts').websites;

const getProductsFromNykaa = async ({
  search,
  sortType,
  limit,
}) => {
  try {
    const response = await axios.get(
      `${baseUrls.NYKAA}?${searchParams.NYKAA}=${search}&${sortValues.NYKAA[sortType]}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1"
      }
    });
    const $ = cheerio.load(response.data);
    const products = $(classNames.NYKAA.PRODUCTS);
    const productsArray = [];

    for (let i = 0; i < products.length && productsArray.length < limit; i++) {
      const product = products[i];

      const name = $(product).find(classNames.NYKAA.NAME).text();
      const price = $(product).find(classNames.NYKAA.PRICE).text();

      let rating = $(product).find(classNames.NYKAA.RATING).text();
      rating = rating.substring(0, 3);

      let url = $(product).find(classNames.NYKAA.URL).attr('href');
      url = `https://www.nykaa.com${url}`;
      if (name && price) {
        productsArray.push({
          name,
          price,
          rating,
          url,
          website: websites.NYKAA,
        });
      }
    }

    return productsArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getProductsFromNykaa;