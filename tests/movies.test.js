const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const movieRouter = require('../routes/movies'); 
const verify = require('../routes/verifyToken'); 



jest.mock('../routes/verifyToken', () => (req, res, next) => {
  req.user = { isAdmin: true };
  next();
});

const app = express();
app.use(express.json());
app.use('/api/movies', movieRouter);

beforeAll(async () => {
  const mongoURI = 'mongodb+srv://vsingh:vsingh@cluster0.glxscoj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Movies CRUD operations', () => {
  let movieId;

  it('should create a new movie', async () => {
    const newMovie = {
      title: "Flash 20",
      desc: "Flash is a movie in which people can't recognize a man without sunglasses",
      img: "https://images.pexels.com/photos/1388069/pexels-photo-1388069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      imgSm: "https://images.pexels.com/photos/1388069/pexels-photo-1388069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      imgTitle: "Superman",
      trailer: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      year: "2024",
      limit: "16",
      genre: "comedy, action",
      isSeries: true
    };
    const res = await request(app).post('/api/movies').send(newMovie);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    movieId = res.body._id;
  });

  it('should get movies', async () => {
    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should return a random movie', async () => {
    const res = await request(app).get('/api/movies/random');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should delete the movie', async () => {
    const res = await request(app).delete(`/api/movies/${movieId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual('The movie has been deleted...');
  });
});
