const websites = {
  AMAZON: 'AMAZON',
  FLIPKART: 'FLIPKART',
  SNAPDEAL: 'SNAPDEAL',
  NYKAA: 'NYKAA',
  RELIANCE: 'RELIANCE',
  ALL: `ALL`,
};

const sortTypes = {
  PRICE_LOW_TO_HIGH: 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW: 'PRICE_HIGH_TO_LOW',
  HIGHEST_REVIEW: 'HIGHEST_REVIEW',
}

const baseUrls = {
  AMAZON: 'https://www.amazon.in/s',
  FLIPKART: 'https://www.flipkart.com/search',
  SNAPDEAL: 'https://www.snapdeal.com/search',
  RELIANCE: 'https://www.reliancedigital.in/search',
  NYKAA: 'https://www.nykaa.com/search/result/',
};

const searchParams = {
  AMAZON: 'k',
  FLIPKART: 'q',
  SNAPDEAL: 'keyword',
  RELIANCE: 'q',
  NYKAA: 'q',
};

const sortValues = {
  AMAZON: {
    PRICE_LOW_TO_HIGH: 's=price-asc-rank',
    PRICE_HIGH_TO_LOW: 's=price-desc-rank',
    HIGHEST_REVIEW: 's=review-rank',
  },
  FLIPKART: {
    PRICE_LOW_TO_HIGH: 'sort=price_asc',
    PRICE_HIGH_TO_LOW: 'sort=price_desc',
    HIGHEST_REVIEW: 'sort=popularity',
  },
  SNAPDEAL: {
    PRICE_LOW_TO_HIGH: 'sort=plth',
    PRICE_HIGH_TO_LOW: 'sort=phtl',
    HIGHEST_REVIEW: 'sort=plrty',
  },
  RELIANCE: {
    PRICE_LOW_TO_HIGH: 'price-asc',
    PRICE_HIGH_TO_LOW: 'price-desc',
    HIGHEST_REVIEW: 'relevance',
  },
  NYKAA: {
    PRICE_LOW_TO_HIGH: 'sort=price_asc',
    PRICE_HIGH_TO_LOW: 'sort=price_desc',
    HIGHEST_REVIEW: 'sort=customer_top_rated',
  },
}

const classNames = {
  AMAZON: {
    PRODUCTS: '.s-result-item',
    NAME: '.a-text-normal',
    PRICE: '.a-price-whole',
    RATING: '.a-icon-alt',
    URL: '.a-link-normal',
  },
  FLIPKART: {
    PRODUCTS: '._2kHMtA',
    NAME: '._4rR01T',
    PRICE: '._30jeq3',
    RATING: '._3LWZlK',
    URL: '._1fQZEK',
  },
  SNAPDEAL: {
    PRODUCTS: '.product-tuple-listing',
    NAME: '.product-title',
    PRICE: '.lfloat.product-price',
    RATING: '.product-rating-count',
    URL: '.dp-widget-link',
  },
  RELIANCE: {
    PRODUCTS: '.sp__product',
    NAME: '.sp__name',
    PRICE: '.TextWeb__Text-sc-1cyx778-0',
    RATING: '.sp__product-rating',
  },
  NYKAA: {
    PRODUCTS: '.productWrapper',
    NAME: '.css-xrzmfa',
    PRICE: '.css-111z9ua',
    RATING: '.a-icon-alt',
    URL: '.css-qlopj4',
  }
}

module.exports = {
  websites,
  sortTypes,
  baseUrls,
  searchParams,
  sortValues,
  classNames,
};