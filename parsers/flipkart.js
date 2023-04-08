const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;
const classNames = require('../consts').classNames;
const websites = require('../consts').websites;

const getProductsFromFlipkart = async ({
  search,
  sortType,
  limit,
}) => {
  try {
    const response = await axios.get(
      `${baseUrls.FLIPKART}?${searchParams.FLIPKART}=${search}&${sortValues.FLIPKART[sortType]}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": "axios 0.21.1"
        }
      }
    );

    const $ = cheerio.load(response.data);

    const products = $(classNames.FLIPKART.PRODUCTS);

    const productsArray = [];

    for (let i = 0; i < products.length && productsArray.length < limit; i++) {
      const product = products[i];

      const name = $(product).find(classNames.FLIPKART.NAME).text();

      let price = $(product).find(classNames.FLIPKART.PRICE).text();
      // Get all the numbers from the price and convert it to a number from En-In to number
      price = Number(price.replace(/[^0-9]/g, ''));

      let rating = $(product).find(classNames.FLIPKART.RATING).text();
      // Get all the numbers from the rating and convert it to a number from En-In to number
      rating = Number(rating.replace(/[^0-9.-]+/g, ''));
      let url = $(product).find(classNames.FLIPKART.URL).attr('href');
      url = `https://www.flipkart.com${url}`;

      if (name && price) {
        productsArray.push({
          name,
          price,
          rating,
          url,
          website: websites.FLIPKART,
        });
      }
    }

    return productsArray;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getProductsFromFlipkart;