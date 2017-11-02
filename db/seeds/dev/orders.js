exports.seed = function(knex, Promise) {
  return knex('order_history').del().then(function() {
    return knex('order_history').insert([
      {
        total_price: 679.67,
        date: '2017-11-02T22:00:27.666Z'
      },
      {
        total_price: 789.0,
        date: '2016-08-02T22:00:40.196Z'
      },
      {
        total_price: 1034.45,
        date: '2012-01-02T22:00:27.921Z'
      },
      {
        total_price: 267.87,
        date: '2008-07-02T22:00:27.164Z'
      }
    ]);
  });
};
