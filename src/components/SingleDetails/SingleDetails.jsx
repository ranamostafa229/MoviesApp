import "./SingleDetails.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Button } from "@mui/material";
import WebShareBtn from "../WebShareBtn";
import VideoModal from "../VideoModal/VideoModal";

const SingleDetails = ({
  id,
  title,
  media_type,
  poster_path,
  date,
  tagline,
  overview,
  genres,
  runtime,
}) => {
  return (
    <div className="detail">
      <div className="leftSide">
        <img src={poster_path} alt={title} />
      </div>
      <div className="rightSide">
        <div className="title">
          <h1>{title}</h1>
          {tagline && <span style={{ color: "#bcbcb3" }}>({tagline})</span>}
        </div>

        <div className="inf">
          <div className="genres">
            {genres &&
              genres.map((item) => (
                <div
                  key={item.id}
                  style={{ fontSize: "20px", fontWeight: "500" }}
                >
                  {item.name}
                  <span>,</span>{" "}
                </div>
              ))}
          </div>

          <div className="subInf">
            <CalendarMonthIcon style={{ color: "#E4D804", fontSize: "20px" }} />
            {date}
            {runtime && (
              <div className="subInf">
                <ScheduleIcon style={{ color: "#E4D804", fontSize: "20px" }} />{" "}
                {runtime} min
              </div>
            )}
          </div>
        </div>

        <div className="overview">
          <div>{overview}</div>
          <div className="options">
            <WebShareBtn />
            <VideoModal media_type={media_type} id={id}>
              <div className="watch">
                <Button
                  sx={{ color: " #e3dfdf", fontWeight: "bold", gap: "3px" }}
                >
                  <PlayArrowIcon />
                  WATCH NOW
                </Button>
              </div>
            </VideoModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleDetails;
