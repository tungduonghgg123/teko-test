import React from "react";
import "./App.css";
import { API } from "./services/API";
import EditableTable from "./components/EditableTable";
import BackToTopButton from "./components/BackToTopButton";

function App() {
  const { data: products } = API.useGetProductsQuery();

  return (
    <div className="App">
      <EditableTable dataSource={products} />

      <BackToTopButton />
    </div>
  );
}

export default App;
