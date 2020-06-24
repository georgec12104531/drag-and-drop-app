import React, { useEffect, useState } from "react";
import "./App.css";

// import { connect } from "react-redux";

import DrapDrop from "./components/drag-drop.component.";

let counter = 0;

const generateKey = () => {
  counter++;
  return `${counter}_${new Date().getTime()}`;
};

const addIdsToObjs = (data) => {
  return data.map((group) => {
    return {
      ...group,
      items: group.items.map((item) => {
        return {
          id: generateKey(),
          val: item,
        };
      }),
    };
  });
};

const defaultData = addIdsToObjs([
  { title: "rewards", items: ["", "R1", "R2", "R3", "R4", "R5"] },
  { title: "category 1", items: ["C1", "", "", "", "", ""] },
  { title: "category 2", items: ["C2", "", "", "", "", ""] },
  { title: "category 3", items: ["C3", "", "", "", "", ""] },
  { title: "category 4", items: ["C4", "", "", "", "", ""] },
  { title: "category 4", items: ["C5", "", "", "", "", ""] },
]);

// function App({ storeData }) {
function App() {
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
        <DrapDrop data={data} />
      </header>
    </div>
  );
}

// const mapStateToProps = (state) => ({
//   storeData: state.category.storeData,
// });

// export default connect(mapStateToProps, null)(App);

export default App;
