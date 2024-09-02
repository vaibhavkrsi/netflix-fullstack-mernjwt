import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/authContext/AuthContext";
import { MovieContextProvider } from "./context/movieContext/MovieContext";
import { ListsContextProvider } from "./context/listContext/ListContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <MovieContextProvider>
        <ListsContextProvider>
          <App />
        </ListsContextProvider>
      </MovieContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
