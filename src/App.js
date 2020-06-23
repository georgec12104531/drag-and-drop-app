import React, { useEffect, useState } from "react";
import "./App.css";

import { connect } from "react-redux";

import DragNDrop from "./components/DragNDrop";

const defaultData = [
  { title: "rewards", items: ["", "R1", "R2", "R3", "R4", "R5", "R6"] },
  { title: "category 1", items: ["C1", "", "", "", "", "", ""] },
  { title: "category 2", items: ["C2", "", "", "", "", "", ""] },
  { title: "category 3", items: ["C3", "", "", "", "", "", ""] },
];

// function App({ storeData }) {
function App() {
  // console.log("storeData in app", storeData);
  const [data, setData] = useState();

  useEffect(() => {
    if (localStorage.getItem("List")) {
      console.log("getting from local storage on refresh");
      setData(JSON.parse(localStorage.getItem("List")));
    } else {
      setData(defaultData);
    }
  }, [setData]);

  return (
    <div className="App">
      <header className="App-header">
        <DragNDrop data={data} />
      </header>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   storeData: state.category.storeData,
// });

// export default connect(mapStateToProps, null)(App);

export default App;
