//text inside the text box
let textInput = "";

//dictionary of all occurences of letters
let letters = {};

//input box
let inp = "";

//encoding string
let encodeString = "";

//list of all tree nodes, lines, and circles
let nodes = [];
let lines = [];
let circles = [];

//list of node objects
let objectsList = [];
let allObjects = [];


//initial setup
function setup() {
  createCanvas(800, 800);
  inp = createInput("");
  inp.position(0, 0);
  inp.size(500);
  button = createButton("Compress");
  button.position(500, 0);
  button.mousePressed(myInputEvent);
  
}

//drawing function
function draw() {
  background(220);
  strokeWeight(0.6);
  //drawing lines between circles
  for(i = 0; i < lines.length; i++){
    line(lines[i][0], lines[i][1], lines[i][2], lines[i][3]);
  }
  
  textSize(13);
  //drawing circles
  strokeWeight(1);
  for(var i = 0; i < circles.length; i++){
    circle(circles[i][0], circles[i][1], 50);
    if(circles[i][3].length > 1){
      textOnScreen = circles[i][2];
      text(textOnScreen, circles[i][0] - 6, circles[i][1] + 2);
    }else{
      textOnScreen = circles[i][3] + ": " + circles[i][2];
      text(textOnScreen, circles[i][0] - 8, circles[i][1] + 2);
    }
  } 
  //printing out final encoding string
  textSize(23);
  var count = 0
  for(i in letters){
    count += 1;
  }
  if(count > 0){
    encodeString = "";
    for(var x in letters){
      encodeString += x + str(letters[x]);
    }
    text(encodeString, width / 2, 50);
  }
}

//clear all variables once word has been input
function newWord(){
  textInput = "";
  letters = {};
  topNode = 0;
  nodes = [];
  objectsList = [];
}

//when button has been clicked, get the value inside, and count the occurences
function myInputEvent(){
  newWord();
  textInput = inp.value();
  textInput = textInput.toUpperCase();
  countLetters();
  print(letters);
  for(let x in letters){
    object = new node(letters[x], str(x));
    objectsList.push(object);
    allObjects.push(object);
  }
  huffman();
}


// create a tree that when two adjacent nodes are added, it
// adds to the parent node. The nodes can either be pure numbers, or it can
// be letters which are assigned n amount of times.
function huffman(){
  if (objectsList.length !== 0){
    while (objectsList.length > 1){
      // for(var i = 0; i < objectsList.length; i++){
      //   print(objectsList[i].symbol, objectsList[i].freq);
      // }
      // print("EndNOdes")
      //sort lists according to frequency
      objectsList.sort((a, b) => a.freq - b.freq);
      
      //obtain the smallest frequencies
      left = objectsList[0];
      right = objectsList[1];
      
      
      //assign directions to objects
      left.huff = 0;
      right.huff = 1;
      
      //combine objects into parent object
      newNode = new node(int(left.freq) + int(right.freq), left.symbol + right.symbol, left, right);
      
      //remove objects and add new object
      objectsList.splice(objectsList.indexOf(left), 1);
      objectsList.splice(objectsList.indexOf(right), 1);
      objectsList.push(newNode);
      allObjects.push(newNode);
      
    }
    print(allObjects)
    printNodes(objectsList[0]);
    createNodes(objectsList[0], width / 2, 100);
  }
}

//print the objects into the final form
function printNodes(node, val=0){
  let newVal = val + int(node.freq)
 
  if(node.left !== null){
    printNodes(node.left, node.freq)
  }    
  
  if(node.right !== null){
    printNodes(node.right, node.freq)
  }
  
  if(node.left === null && node.right === null){
    console.log(node.symbol, node.freq);
  }
}

//function for drawing circles
function createNodes(node, positionX, positionY, val = 0){
  let newVal = val + int(node.freq);
  circles.push([positionX, positionY, node.freq, node.symbol]);
 
  if(node.left !== null){
    createNodes(node.left, positionX - 100, positionY + 100, newVal);
    lines.push([positionX, positionY, positionX - 100, positionY + 100]);
  }    
  
  if(node.right !== null){
    createNodes(node.right, positionX + 100, positionY + 100, newVal)
    lines.push([positionX, positionY, positionX + 100, positionY + 100]);
  }
  
}

    

// count the occurences of letters and update letters object - which acts as a 
// hash map
function countLetters(){
  for (let i = 0; i < textInput.length; i++){
    if (checkLetter(textInput.charAt(i)) === false){
      letters[textInput.charAt(i)] = 1;
    }else{
      current = letters[textInput.charAt(i)];
      letters[textInput.charAt(i)] = current + 1;
    }
  }
}

//check if the letter is the dictionary, if it is return true
function checkLetter(letter){
  for (let x in letters){
    if (x === letter){
      return true;
    }
  }
  return false;
}
