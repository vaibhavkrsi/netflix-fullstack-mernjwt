import { ArrowBackOutlined } from "@material-ui/icons";
import "./watch.scss";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Watch() {
  const location = useLocation();
  const navigate = useNavigate();
  const movie = location.state?.movie; // Access the movie data from state

  console.log("Location object:", location); // For debugging
  console.log("Movie object:", movie); // For debugging

  return (
    <div className="watch">
      <div className="back" onClick={() => navigate(-1)}>
        <ArrowBackOutlined />
        Home
      </div>
      {movie ? (
        <video
          className="video"
          autoPlay
          progress="true"
          controls
          src={movie.video}
        />
      ) : (
        <p>Movie data not found</p>
      )}
    </div>
  );
}
