import { Chip } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import Carousel from "react-multi-carousel";

const Genres = ({
  type,
  genres,
  setGenres,
  selectedGenres,
  setSelectedGenres,
  setPage,
}) => {
  const fetchGenres = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/genre/${type}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setGenres(data.genres);
  };

  const handleAdd = (genre) => {
    setSelectedGenres([...selectedGenres, genre]);
    setGenres(genres.filter((item) => item.id !== genre.id));
    setPage(1);
    console.log(genre);
  };
  const handleRemove = (genre) => {
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.id !== genre.id)
    );
    setGenres([...genres, genre]);
    setPage(1);
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGenres([]);
    };
  }, []);

  const items =
    genres &&
    genres.map((genre) => (
      <div style={{ paddingBottom: " 10px " }}>
        <Chip
          sx={{
            margin: "3px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#16151d",
            borderColor: "#e4d804",
            color: "white",
            fontWeight: "bold",

            outlineColor: "#e4d804",
          }}
          label={genre.name}
          key={genre.id}
          clickable
          variant="outlined"
          size="medium"
          onClick={() => handleAdd(genre)}
        />
      </div>
    ));

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
      slidesToSlide: 7,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 8,
      slidesToSlide: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3,
    },
  };
  return (
    <div>
      {selectedGenres &&
        selectedGenres.map((genre) => (
          <Chip
            sx={{
              margin: "3px",
              backgroundColor: "#e4d804",
              borderColor: "#e4d804",
              color: "white",
              fontWeight: "bold",
            }}
            label={genre.name}
            key={genre.id}
            color="error"
            clickable
            size="medium"
            onDelete={() => handleRemove(genre)}
          />
        ))}
      <div>
        <Carousel
          swipeable={true}
          draggable={true}
          showDots={false}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
          itemClass="carousel-item-padding-40-px"
        >
          {items}
        </Carousel>
      </div>
    </div>
  );
};

export default Genres;
