import React from "react";
import styled from "styled-components";
import DownloadIcon from "@mui/icons-material/Download";

const IMGPATH = "https://image.tmdb.org/t/p/w1280";





const CoverPicture = styled.img`
  object-fit: fill;
  height: 370px;
`;
const FilmName = styled.span`
  font-size: 18px;
  padding-left: 5px;
  font-weight: 600;
  color: white;
  margin: 15px 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;
const MovieInfo = styled.div`
  display: flex;
  padding-left: 5px;
  padding-right: 5px;
  flex-direction: row;
  justify-content: space-between;
`;
const Info = styled.span`
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovieItems = (props) => {
    const { title, release_date, vote_average, poster_path, overview } =
    props.movie;
  const year = release_date.slice(0, 4);

    var name = title;
 
    name.replace(/\s/g, "+");
    var url = "https://1337x.unblockit.page/search/"+name+"/1/";
  


  function getColor(vote) {
    if (vote >= 8) return "blue";
    else if (vote > 6) return "yellow";
    else return "red";
  }

  return (
    <div className="movie">
      <CoverPicture src={IMGPATH + poster_path} />
      <FilmName> {title} </FilmName>
      <MovieInfo>
        <Info className={getColor(vote_average)}>Rating : {vote_average}</Info>
        <Info className="bcolor">Year : {year}</Info>
      </MovieInfo>
      <div className="movie-over">
        <h2>Overview:</h2>
        <p>{overview}</p>
        <a href={url} target="_blank" rel="noreferrer">
            <DownloadIcon className="downl" /></a>
          
    
      </div>
    </div>
  );
};

export default MovieItems;
