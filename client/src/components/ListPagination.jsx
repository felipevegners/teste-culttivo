import { useContext, useState } from "react";
import { Button, Flex, Select, Space } from "antd";
import CharacterContext from "../context/CharacterContext";

function ListPagination() {
  const { heroesList, consultTotal, isLoading, handlePagination } =
    useContext(CharacterContext);
  const [limit, setLimit] = useState(20);

  return (
    <Flex vertical gap="middle" align="center" justify="center">
      <p>
        Showing <strong>{heroesList.length}</strong> results of{" "}
        <strong>{consultTotal}</strong>
      </p>
      <Space direction="horizontal" style={{ marginRight: 24 }}>
        <p>Load more</p>
        <Select defaultValue={20} onSelect={(value) => setLimit(value)}>
          <Select.Option value={20}>20</Select.Option>
          <Select.Option value={40}>40</Select.Option>
          <Select.Option value={60}>60</Select.Option>
        </Select>
        <p>results</p>
        <Button
          type="primary"
          onClick={() => handlePagination(limit)}
          loading={isLoading}
        >
          Load
        </Button>
      </Space>
      <Space direction="vertical"></Space>
    </Flex>
  );
}

export default ListPagination;
