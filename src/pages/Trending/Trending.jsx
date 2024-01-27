import React, { useEffect, useState } from "react";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import axios from "axios";
import SingleContent from "../../components/SingleContent/SingleContent";
import "./Trending.css";
import preloader from "../../assets/preloader.svg";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrending = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
      );
      console.log(data);
      setContent(data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, [page]);
  return !loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Trending Now</h1>
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              date={item.release_date || item.first_air_date}
              title={item.title || item.name}
              poster={item.poster_path}
              media_type={item.media_type}
              vote_average={item.vote_average}
            />
          ))}
      </div>

      <CustomPagination setPage={setPage} />
    </div>
  ) : (
    <div className="loading">
      <img className="loader" src={preloader} alt="" />
    </div>
  );
};

export default Trending;
