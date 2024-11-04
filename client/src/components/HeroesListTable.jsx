import { Button, Spin, Table } from "antd";
import { useContext } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import CharacterContext from "../context/CharacterContext";

function HeroesListTable() {
  const { heroesList, handleAddFavHero, handleRemoveFavHero } =
    useContext(CharacterContext);

  const characterColumns = [
    {
      title: "Foto",
      dataIndex: "thumbnail",
      render: (record) => {
        return (
          <img
            style={{ width: 180, height: 180, borderRadius: "50%" }}
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
        return record.favorite === true ? (
          <Button
            onClick={() => handleRemoveFavHero(record.id)}
            type="primary"
            size="large"
            icon={<HeartFilled />}
          >
            Desfavoritar
          </Button>
        ) : (
          <Button
            onClick={() =>
              handleAddFavHero({ id: record.id, name: record.name })
            }
            type="primary"
            size="large"
            icon={<HeartOutlined />}
          >
            Favoritar
          </Button>
        );
      }
    }
  ];

  if (heroesList.length < 1) return <Spin size="large" />;
  return (
    <Table
      columns={characterColumns}
      dataSource={heroesList}
      rowKey={(record) => record.id}
    />
  );
}

export default HeroesListTable;
