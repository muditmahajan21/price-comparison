const websites = {
  AMAZON: 'AMAZON',
  FLIPKART: 'FLIPKART',
  SNAPDEAL: 'SNAPDEAL',
  MEESHO: 'MEESHO',
  MYNTRA: 'MYNTRA',
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
  MEESHO: 'https://www.meesho.com/search?searchType=manual&searchIdentifier=text_search',
  MYNTRA: 'https://www.myntra.com/',
};

const searchParams = {
  AMAZON: 'k',
  FLIPKART: 'q',
  SNAPDEAL: 'keyword',
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
  MEESHO: {
    PRICE_LOW_TO_HIGH: 'Sort[sort_by]=price&Sort[sort_order]=asc',
    PRICE_HIGH_TO_LOW: 'Sort[sort_by]=price&Sort[sort_order]=desc',
    HIGHEST_REVIEW: 'Sort[sort_by]=rating&Sort[sort_order]=desc',
  },
  MYNTRA: {
    PRICE_LOW_TO_HIGH: 'sort=price_asc',
    PRICE_HIGH_TO_LOW: 'sort=price_desc',
    HIGHEST_REVIEW: 'sort=Customer Rating',
  },
}

module.exports = {
  websites,
  sortTypes,
  baseUrls,
  searchParams,
  sortValues,
};