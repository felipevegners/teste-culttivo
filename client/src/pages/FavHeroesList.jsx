import { Card, Divider, Flex, Space, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Meta from "antd/es/card/Meta";
import { getCharactersDetails } from "../controllers/HeroesController";

function FavHeroesList() {
  const [favCharDetailList, setFavCharDetailList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const getCharDetails = async () => {
    setIsLoading(true);
    const list = [];
    const initialFavChars = JSON.parse(localStorage.getItem("favHeroes"));
    for (const favChar of initialFavChars) {
      await getCharactersDetails(favChar.id).then((result) => {
        list.push(...result.data.results);
      });
    }

    setFavCharDetailList(list);
    setIsLoading(false);
  };

  useEffect(() => {
    getCharDetails();
  }, []);

  // if (favCharDetailList.length < 1) return <Spin size="large" />;

  return (
    <>
      <Space direction="vertical">
        <Typography.Link onClick={() => navigate("/")}>
          {"< voltar"}
        </Typography.Link>
        <h1>Meus Heróis Favoritos</h1>
        <Divider />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Flex gap="middle">
            {favCharDetailList?.map((fav, i) => (
              <Card
                key={i}
                hoverable
                style={{ width: 340 }}
                cover={
                  <img
                    alt={fav.name}
                    src={`${fav.thumbnail.path}.${fav.thumbnail.extension}`}
                  />
                }
              >
                <Meta title={fav.name} description={fav.description} />
                <br />
                <h3>Appears on:</h3>
                {fav.comics.items.map((item, i) => (
                  <p key={i}>{item.name}</p>
                ))}
              </Card>
            ))}
          </Flex>
        )}
      </Space>
    </>
  );
}

export default FavHeroesList;
