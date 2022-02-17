import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { API } from "./services/API";
import { Table, Tag, Space, Image } from "antd";
import EditableTable from "./components/EditableTable";
import ColorSelect from "./components/ColorSelect";

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
    editable: true,
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    editable: true,
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    render: (colorKey) => (
      <ColorSelect value={colorKey} handleChange={() => {}} />
    ),
  },
];
function App() {
  const { data: products } = API.useGetProductsQuery();
  if (!products) return <h1>loading...</h1>;
  return (
    <div className="App">
      <EditableTable dataSource={products} columns={columns} />;
    </div>
  );
}

export default App;
