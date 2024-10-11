import { useEffect, useState } from "react";
import { getPersonagens } from "../controllers/PersonagensController";
import { Button, Table } from "antd";

function CharacterList() {
  const [personagens, setPersonagens] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  const handleAdicionarFavorito = (personagem) => {
    const favoritos = JSON.parse(localStorage.getItem("Favoritos")) || [];

    favoritos.push(personagem.id);

    const personagemState = personagens.filter(
      (per) => (per.id = personagem.id)
    );

    personagemState.favorito = !personagemState.favorito;

    const personagenesNaoMovido = personagens.filter(
      (per) => per.id != personagem.id
    );

    setPersonagens(...personagenesNaoMovido, personagemState);

    localStorage.setItem("Favoritos", JSON.stringify(favoritos));
  };

  const personagensColumns = [
    {
      title: "Foto",
      dataIndex: "thumbnail",
      render: (record) => {
        return (
          <img
            style={{ maxWidth: 250 }}
            src={`${record.path}.${record.extension}`}
          />
        );
      }
    },
    {
      title: "Nome",
      dataIndex: "name"
    },
    {
      title: "Descrição",
      dataIndex: "description"
    },
    {
      title: "Favoritar",
      render: (record) => {
        return record.favorito ? (
          <Button
            onClick={() => handleAdicionarFavorito(record)}
            type="primary"
            size="large"
          >
            Desfavoritar
          </Button>
        ) : (
          <Button
            onClick={() => handleAdicionarFavorito(record)}
            type="primary"
            size="large"
          >
            Favoritar
          </Button>
        );
      }
    }
  ];

  const fetchData = async () => {
    await getPersonagens().then((result) => {
      result.results.forEach((personagem) => {
        console.log("true", favoritos.includes(personagem.id));
        personagem.favorito = favoritos.includes(personagem.id);
      });
      setPersonagens(result.results);
    });
  };

  useEffect(() => {
    const favoritosLS = JSON.parse(localStorage.getItem("Favoritos")) || [];
    setFavoritos(favoritosLS);
    fetchData();
  }, []);
  return (
    <div>
      <h1>Lista de Personagens</h1>
      <Table dataSource={personagens} columns={personagensColumns} />
    </div>
  );
}

export default CharacterList;
