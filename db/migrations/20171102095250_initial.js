exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('inventory', table => {
      table.increments('id').primary();
      table.string('title');
      table.string('description');
      table.string('image-url');
      table.decimal('price');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('order_history', table => {
      table.increments('id').primary();
      table.decimal('total_price');
      table.string('date');

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('inventory'),
    knex.schema.dropTable('order_history')
  ]);
};
