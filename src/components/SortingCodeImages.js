import React from 'react';



function SortingCodeImages({ selectedAlgorithm }) {
  // Mapping of algorithm names to their corresponding image filenames
  const algorithmImages = {
    bubble: 'bubble.png',
    insertion: 'insertion.png',
    quick: 'quick.png',
    selection: 'selection.png',
    merge: 'merge.png'
  };

  return (
    <div className="sorting-code">
      <div className="algorithm-code">
        <div className="algorithm">
          <img src={algorithmImages[selectedAlgorithm]} alt={`${selectedAlgorithm} Sort Code`} /> 
        </div>
      </div>
    </div>
  );
}

export default SortingCodeImages;














