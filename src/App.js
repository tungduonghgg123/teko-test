import React from "react";
import "./App.css";
import { API } from "./services/API";
import { Table, BackToTopButton } from "./components";

function App() {
  const { data: products } = API.useGetProductsQuery();

  return (
    <div className="App">
      <Table dataSource={products} />
      <BackToTopButton />
    </div>
  );
}

export default App;
