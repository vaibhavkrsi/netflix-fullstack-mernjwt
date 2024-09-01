import { useEffect, useState } from "react";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import axios from "axios";
import React from "react";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/lists/`, {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MWJhZWY2ZjI4MTFhMWU0MWVkZTVlNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcyNTE0NTU5OCwiZXhwIjoxNzI1NTc3NTk4fQ.ttRfXtTZldsFQw8MLWFDvLCwkSLJQcs0vn6-9cZ-mxY",
          },
        });
        setLists(res.data);
      } catch (err) {
        console.log("Error response:", err.response); // Log the entire error response
        console.log("Error message:", err.message); // Log the error message
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;
