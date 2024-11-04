import { Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import HeroesListTable from "../components/HeroesListTable";

function CharacterList() {
  const navigate = useNavigate();

  return (
    <Space direction="vertical">
      <Typography.Link onClick={() => navigate("/favheroes")}>
        {"Meus favoritos"}
      </Typography.Link>
      <h1>Lista de Personagens</h1>
      <HeroesListTable />
    </Space>
  );
}

export default CharacterList;
