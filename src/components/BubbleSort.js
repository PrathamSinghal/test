import React,{useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import bubbleSortSound from '../assets/bubbleSortSound.mp3';

const BubbleSort = () =>{
   const myState = useSelector(state => state.updateProps);
   const dispatch = useDispatch();

   const[audio]=useState( new Audio(bubbleSortSound));

   let values = myState.values.map((item) => item[0]);
   let ids = myState.values.map((item) => item[1]);

   const initialPrompt = () => {
      return new Promise((resolve) => {
         var msgSort = new SpeechSynthesisUtterance();
         msgSort.text = `Elements in array are ${myState.values.map(item => item[0])}`;
         window.speechSynthesis.speak(msgSort);
         msgSort.onend = resolve;
      });
   }
   
   const solve = async () => {

      await initialPrompt();
      
      for(let i = values.length,timer = 0; i > 0;timer += i-1, i--){
         setTimeout(() => {
            if(values[i]>0) {
               toast.success(`${values[i]} is sorted`, {
                  position: toast.POSITION.TOP_RIGHT,
               });
            }

            for(let j = 1; j < i; j++){
               setTimeout(() => {
                  document.getElementById(ids[j]).childNodes[1].style.backgroundColor = 'white';
                  document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = 'white';
                  
                  
                  setTimeout(() => {
                     document.getElementById(ids[j]).childNodes[1].style.backgroundColor = myState.color;
                     document.getElementById(ids[j-1]).childNodes[1].style.backgroundColor = myState.color;
                  },myState.speed-10);
                     
                  if(values[j]<values[j-1]){

                     var msg = new SpeechSynthesisUtterance();
                     msg.text = `${values[j-1]} is swapping from ${j-1} to ${ids[j]} with ${values[j]}`;
                     window.speechSynthesis.speak(msg);
                     

                     let temp = values[j];
                     values[j] = values[j-1];
                     values[j-1] = temp;

                     temp = ids[j];
                     ids[j] = ids[j-1];
                     ids[j-1] = temp;
                     
                     document.getElementById(ids[j]).style.transform = `translateX(${j*11}px)`;
                     
                     document.getElementById(ids[j-1]).style.transform = `translateX(${(j-1)*11}px)`;
                        
                  }
               },(j-1)*(myState.speed));
            }
         
           
            

            console.log(values[i],"yess");
            console.log(i,"yessminusone");
         }
         ,(timer)*(myState.speed))
      }
      
      setTimeout(() => {
         dispatch({
            type:'PLAY_PAUSE',
            _play:false
         })

         dispatch({
            type:'UPDATE_COLOR',
            color: 'rgb(0, 182, 0)'
         })

         var msgSort = new SpeechSynthesisUtterance();
         let array = []
         let revValues = myState.values.reverse();

         for(let i=0; i<revValues.length; i++) {
            let thisValue = revValues[i];
            array.push(thisValue[0])
         }
         
         let sortedArray = array.sort()
         msgSort.text = ` Elements in sorted  array are ${sortedArray.map(item => item)}`;
         
         window.speechSynthesis.speak(msgSort);

      },(((myState.values.length-1)*(myState.values.length))/2)*myState.speed+50);
   }
   
   useEffect(() => {
      if(myState.algorithm==='bubble'){
         if(myState.play)
            solve();
      }
   },[myState.play]);

   return <>
   <ToastContainer />
   </>;
}

export default BubbleSort;
































































































