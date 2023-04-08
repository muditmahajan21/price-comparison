const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;
const classNames = require('../consts').classNames;
const websites = require('../consts').websites;

const getProductsFromReliance = async ({
  search,
  sortType,
  limit,
}) => {
  try {
    const url = `${baseUrls.RELIANCE}?${searchParams.RELIANCE}=${search}&${sortValues.RELIANCE[sortType]}`;
    const response = await axios.get(
      url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1"
      }
    });
    const $ = cheerio.load(response.data);
    const products = $(classNames.RELIANCE.PRODUCTS);
    const productsArray = [];
    for (let i = 0; i < products.length && productsArray.length < limit; i++) {
      const product = products[i];

      const name = $(product).find(classNames.RELIANCE.NAME).text();
      let price = $(product).find(classNames.RELIANCE.PRICE).text();
      
      // Take the first number present between the ₹ symbols4
      price = price.match(/(?<=₹)(.*?)(?=₹)/g);

      price = Number(price[0].replace(/[^0-9.-]+/g, ''));
      
      let rating = $(product)?.find(classNames.RELIANCE.RATING)?.text();
      rating = rating?.substring(0, 3);
      let url = $(product).parent().attr('href');
      url = `https://www.reliancedigital.in${url}`;
      // if (name && price) {
        productsArray.push({
          name,
          price,
          rating,
          url,
          website: websites.RELIANCE,
        });
      // }
    }
    return productsArray;
  } catch (error) {
    console.error(error);
  }
}

module.exports = getProductsFromReliance;