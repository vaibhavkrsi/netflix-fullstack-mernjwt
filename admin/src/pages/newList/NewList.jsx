import { useContext, useEffect, useState } from "react";
import "./newList.css";
import storage from "../../firebase";
import { uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { createMovie, getMovies } from "../../context/movieContext/apiCalls";
import { ListContext } from "../../context/listContext/ListContext";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { createList } from "../../context/listContext/apiCalls";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function NewList() {
  const [list, setList] = useState(null);

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useHistory();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };
  console.log(list);

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history.push("/lists");
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Popular Movies"
            onChange={handleChange}
          />
        </div>

        <div className="addProductItem">
          <label>Year</label>
          <input type="text" id="year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input
            type="text"
            id="genre"
            name="genre"
            placeholder="action"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" id="limit" name="limit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Type</label>
          <select name="type" onChange={handleChange}>
            <option>Type</option>
            <option value="movie">Movie</option>
            <option value="series">Series</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Content</label>
          <select multiple name="content" onChange={handleSelect}>
            {movies.map((movie) => {
              return (
                <option key={movie._id} value={movie._id}>
                  {movie.title}
                </option>
              );
            })}
          </select>
        </div>

        <button className="addProductButton" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </div>
  );
}
