const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;

const getProductsFromSnapdeal = async ({
  search,
  sortType,
  websites,
  isSecondHand,
  limit,
}) => {
  // Visit the amazon website and search for the product
  const response = await axios.get(
    `${baseUrls.SNAPDEAL}?${searchParams.SNAPDEAL}=${search}&${sortValues.SNAPDEAL[sortType]}`
  );

  const url = `${baseUrls.SNAPDEAL}?${searchParams.SNAPDEAL}=${search}&${sortValues.SNAPDEAL[sortType]}`;
  console.log(url);
  // Load the HTML content of the page
  const $ = cheerio.load(response.data);

  // Get the products from the page
  const products = $('.product-tuple-listing');

  // Array to store the products
  const productsArray = [];

  // Loop through the products
  for (let i = 0; i < products.length && productsArray.length < limit; i++) {
    // Get the product
    const product = products[i];

    // Get the product name
    const name = $(product).find('.product-title').text();

    // Get the product price
    const price = $(product).find('.lfloat.product-price').text();

    // Get the product rating
    let ratingDiv = $(product).find('.filled-stars');
    // get the width of the div
    // let rating = $(ratingDiv).attr('style');
    // get the rating from the width
    // console.log(ratingDiv);
    //TODO: Get the rating from the width of the div
    const rating = "4.5";
    // For rating take the first 3 characters
    // For example, 4.5 out of 5 stars will be 4.5
    // rating = rating.substring(0, 3);

    // Get the product url
    let url = $(product).find('.dp-widget-link').attr('href');

    // Prefix the base url to the url

    // If the product name, price and url are present, push the product to the array
    if (name && price && rating && url) {
      productsArray.push({
        name,
        price,
        rating,
        url,
        website: websites.SNAPDEAL,
      });
    }
  }

  // Return the products array
  return productsArray;
}

// Export the function
module.exports = getProductsFromSnapdeal;