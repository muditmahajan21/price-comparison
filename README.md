# Price Comparison API

A price Comparison API as part of Durinpay Assignment.

**Postman Documentation: [Postman Collection](https://www.postman.com/minor-project-juit/workspace/price-comparison/collection/13813135-c12aa3d4-9e53-43f2-ab1d-2fc82a368aa8?action=share&creator=13813135)**

**Hosted URL: [Backend Link](https://price-comparison-durinpay.cyclic.app)**

### Tools / Tech Used:
+ Backend: NodeJS / ExpressJS
+ Database: MongoDB
+ Hosted On: Cyclic

## Features
+ Scrapes across five websites
  + AMAZON
  + FLIPKART
  + SNAPDEAL
  + NYKAA
  + RELIANCE DIGITAL STORE
+ Sorts the products based on
  + PRICE_HIGH_TO_LOW
  + PRICE_LOW_TO_HIGH
  + HIGHEST_REVIEW
+ Scrapes the following data points
  + Name of the product
  + Price
  + URL of the product 
  + Rating

## Limitations
+ Not perfect parsing because some products in some websites do not have all the necessary information.
  + For example, sometimes in Nykaa's results there will be no rating mentioned in the results page.
+ Not all products are available on on sites so some websites might not show up for some search queries.
  + For example, results for laptop on Nykaa will be unexpected.

## Scope of Improvement
+ Add multiple methods of parsing on websites to make parsers more robust.
+ Refactor the application to Typescript / NestJS.
+ Optimise the API performance.