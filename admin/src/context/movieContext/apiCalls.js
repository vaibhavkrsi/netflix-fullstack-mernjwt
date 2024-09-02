import axios from "axios";
import {
  createMovieFailure,
  createMovieStart,
  createMovieSuccess,
  deleteMovieFailure,
  deleteMovieStart,
  deleteMovieSuccess,
  getMoviesFailure,
  getMoviesStart,
  getMoviesSuccess,
} from "./MovieActions";

export const getMovies = async (dispatch) => {
  dispatch(getMoviesStart());

  // Retrieve the token from localStorage
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  try {
    const res = await axios.get("http://localhost:8080/api/movies", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(getMoviesSuccess(res.data));
  } catch (err) {
    dispatch(getMoviesFailure());
  }
};

export const deleteMovie = async (id, dispatch) => {
  dispatch(deleteMovieStart());

  // Retrieve the token from localStorage
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  try {
    await axios.delete("http://localhost:8080/api/movies/" + id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(deleteMovieSuccess(id));
  } catch (err) {
    dispatch(deleteMovieFailure());
  }
};

export const createMovie = async (movie, dispatch) => {
  dispatch(createMovieStart());
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;

  try {
    const res = await axios.post("http://localhost:8080/api/movies", movie, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(createMovieSuccess(res.data));
  } catch (err) {
    dispatch(createMovieFailure());
  }
};
