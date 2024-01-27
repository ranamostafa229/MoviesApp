import { img_300, unavailable } from "../../config/config";
import StarIcon from "@mui/icons-material/Star";
import "./SingleContent.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import VideoModal from "../VideoModal/VideoModal";

const SingleContent = ({
  id,
  title,
  poster,
  date,
  media_type,
  vote_average,
  original_language,
}) => {
  const [video, setVideo] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const fetchVideo = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setVideo(data.results[0]?.key);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <div
      className="content"
      target="__blank"
      href={`https://www.youtube.com/watch?v=${video}`}
    >
      <img
        className="poster"
        src={poster ? `${img_300}/${poster}` : unavailable}
        alt={title}
      />
      <button className="middleW">
        <VideoModal media_type={media_type} id={id}>
          Watch Now
        </VideoModal>
      </button>
      <div
        className="middleD"
        onClick={() => navigate(`/details/${media_type}/${id}`, {})}
      >
        Details
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100px",
        }}
      >
        <div className="info">
          <span
            style={{
              width: "100%",
            }}
          >
            {title && title.includes(":")
              ? title.substring(0, title.indexOf(":"))
              : title}
          </span>
          <div
            style={{
              color: "#E4D804",
              width: "50px",
            }}
          >
            {date && date.substring(0, 4)}
          </div>
        </div>
        <div className="subInfo">
          <div className="media">
            {location.pathname === "/" ? media_type : original_language}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "3px",
              alignItems: "center",
            }}
          >
            <StarIcon style={{ color: "#E4D804" }} />
            <span style={{ fontWeight: "bold", color: "gray" }}>
              {vote_average}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleContent;
