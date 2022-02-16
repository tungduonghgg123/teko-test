import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "./services/API";
import { Table, Tag, Space, Image } from "antd";

const columns = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Error Description",
    dataIndex: "errorDescription",
    key: "errorDescription",
  },
  {
    title: "Product Image",
    dataIndex: "image",
    key: "image",
    render: (url) => <Image width={200} src={url} />,
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
];
function App() {
  const { data: products } = API.useGetProductsQuery();
  const { data: colors } = API.useGetColorQuery();

  return (
    <div className="App">
      <Table dataSource={products} columns={columns} />;
    </div>
  );
}

export default App;
