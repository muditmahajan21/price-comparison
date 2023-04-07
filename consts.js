const websites = {
  AMAZON: 'AMAZON',
  FLIPKART: 'FLIPKART',
  SNAPDEAL: 'SNAPDEAL',
  MEESHO: 'MEESHO',
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
  MEESHO: 'https://www.meesho.com/search?searchType=manual&searchIdentifier=text_search',
};

const searchParams = {
  AMAZON: 'k',
  FLIPKART: 'q',
  SNAPDEAL: 'keyword',
  RELIANCE: 'q',
  NYKAA: 'q',
  MEESHO: 'q',
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
  MEESHO: {
    PRICE_LOW_TO_HIGH: 'Sort[sort_by]=price&Sort[sort_order]=asc',
    PRICE_HIGH_TO_LOW: 'Sort[sort_by]=price&Sort[sort_order]=desc',
    HIGHEST_REVIEW: 'Sort[sort_by]=rating&Sort[sort_order]=desc',
  },
}

module.exports = {
  websites,
  sortTypes,
  baseUrls,
  searchParams,
  sortValues,
};