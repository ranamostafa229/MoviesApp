import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
import axios from "axios";
import SingleDetails from "../../components/SingleDetails/SingleDetails";
import { img_500, unavailable } from "../../config/config";
import preloader from "../../assets/preloader.svg";
import CarouselSec from "../../components/Carousel/CarouselSec";

const Details = () => {
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { type } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );

      setContent(data);
      console.log("details");
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return !loading ? (
    <Container
      className="container"
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {content && (
        <SingleDetails
          poster_path={
            content.poster_path
              ? `${img_500}/${content.poster_path}`
              : unavailable
          }
          title={content.name || content.title}
          date={(
            content.first_air_date ||
            content.release_date ||
            "-----"
          ).substring(0, 4)}
          tagline={content.tagline}
          overview={content.overview}
          genres={content.genres}
          runtime={content.runtime}
          media_type={type}
          id={id}
        />
      )}
      <hr
        style={{
          width: "1100px",
          borderColor: "black",
          marginTop: "35px",
        }}
      />
      <div
        style={{
          borderLeft: "2px solid #e4d804",
          padding: "8px",
          fontSize: "25px",
          fontWeight: "500",
        }}
      >
        <span>Cast & Actors</span>
      </div>
      <div>
        <CarouselSec media_type={type} id={id} />
      </div>
    </Container>
  ) : (
    <div className="loading">
      <img className="loader" src={preloader} alt="" />
    </div>
  );
};

export default Details;
