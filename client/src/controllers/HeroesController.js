import API from "../services/API";

const getCharacters = async (offset, limit) => {
  try {
    const { data } = await API.get("/characters", {
      params: { offset: offset, limit: limit }
    });
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
