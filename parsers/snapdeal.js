const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;
const classNames = require('../consts').classNames;
const websites = require('../consts').websites;

const getProductsFromSnapdeal = async ({
  search,
  sortType,
  limit,
}) => {
  try {
    const url = `${baseUrls.SNAPDEAL}?${searchParams.SNAPDEAL}=${search}&${sortValues.SNAPDEAL[sortType]}`;
    const response = await axios.get(
      url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1"
      }
    }
    );

    const $ = cheerio.load(response.data);

    const products = $(classNames.SNAPDEAL.PRODUCTS);

    const productsArray = [];

    for (let i = 0; i < products.length && productsArray.length < limit; i++) {
      const product = products[i];

      const name = $(product).find(classNames.SNAPDEAL.NAME).text();

      const price = $(product).find(classNames.SNAPDEAL.PRICE).text();

      let ratingDiv = $(product)?.find(classNames.SNAPDEAL.RATING).attr('style');
      let rating = ratingDiv?.substring(6, 9);

      let url = $(product).find(classNames.SNAPDEAL.URL).attr('href');

      if (name && price) {
        productsArray.push({
          name,
          price,
          rating,
          url,
          website: websites.SNAPDEAL,
        });
      }
    }

    return productsArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getProductsFromSnapdeal;