import React from "react";
import { RWebShare } from "react-web-share";
import ShareIcon from "@mui/icons-material/Share";
import { useLocation } from "react-router-dom";

export default function WebShareBtn() {
  const location = useLocation();

  return (
    <div>
      <RWebShare
        data={{
          text: "Movflx",
          url: location.pathname,
          title: "Movflx",
        }}
        onClick={() => {}}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRight: "1px solid rgb(188,188,188,0.5)",
            paddingRight: "18px",
            cursor: "pointer",
          }}
          onMouseOver={(e) => {
            e.target.style.color = "#e4d804";
          }}
          onMouseOut={(e) => {
            e.target.style.color = "rgb(188,188,188,0.5)";
          }}
        >
          <ShareIcon sx={{ margin: "5px" }} />
          <span
            style={{
              color: " rgb(188,188,188,0.7)",
              fontWeight: "bold",
              fontSize: "20px",
            }}
          >
            Share
          </span>
        </div>
      </RWebShare>
    </div>
  );
}
