import {
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import axios from "axios";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setsearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState([]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${
        process.env.REACT_APP_API_KEY
      }&include_adult=false&language=en-US&query=${searchText}&page=${page}`
    );
    setContent(data.results);
    setNumOfPages(data.total_pages);
  };
  useEffect(() => {
    window.scroll(0, 0);
    fetchSearch();
  }, [type, page, searchText]);
  return (
    <div>
      <span className="pageTitle">Search</span>
      <div>
        <ThemeProvider theme={darkTheme}>
          <div style={{ display: "flex", margin: "15px 0" }}>
            <TextField
              style={{ flex: 1 }}
              className="searchBox"
              label="Search"
              variant="filled"
              onChange={(e) => setsearchText(e.target.value)}
            />
          </div>
          <Tabs
            value={type}
            indicatorColor="primary"
            textColor="primary"
            onChange={(event, newValue) => {
              setType(newValue);
              setPage(1);
            }}
            style={{ paddingBottom: 5 }}
          >
            <Tab style={{ width: "50%" }} label="Search Movies" />
            <Tab style={{ width: "50%" }} label="Search Tv Series" />
          </Tabs>
        </ThemeProvider>
        <div className="trending">
          {content.length !== 0 &&
            searchText &&
            content.map((item) => (
              <SingleContent
                key={item.id}
                id={item.id}
                title={item.title || item.name}
                date={item.release_date || item.first_air_date || "-----"}
                poster={item.poster_path}
                media_type={type ? "tv" : "movie"}
                vote_average={item.vote_average}
              />
            ))}
          {searchText &&
            content.length === 0 &&
            (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}

          {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
