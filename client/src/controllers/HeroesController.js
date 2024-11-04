import API from "../services/API";

const getCharacters = async () => {
  try {
    const { data } = await API.get("/characters");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getCharactersDetails = async (charId) => {
  try {
    const { data } = await API.get(`/characters/${charId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getCharacters, getCharactersDetails };
