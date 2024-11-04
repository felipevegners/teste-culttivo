import { Divider, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import HeroesListTable from "../components/HeroesListTable";
import ListPagination from "../components/LIstPagination";

function CharacterList() {
  const navigate = useNavigate();

  return (
    <Space direction="vertical">
      <img
        src="https://cdn.registerdisney.go.com/v4/asset/bundler/MARVEL/v4/images/v1/marvel-logo.svg"
        alt=""
        style={{ width: 200 }}
      />
      <Typography.Link onClick={() => navigate("/favheroes")}>
        {"Meus favoritos"}
      </Typography.Link>
      <h1>Lista de Personagens</h1>
      <HeroesListTable />
      <Divider />
      <ListPagination />
    </Space>
  );
}

export default CharacterList;
