import React, { useEffect, useRef, useState} from 'react';
import './App.css';
import {Howl} from 'howler';
import soundURL from './assets/hey_sondn.mp3'
import { initNotifications, notify } from '@mycv/f8-notification';

const tf = require('@tensorflow/tfjs');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const mobilenet = require('@tensorflow-models/mobilenet');

var sound = new Howl({
  src: [soundURL]
});

const NOT_TOUCH_LABEL = 'not_touch'
const TOUCHED_LABEL = 'touched'
const TRAINING_TIMES = 50
const TOUCHED_CONFIDENCES = 0.8

function App() {
  const video = useRef();
  const mobilenetModule = useRef();
  const classifier = useRef();
  const canPlayAudio = useRef(true);
  const [touched, setTouched] = useState(false);
  
  const init = async () => {
    console.log('init...')
    await setupCamera()
    console.log('setup camera success')
    
    classifier.current = knnClassifier.create()

    mobilenetModule.current = await mobilenet.load();
    
    console.log('done')
    console.log('Khong cham tay len mat va bam Train1')
    initNotifications({ cooldown: 3000 });
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
    console.log(`[${label}] Dang train cho mat dep trai cua ban...`)
    for (let i = 0; i < TRAINING_TIMES; i++) {
      console.log(`parseInt ${parseInt((i+1) / TRAINING_TIMES * 100)} %`)

      await training(label)
    }
  }

  const training = label => {
    return new Promise(async resolve => {
      const embedding = mobilenetModule.current.infer(
        video.current,
        true
      );
      classifier.current.addExample(embedding, label)
      await sleep(100)
      resolve()
    })
  }

  const run = async () => {
    const embedding = mobilenetModule.current.infer(
      video.current,
      true
    );

    const result = await classifier.current.predictClass(embedding);

    if (
      result.label === TOUCHED_LABEL &&
      result.confidences[result.label] > TOUCHED_CONFIDENCES
    ) {
      console.log('TOUCHED')
      if (canPlayAudio.current) {
        canPlayAudio.current = false
        sound.play();
      }
      notify('put your hands down', { body: 'you just touched your face' });
      setTouched(true)
    } else {
      console.log('NOT_TOUCHED')
      setTouched(false)
    }

    console.log('Label ', result)
    console.log('Confidences', result.confidences)

    await sleep(200)

    run()
  }

  const sleep = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  useEffect(() => {
    init()

    sound.on('end', function(){
      canPlayAudio.current = true
    });

    //cleanup
    return () => {

    }
  }, [])

  return (
    <div className={`main ${touched ? 'touched' : ''}`}>
      <video
        ref={video}      
        className="video"
        autoPlay
      >
      </video>

    <div className="control">
      <button className="btn" onClick={() => train(NOT_TOUCH_LABEL)}>Train 1</button>
      <button className="btn" onClick={() => train(TOUCHED_LABEL)}>Train 2</button>
      <button className="btn" onClick={() => run()}>Run</button>
    </div>
    </div>
  );
}

export default App;
