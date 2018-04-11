// @ts-check
/* eslint no-undef: 0 */
/* eslint no-unused-vars: ["error", { "varsIgnorePattern": "setup|draw|preload|recordFrame|recordSetup" }] */

// #region Recording
// For Recording

var recorder;
var canvasObject;
var lastFrame = 60;
/**
 * Adds A frame to the recording and saves if at end
 *
 */
function recordFrame () {
  if (frameCount <= lastFrame) {
    recorder.capture(canvasObject);
    if (frameCount === lastFrame) {
      recorder.stop();
      recorder.save();
    }
  }
}
/**
 * Set's up Recording
 *
 */
function recordSetup () {
  recorder = new CCapture({
    format: 'webm',
    framerate: 60
  });
  canvasObject = document.getElementById('defaultCanvas0');
  recorder.start();
}
// #endregion
function preload () {}
let canvas;
let database;
let promptS, question, buTrust, buBetray, Qno;
function setup () {
  var config = {
    apiKey: 'AIzaSyCZh7bDhcHYesPc0FeKxriL7EZ2Kopk2us',
    authDomain: 'awesomesaucerupert.firebaseapp.com',
    databaseURL: 'https://awesomesaucerupert.firebaseio.com',
    projectId: 'awesomesaucerupert',
    storageBucket: 'awesomesaucerupert.appspot.com',
    messagingSenderId: '465094389233'
  };
  firebase.initializeApp(config);
  Qno = 0;
  noCanvas();
  // recordSetup();
  database = firebase.database();

  let cat = database.ref('inputData');
  promptS = '';
  question = createDiv('');
  buTrust = createButton('Trust');
  buBetray = createButton('Betray');
  buTrust.mousePressed(function () {
    pushData('Trust');
  });
  buBetray.mousePressed(function () {
    pushData('Betray');
  });

  newQuestion();
}
function draw () {
  background(getC(hues.neutrals, 1).hex);
  if (mouseIsPressed) {
    ellipse(mouseX, mouseY, 30, 30);
  }
  // promptS = promptS + 1;
  // recordFrame();
}
let questionData;
let options = ['green', 'pink', 'yellow', 'murder'];

function newQuestion () {
  Qno++;
  let thisPrompt = options[Math.floor(Math.random() * 4)];
  question.html("quick it's " + thisPrompt);
  questionData = {
    qNo: Qno,
    prompt: thisPrompt,
    answer: null
  };
}
function pushData (option) {
  questionData.answer = option;
  let cat = database.ref('inputData');
  cat.push(questionData);
  newQuestion();
}
