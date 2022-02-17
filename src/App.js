import React from "react";
import "./App.css";
import { API } from "./services/API";
import EditableTable from "./components/EditableTable";

function App() {
  const { data: products } = API.useGetProductsQuery();
  if (!products) return <h1>loading...</h1>;
  return (
    <div className="App">
      <EditableTable dataSource={products} />;
    </div>
  );
}

export default App;
