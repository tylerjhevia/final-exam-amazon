const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Inventory', () => {
  beforeEach(done => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => done())
      .catch(error => console.log(error));
  });
  beforeEach(done => {
    database.seed
      .run()
      .then(() => {
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  describe('GET /api/v1/inventory', () => {
    it('should fetch all items in inventory', done => {
      chai.request(server).get('/api/v1/inventory').end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('title');
        response.body[0].title.should.be.a('string');
        response.body[0].should.have.property('description');
        response.body[0].description.should.be.a('string');
        response.body[0].should.have.property('url');
        response.body[0].url.should.be.a('string');
        response.body[0].should.have.property('price');
        parseInt(response.body[0].price).should.be.a('number');
        done();
      });
    });
  });

  describe('POST /api/v1/inventory', () => {
    it('should add a new inventory item to database', done => {
      chai.request(server).get('/api/v1/inventory').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(4);
      });

      chai
        .request(server)
        .post('/api/v1/inventory')
        .send({
          title: 'new item',
          description: 'This is a new item',
          url: 'fakeURL.net',
          price: '500.05'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body[0].title.should.equal('new item');
          response.body[0].description.should.equal('This is a new item');
          response.body[0].url.should.equal('fakeURL.net');
          response.body[0].price.should.equal('500.05');
          done();
        });

      chai.request(server).get('/api/v1/inventory').end((error, response) => {
        response.should.have.status(200);
        response.body.length.should.equal(5);
      });
    });
  });
});

describe('Order history', () => {
  beforeEach(done => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => done())
      .catch(error => console.log(error));
  });
  beforeEach(done => {
    database.seed
      .run()
      .then(() => {
        done();
      })
      .catch(error => {
        console.log(error);
      });
  });

  describe('GET /api/v1/order_history', () => {
    it('should fetch all orders in order_history', done => {
      chai.request(server).get('/api/v1/order_history').end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('total_price');
        parseInt(response.body[0].total_price).should.be.a('number');
        response.body[0].should.have.property('date');
        response.body[0].date.should.be.a('string');
        done();
      });
    });
  });

  describe('POST /api/v1/order_history', () => {
    it('should add a new order database', done => {
      chai
        .request(server)
        .get('/api/v1/order_history')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.length.should.equal(4);
        });

      chai
        .request(server)
        .post('/api/v1/order_history')
        .send({
          total_price: '50.65',
          date: '2017-11-02T22:00:27.666Z'
        })
        .end((error, response) => {
          response.should.have.status(201);
          response.body[0].total_price.should.equal('50.65');
          response.body[0].date.should.equal('2017-11-02T22:00:27.666Z');
          done();
        });

      chai
        .request(server)
        .get('/api/v1/order_history')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.length.should.equal(5);
        });
    });
  });
});
