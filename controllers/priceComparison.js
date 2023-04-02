const priceComparisonRouter = require('express').Router();

const getProducts = async (req) => {
  try {
    
  } catch (error) {
    console.log(error); 
  }
} 

priceComparisonRouter.get('/', async (req, res) => {
  const products = await getProducts(req);
  res.json(products);
});

module.exports = priceComparisonRouter;