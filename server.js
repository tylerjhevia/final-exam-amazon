const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'th_amazon_bay';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/inventory', (request, response) => {
  return db('inventory')
    .select()
    .then(inventory => response.status(200).json(inventory))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/inventory', (request, response) => {
  const item = request.body;

  const keys = ['title', 'description', 'image-url', 'price'];

  for (const requiredParameter of keys) {
    if (!item[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {'title': <string>, 'description': <string>, 'image-url': <string>, 'price': <number>}. The request is missing the following property: ${requiredParameter}.`
      });
    }
  }

  db('inventory')
    .insert(item, '*')
    .then(item => response.status(201).json(item))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/order_history', (request, response) => {
  return db('order_history')
    .select()
    .then(orderHistory => response.status(200).json(orderHistory))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/order_history', (request, response) => {
  const order = request.body;

  const keys = ['total_price', 'date'];

  for (const requiredParameter of keys) {
    if (!order[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {'total_price': <number>, 'date': <string>}. The request is missing the following property: ${requiredParameter}.`
      });
    }
  }

  db('order_history')
    .insert(order, '*')
    .then(order => response.status(201).json(order))
    .catch(error => response.status(500).json({ error }));
});
