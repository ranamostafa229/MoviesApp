import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import useGenres from "../../hooks/useGenre";
import Genres from "../../components/Genres";
import preloader from "../../assets/preloader.svg";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const genreforURL = useGenres(selectedGenres);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&include_adult=false&include_video=false&language=en-US&page=${page}&with_genres=${genreforURL}`
      );

      console.log(data);
      setContent(data.results);
      setNumOfPages(data.total_pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, genreforURL]);
  return !loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>New Movies</h1>
      <Genres
        type="movie"
        setGenres={setGenres}
        genres={genres}
        setSelectedGenres={setSelectedGenres}
        selectedGenres={selectedGenres}
        setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((item) => (
            <SingleContent
              key={item.id}
              id={item.id}
              date={item.release_date || item.first_air_date}
              title={item.title || item.name}
              poster={item.poster_path}
              original_language={item.original_language}
              vote_average={item.vote_average}
              media_type="movie"
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  ) : (
    <div className="loading">
      <img className="loader" src={preloader} alt="" />
    </div>
  );
};

export default Movies;
