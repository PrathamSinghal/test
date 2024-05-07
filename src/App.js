import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import SortingCodeImages from "./components/SortingCodeImages";
import { useDispatch, useSelector } from 'react-redux'; // Importing necessary Redux hooks


function App() {

  const dispatch = useDispatch(); // Accessing the dispatch function


  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubble");


  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    dispatch({
      type: 'UPDATE_ALGORITHM',
      algorithm: algorithm
  });

  };

  return (
    <div className="App">
      <div className="container">
        <div className="container1">
          <Header />
          <Home
            handleAlgorithmChange={handleAlgorithmChange}
            selectedAlgorithm={selectedAlgorithm}
          />
        </div>
        <div className="container2">
          <SortingCodeImages
            selectedAlgorithm={selectedAlgorithm}
            onAlgorithmChange={handleAlgorithmChange}
            setSelectedAlgorithm={setSelectedAlgorithm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;



