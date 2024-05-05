import React from 'react';
import './Home.css';
import Sidebar from './Sidebar';
import Visuals from './Visuals';




function Home({handleAlgorithmChange ,selectedAlgorithm}) {
  return (
    <div className="home">
       <Sidebar selectedAlgorithm={selectedAlgorithm} handleAlgorithmChange={handleAlgorithmChange}/>
       <Visuals />
       
       
       
   </div>
  )
}

export default Home;