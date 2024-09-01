const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const List = require('../models/List');
const listRouter = require('../routes/lists');
const verify = require('../routes/verifyToken');

// Mock verify middleware to simulate authenticated admin user
jest.mock('../routes/verifyToken', () => (req, res, next) => {
  req.user = { isAdmin: true };
  next();
});

const app = express();
app.use(express.json());
app.use('/api/lists', listRouter);

beforeAll(async () => {
  const mongoURI = 'mongodb+srv://vsingh:vsingh@cluster0.glxscoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Change to your test database URI
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('List CRUD operations', () => {
  let listId;

  it('should create a new list', async () => {
    const newList = { title: 'Test List', type: 'movie', genre: 'action' };
    const res = await request(app).post('/api/lists').send(newList);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    listId = res.body._id;  
  });

  it('should get lists', async () => {
    const res = await request(app).get('/api/lists');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should delete the list', async () => {
    const res = await request(app).delete(`/api/lists/${listId}`);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toEqual('The list has been delete...');
  });
});
