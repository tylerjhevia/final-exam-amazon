const beers = require('../../../co-beer-data');
const breweries = require('../../../co-breweries-data');

exports.seed = (knex, Promise) => {
  return knex('inventory')
    .del()
    .then(() => knex('order_history').del())
    .then(() => {
      let inventoryPromises = [];

      inventory.forEach(item => inventoryPromises.push(createItem(knex, item)));
      return Promise.all(inventoryPromises);
    })
    .then(() => {
      let orderHistoryPromises = [];

      orderHistory.forEach(order => {
        orderHistoryPromises.push(createOrderHistory(knex, orderHistory));
      });
      return Promise.all(orderHistoryPromises);
    })
    .then(() => {
      console.log('Seeding is complete.');
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};

const createItem = (knex, item) => {
  return knex('inventory').insert(item);
};

const createOrderHistory = (knex, orderHistory) => {
  return knex('orderHistory').insert(orderHistory);
};
