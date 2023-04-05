const axios = require('axios');
const cheerio = require('cheerio');
const baseUrls = require('../consts').baseUrls;
const searchParams = require('../consts').searchParams;
const sortValues = require('../consts').sortValues;

const getProductsFromFlipkart = async ({
  search,
  sortType,
  websites,
  isSecondHand,
  limit,
}) => {
  const response = await axios.get(
    `${baseUrls.FLIPKART}?${searchParams.FLIPKART}=${search}&${sortValues.FLIPKART[sortType]}`,
  );
  const url = `${baseUrls.FLIPKART}?${searchParams.FLIPKART}=${search}&${sortValues.FLIPKART[sortType]}`;
  console.log(url);

  const $ = cheerio.load(response.data);

  const products = $('._2kHMtA');

  const productsArray = [];

  for (let i = 0; i < products.length && productsArray.length < limit; i++) {
    const product = products[i];
    
    const name = $(product).find('._4rR01T').text();

    const price = $(product).find('._30jeq3').text();

    const rating = $(product).find('._3LWZlK').text();

    let url = $(product).find('._1fQZEK').attr('href');
    url = `https://www.flipkart.com${url}`;

    // if (name && price && rating && url) {
      productsArray.push({
        name,
        price,
        rating,
        url,
        website: websites.FLIPKART,
      });
    // }
  }

  return productsArray;
};

module.exports = getProductsFromFlipkart;