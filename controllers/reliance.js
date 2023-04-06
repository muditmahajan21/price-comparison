const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;

const getProductsFromReliance = async ({
  search,
  sortType,
  websites,
  isSecondHand,
  limit,
}) => {
  // Visit the amazon website and search for the product
  const response = await axios.get(
      `${baseUrls.RELIANCE}?${searchParams.RELIANCE}=${search}:${sortValues.RELIANCE[sortType]}`, {
        headers: {
          Accept: "application/json",
          "User-Agent": "axios 0.21.1"
        }
      });
      // Load the HTML content of the page
      const $ = cheerio.load(response.data);
      // Get the products from the page
      const products = $('.sp__product');
      // Array to store the products
      const productsArray = [];
      // console.log(products.length);
      // Loop through the products
      for (let i = 0; i < products.length && productsArray.length < limit; i++) {
        // Get the product
        const product = products[i];
        
        // Get the product name
        const name = $(product).find('.sp__name').text();
        // Get the product price
        let price = $(product).find('.TextWeb__Text-sc-1cyx778-0 gimCrs');
        
        price = price.text();
        
        // Get the product rating
        let rating = $(product).find('.product.link').text();
        // For rating take the first 3 characters
        // For example, 4.5 out of 5 stars will be 4.5
        rating = rating.substring(0, 3);

        // Get the product url
        // The url is the parent element of the product div
        let url = $(product).parent().attr('href');
        // Prefix the base url to the url
        url = `https://www.reliancedigital.in${url}`;
        // If the product name, price and url are present, push the product to the array
        // if (name && price && rating && url) {
          productsArray.push({
            name,
            price,
            rating,
            url,
            website: websites.RELIANCE,
          });
        // }
      }
        
      // Return the products array
      return productsArray;
    }

// Export the function
module.exports = getProductsFromReliance;