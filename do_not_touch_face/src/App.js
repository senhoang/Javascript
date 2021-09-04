import './App.css';

const tf = require('@tensorflow/tfjs');
const knnClassifier = require('./node_modules/@tensorflow-models/knn-classifier/dist/knn-classifier');

const mobilenet = require('@tensorflow-models/mobilenet');



function App() {
  return (
    <div className="main">
      <video
        className="video"
        autoPlay
      >
      </video>

    <div className="control">
      <button className="btn">Train 1</button>
      <button className="btn">Train 2</button>
      <button className="btn">Run</button>
    </div>
    </div>
  );
}

export default App;
