import React, { useEffect, useRef } from 'react';
import './App.css';
import {Howl} from 'howler';
import soundURL from './assets/hey_sondn.mp3'

const tf = require('@tensorflow/tfjs');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const mobilenet = require('@tensorflow-models/mobilenet');

// var sound = new Howl({
//   src: [soundURL]
// });

// sound.play();

const NOT_TOUCH_LABEL = 'not_touch'
const TOUCHED_LABEL = 'touched'
const TRAINING_TIMES = 50

function App() {
  const video = useRef();
  const mobilenetModule = useRef();
  const classifier = useRef();

  const init = async () => {
    console.log('init...')
    await setupCamera()
    console.log('setup camera success')
    
    mobilenetModule.current = await mobilenet.load()
    
    classifier.current = knnClassifier.create()
    
    console.log('done')
    console.log('Khong cham tay len mat va bam Train1')
  }

  const setupCamera = () => {
    return new Promise((resolve, reject) => {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

      if (navigator.getUserMedia) {
        navigator.getUserMedia(
          {video: true},
          stream => {
            video.current.srcObject = stream
            video.current.addEventListener('loadeddata', resolve);
          },
          error => console.log('unable connect to your camera !!')
        )
      } else {
        reject()
      }
    })
    // .catch()
  }

  const train = async label => {
    for (let i = 0; i < TRAINING_TIMES; i++) {
      console.log(`parseInt ${i+1 / TRAINING_TIMES * 100}`)

      await sleep(100)
    }
  }

  const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    init()

    //cleanup
    return () => {

    }
  }, [])

  return (
    <div className="main">
      <video
        ref={video}      
        className="video"
        autoPlay
      >
      </video>

    <div className="control">
      <button className="btn" onClick={() => train(NOT_TOUCH_LABEL)}>Train 1</button>
      <button className="btn" onClick={() => train(TOUCHED_LABEL)}>Train 2</button>
      <button className="btn" onClick={() => {}}>Run</button>
    </div>
    </div>
  );
}

export default App;
