import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BubbleSort from "./BubbleSort";
import InsertionSort from "./InsertionSort";
import QuickSort from "./QuickSort";
import MergeSort from "./MergeSort";
import SelectionSort from "./SelectionSort";
import mergeSortSound from "../assets/mergeSortSound.mp3";
import bubbleSortSound from "../assets/bubbleSortSound.mp3";
import insertionSortSound from "../assets/insertionSortSound.mp3";
import quickSortSound from "../assets/quickSortSound.mp3";
import selectionSortSound from "../assets/selectionSortSound.mp3";

import "./Visuals.css";

function Visuals() {
  const myState = useSelector((state) => state.updateProps);
  const dispatch = useDispatch();
  const color = myState.color;
  const range = myState.range;

  const [audioPlay, setAudioPlay] = useState(false);
  const [audio, setAudio] = useState(new Audio(mergeSortSound));

  useEffect(() => {
    setAudioPlay(false);
    audio.pause();
    switch (myState.algorithm) {
      case "bubble":
        setAudio(new Audio(bubbleSortSound));
        break;
      case "insertion":
        setAudio(new Audio(insertionSortSound));
        break;
      case "merge":
        setAudio(new Audio(mergeSortSound));
        break;
      case "quick":
        setAudio(new Audio(quickSortSound));
        break;
      case "selection":
        setAudio(new Audio(selectionSortSound));
        break;
      default:
        break;
    }
  }, [myState.algorithm]);

  useEffect(() => {
    if (audioPlay) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [audioPlay]);

  const changeValues = () => {
    let new_arr = [...myState.values];
    for (let i = 0; i < new_arr.length; i++)
      document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

    dispatch({
      type: "CHANGE_VALUES",
    });
  };

  const handlePlayPause = (play) => {
    if (!myState.play) {
      document.getElementById("change-btn").disabled = true;
      document.getElementById("change-btn").style.backgroundColor = "grey";
      document.getElementById("play-btn").disabled = true;
      document.getElementById("play-btn").style.backgroundColor = "grey";
    } else {
      return;
    }
    dispatch({
      type: "PLAY_PAUSE",
      _play: play,
    });
  };

  const handleStop = () => {
    dispatch({
      type: "STOP",
    });
  };

  useEffect(() => {
    if (!myState.play) {
      document.getElementById("play-btn").disabled = false;
      document.getElementById("play-btn").style.backgroundColor =
        "rgb(0, 149, 199)";
      document.getElementById("change-btn").disabled = false;
      document.getElementById("change-btn").style.backgroundColor =
        "rgb(0, 149, 199)";
    }
  }, [myState.play]);

  let speed = myState.speed;
  if (myState.algorithm === "selection") speed *= 3;
  else if (myState.algorithm === "merge") speed *= 5;
  else if (myState.algorithm === "quick") speed *= 6;

  return (
    <div className="visuals">
      <div className="visualizer">
        {myState.algorithm === "quick" && (
          <div className="legend">
            <div className="legend__lable"></div> Pivot elements
          </div>
        )}
        {
          <div
            className="visual__items"
            style={{ width: `${myState.values.length * 11}px` }}
          >
          {console.log(myState,"myState")}
            {myState.values.map((item) => {
                console.log(item,"itemm")
              return (
                <div
                  className="visual__item"
                  key={item[1]}
                  id={item[1]}
                  style={{
                    transition: `${speed / 1000}s linear all`,
                    transform: `translateX(${item[1] * 11}px)`,
                  }}
                >
                  <h4>{item[0]}</h4>
                  <div
                    className="visual"
                    style={{
                      height: `${item[0] * 3}px`,
                      backgroundColor: color,
                      width: range < 35 ? "8px" : "6px",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        }
      </div>
      <div className="visual__btns">
        <button id="change-btn" onClick={changeValues}>
          change values
        </button>
        <button
          id="play-btn"
          onClick={() => {
            handlePlayPause(true);
          }}
        >
          play
        </button>

        <button
          id="audio-btn"
          onClick={() => {
            setAudioPlay(!audioPlay);
          }}
        >
          {" "}
          {audioPlay ? "Audio Pause" : "Audio Play"}{" "}
        </button>
      </div>

      <BubbleSort />
      <InsertionSort />
      <MergeSort />
      <QuickSort />
      <SelectionSort />
    </div>
  );
}

export default Visuals;
