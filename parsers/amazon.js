const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;
const classNames = require('../consts').classNames;
const websites = require('../consts').websites;

const getProductsFromAmazon = async ({
  search,
  sortType,
  limit,
}) => {
  try {
    const response = await axios.get(
      `${baseUrls.AMAZON}?${searchParams.AMAZON}=${search}&${sortValues.AMAZON[sortType]}`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "axios 0.21.1"
      }
    });
    // Load the HTML content of the page
    const $ = cheerio.load(response.data);
    // Get the products from the page
    const products = $(classNames.AMAZON.PRODUCTS);
    // Array to store the products
    const productsArray = [];

    // Loop through the products
    for (let i = 0; i < products.length && productsArray.length < limit; i++) {
      // Get the product
      const product = products[i];

      // Get the product name
      const name = $(product).find(classNames.AMAZON.NAME).text();
      // Get the product price
      let price = $(product).find(classNames.AMAZON.PRICE).text();

      // Convert price from en-In number format to number
      price = Number(price.replace(/[^0-9.-]+/g, ''));

      // Get the product rating
      let rating = $(product).find(classNames.AMAZON.RATING).text();
      // For rating take the first 3 characters
      // For example, 4.5 out of 5 stars will be 4.5
      rating = rating.substring(0, 3);

      // Convert rating from en-In number format to number
      rating = Number(rating.replace(/[^0-9.-]+/g, ''));

      // Get the product url
      let url = $(product).find(classNames.AMAZON.URL).attr('href');
      // Prefix the base url to the url
      url = `https://www.amazon.in${url}`;

      // If the product name, price and url are present, push the product to the array
      if (name && price) {
        productsArray.push({
          name,
          price,
          rating,
          url,
          website: websites.AMAZON,
        });
      }
    }
    // Return the products array
    return productsArray;
  } catch (error) {
    console.error(error);
  }
}
// Export the function
module.exports = getProductsFromAmazon;