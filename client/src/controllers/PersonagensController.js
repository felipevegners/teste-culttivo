import API from "../services/API";

const getPersonagens = async () => {
  try {
    const { data } = await API.get("/characters");
    return data.data;
  } catch (error) {
    console.log(error);
  }
};

const getPersonagemDetalhes = async (idPersonagem) => {
  try {
    const { data } = await API.get(`/character/${idPersonagem}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { getPersonagens, getPersonagemDetalhes };
