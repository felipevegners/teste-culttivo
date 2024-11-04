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
  const [consultTotal, setConsultTotal] = useState();
  const [pageOffset, setPageOffset] = useState(0);
  const [tableLoading, setTableLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const addFavProp = (data) => {
    const myFavHeroes = JSON.parse(localStorage.getItem("favHeroes")) || [];
    return data.map((item) => ({
      ...item,
      favorite: !!myFavHeroes.find((fav) => fav.id === item.id)
    }));
  };
  const getHeroData = async (offset, limit) => {
    setTableLoading(true);
    await getCharacters(offset, limit).then((result) => {
      let favList = addFavProp(result.results);
      setHeroesList([...heroesList, ...favList]);
      if (result.count > pageOffset) setPageOffset(result.count);
      setConsultTotal(result.total);
    });
    setTableLoading(false);
  };

  const handlePagination = async (limit) => {
    setIsLoading(true);
    await getHeroData(pageOffset, limit);
    setPageOffset((prev) => (prev += limit));
    setIsLoading(false);
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
      message.success(
        `The character ${hero.name} was added to your favorites list!`
      );
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
      message.success(
        `The character ${hero.name} was removed from your favorites list!`
      );
    }

    setHeroesList(newData);
    const favoritedHeroes = JSON.parse(localStorage.getItem("favHeroes"));
    const newFavoritesLS = favoritedHeroes.filter((hero) => hero.id !== heroId);
    localStorage.setItem("favHeroes", JSON.stringify(newFavoritesLS));
  };

  useEffect(() => {
    getHeroData();
  }, []);

  return (
    <HeroContext.Provider
      value={{
        heroesList,
        consultTotal,
        isLoading,
        tableLoading,
        handlePagination,
        handleAddFavHero,
        handleRemoveFavHero
      }}
    >
      {children}
    </HeroContext.Provider>
  );
};

export default HeroContext;
