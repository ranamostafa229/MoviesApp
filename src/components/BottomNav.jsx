import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiBottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === "/") {
      navigate("/");
      setValue(0);
    } else if (location.pathname === "/movies") {
      navigate("/movies");
      setValue(1);
    } else if (location.pathname === "/series") {
      navigate("/series");
      setValue(2);
    } else if (location.pathname === "/search") {
      navigate("/search");
      setValue(3);
    }
  }, [location.pathname, value]);

  const BottomNavigationAction = styled(MuiBottomNavigationAction)(`
    color: white;
    &.Mui-selected {
      color: #E4D804;
    }

  `);

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 100,
      }}
    >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          backgroundColor: "#16151D",
        }}
      >
        <BottomNavigationAction
          label="Trending"
          icon={<WhatshotIcon />}
          onClick={() => {
            window.scroll(0, 0);
            navigate("/");
          }}
        />
        <BottomNavigationAction
          label="Movies"
          icon={<MovieIcon />}
          onClick={() => {
            window.scroll(0, 0);
            navigate("/movies");
          }}
        />
        <BottomNavigationAction
          label="TV Series"
          icon={<TvIcon />}
          onClick={() => {
            window.scroll(0, 0);
            navigate("/series");
          }}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchIcon />}
          onClick={() => {
            window.scroll(0, 0);
            navigate("/search");
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
