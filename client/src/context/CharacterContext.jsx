/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  getCharacters,
  getCharactersDetails
} from "../controllers/HeroesController";
import { message } from "antd";

const HeroContext = createContext([]);

export const HeroProvider = ({ children }) => {
  const [heroesList, setHeroesList] = useState([]);

  const fecthHeroData = async () => {
    const myFavHeroes = JSON.parse(localStorage.getItem("favHeroes")) || [];

    await getCharacters().then((result) => {
      let addFavProp = result.results.map((hero) => ({
        ...hero,
        favorite: !!myFavHeroes.find((fav) => fav.id === hero.id)
      }));

      setHeroesList(addFavProp);
    });
  };

  const handleAddFavHero = (heroData) => {
    const newData = [...heroesList];
    const index = newData.findIndex((hero) => heroData.id === hero.id);
    if (index > -1) {
      const hero = newData[index];
      newData.splice(index, 1, {
        ...hero,
        favorite: true
      });
    }

    setHeroesList(newData);

    const favoritedHeroes = JSON.parse(localStorage.getItem("favHeroes")) || [];
    favoritedHeroes.push(heroData);
    localStorage.setItem("favHeroes", JSON.stringify(favoritedHeroes));
  };

  const handleRemoveFavHero = (heroId) => {
    const newData = [...heroesList];
    const index = newData.findIndex((hero) => heroId === hero.id);
    if (index > -1) {
      const hero = newData[index];
      newData.splice(index, 1, {
        ...hero,
        favorite: false
      });
    }

    setHeroesList(newData);
    const favoritedHeroes = JSON.parse(localStorage.getItem("favHeroes"));
    const newFavoritesLS = favoritedHeroes.filter((hero) => hero.id !== heroId);

    localStorage.setItem("favHeroes", JSON.stringify(newFavoritesLS));
  };

  useEffect(() => {
    fecthHeroData();
  }, []);

  return (
    <HeroContext.Provider
      value={{
        heroesList,
        handleAddFavHero,
        handleRemoveFavHero
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export default HeroContext;
