import React, { useEffect, useState } from "react";
import "./App.css";

import { connect } from "react-redux";

import DrapDrop from "./components/drag-drop.component.";

function App({ storeData }) {
  // function App() {
  const [data, setData] = useState();

  useEffect(() => {
    if (localStorage.getItem("List")) {
      let localStorageData = JSON.parse(localStorage.getItem("List"));
      setData(localStorageData);
    } else {
      // console.log(JSON.stringify(addIdsToObjs(storeData)));
      setData(storeData);
    }
  }, [setData, storeData]);

  return (
    <div className="App">
      <header className="App-header">
        <DrapDrop data={data} />
      </header>
    </div>
  );
}

const mapStateToProps = (state) => ({
  storeData: state.category.storeData,
});

export default connect(mapStateToProps, null)(App);
