import { Button, Spin, Table } from "antd";
import { useContext } from "react";
import { HeartFilled, HeartOutlined } from "@ant-design/icons";

import CharacterContext from "../context/CharacterContext";

function HeroesListTable() {
  const { heroesList, tableLoading, handleAddFavHero, handleRemoveFavHero } =
    useContext(CharacterContext);

  const characterColumns = [
    {
      title: "Foto",
      dataIndex: "thumbnail",
      render: (record) => {
        return (
          <img
            style={{ width: 100, height: 100 }}
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
      title: "Favoritos",
      width: 250,
      render: (record) => {
        return record.favorite === true ? (
          <Button
            color="danger"
            variant="solid"
            onClick={() => handleRemoveFavHero(record.id)}
            size="large"
            icon={<HeartFilled />}
          >
            Remove Fav
          </Button>
        ) : (
          <Button
            color="danger"
            variant="outlined"
            onClick={() =>
              handleAddFavHero({ id: record.id, name: record.name })
            }
            size="large"
            icon={<HeartOutlined />}
          >
            Favorite
          </Button>
        );
      }
    }
  ];

  if (heroesList.length < 1) return <Spin size="large" />;
  return (
    <>
      <Table
        columns={characterColumns}
        dataSource={heroesList}
        rowKey={(record) => record.id}
        pagination={false}
        loading={tableLoading}
      />
    </>
  );
}

export default HeroesListTable;
