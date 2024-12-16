import './App.css';
import { useState, useEffect } from 'react';
import Title from "./components/Title";
import MainCard from "./components/MainCard";
import Favorites from "./components/Favorites";
import Form from "./components/Form";

import title from "./assets/cat-title.png";

// localStorage
const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

// API fetch
const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/cat/${responseJson._id}/says/${text}?fontSize=50&fontColor=white`;
};

const App =() => {
  const CAT1 = "https://cataas.com/cat/HSENVDU4ZMqy7KQ0/says/react";

  const [counter, setCounter]  = useState(() => {
    return jsonLocalStorage.getItem("counter")
  });

  const [mainCat, setMainCat] = useState(CAT1); 
  const [favorites, setFavorites] = useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat);
        
  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    setMainCat(newCat);
  }

  useEffect(() => {
    setInitialCat();
  }, []); 

  async function updateMainCat(value){ 
    const newCat = await fetchCat(value);

    setMainCat(newCat);  
    setCounter((prev) => {
      const nextCounter = prev +1;  //prev는 기존값
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    }); 
  }

  function handleHeartClick(){
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites); 
    jsonLocalStorage.setItem("favorites", nextFavorites); 
  };

  const counterTitle = counter === null ? "" : counter + "번째 ";

  return (
    <div>
      <Title><h1 className="top_title">{counterTitle} CAT PHOTO</h1></Title>
      <img src={title} />
      <Form updateMainCat={updateMainCat}/> 
      <MainCard img={mainCat} onHeartClick = {handleHeartClick} alreadyFavorite = {alreadyFavorite}/>
      <Favorites favorites = {favorites}/> 
    </div>
  );
};

export default App;
