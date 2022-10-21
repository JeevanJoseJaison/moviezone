import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MovieItems from "./components/MovieItems";

const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const homeAPI ="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=e65ef4e6ad29040d3043b5f7ee0482d5&page=1#";

const Container = styled.div`
display : flex;
flex-direction: column;
`;
const Header = styled.div`
 display:flex;
 flex-direction: row;
  height : 40px;
    justify-content : space-between;
   background-color: #16213E;
    ${'' /* background-color: #623B1C; */}
    align-item : center;
    color: white;
    padding : 10px;
    font-size :25px;
    font-weight : bold;
    ${'' /* box-shadow : 0 3px 6px 0 #555; */}
`;
const AppName = styled.div`
display:flex;
flex-direction : row;
align-items : center;
`;
const MovieIcon = styled.img`
width : 48px;
height : 48px;
margin : 15px;
`;

const SearchBox = styled.div`
display:flex;
flex-direction : row;
padding : 10px 10px;
background-color : white;
border-radius: 6px;
margin-left : 20px;
width : 50%;
align-item : center;
`;
const SearchIcon = styled.img`
width : 20px;
height : 20px;
`;
const SearchInput = styled.input`
color : black;
font-size : 16px;
font-weight: bold;
border : none;
outline : none;
margin-left : 15px;
`;
const MovieList = styled.div`
display:flex;
flex-direction : row;
flex-wrap :wrap;
padding : 30px;
gap : 22px;
justify-content: space-evenly;
`;


function App() 
{

  const [searchFile, updateSearch] = useState();
  const [timeOut, updateTimeout] = useState();
  const [filmList, updateFilmList] = useState();

  

  const fetchMovie = async (input) => {
    const response = await axios.get(SEARCHAPI + input);
    updateFilmList(response.data.results);
  
  };

  const updateChange = (event) => {
    clearTimeout(timeOut);
    updateSearch(event.target.value);
    const timeout = setTimeout(() => fetchMovie(event.target.value), 500); //debouncing concept wait for user to finish input
    updateTimeout(timeout);
  };
  
  useEffect (() =>{
     fetch(homeAPI)
      .then((res) => res.json())
      .then((data) =>{
        console.log(data);
       updateFilmList(data.results);
      });
      },[]);


  return (
    <Container >
      <Header className="heading"><AppName>
        <MovieIcon src="/movie-icon.png" />
        Movie Zone
      </AppName>
        <SearchBox>
          <SearchIcon src="/search-icon.png" />
          <SearchInput placeholder="Search Movie" onChange={updateChange} value={searchFile} />
        </SearchBox>
      </Header>
      
      <MovieList>
        {
          filmList?.length
            && filmList.map((movie, index) =>
              (<MovieItems key={index} movie={movie}  />)) 
        }
      </MovieList>
    </Container>
  );
}

export default App;
