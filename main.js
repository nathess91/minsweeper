// function setUp() {
//   var userName = prompt("What's your name studmuffin?");
//   var gridRows = prompt("Sup " + userName + "! " + "How many rows?");
//   var gridColumns = prompt("How many columns?");
//   var numberOfMines = prompt("How many mines?");
//
//   for (var i = 0; i < gridRows; i++) {
//     var rowCount = $("#grid").append("<div class='row'></div>");
//   }
//
//   for (var i = 0; i < gridColumns; i++) {
//     var columnCount = $(".row").append("<div class='col-lg-2 square' id='" + i + "'>" + "<img src='http://i.imgur.com/HM1e3Tbb.jpg'></div>");
//   }
//
// }
//
//
// $(document).ready(function() {
//   setUp();
//
// });

// var gridRows = prompt("How many rows should we use?");
// var gridColumns = prompt("How many columns?");

var s = {
  rows: 10,
  cols: 10,
  width: 30,
  height: 30,
  bombCount: 10
};

// make c global
var c;

// multi dimensional array stores coordinates of mines
var bombs = [];

window.onload = function() {
  var canvas = document.getElementById("gCanvas");
  c = canvas.getContext("2d");

  init();
}

// create click event with coordinates to tell where the user is clicking
var mX;
var mY;
var clickedX;
var clickedY;

window.onclick = function(e) {
  mX = e.pageX;
  mY = e.pageY;

  // give each box a whole number value; first box at 15,10 will be 0
  if (Math.floor(mX / s.width) < s.cols && Math.floor(mY / s.height) < s.rows) {
    // determine which box was clicked
    clickedX = Math.floor(mX / s.width);
    clickedY = Math.floor(mY / s.height);
    console.log(clickedX + "," + clickedY);
  }

  // if they click a bomb this will get set to true
  var clickedBomb = false;

  // determine if clicked x,y matches bomb coordinates
  for (var i = 0; i < bombs.length; i++) {
    if (clickedX == bombs[i][0] && clickedY == bombs[i][1]) {
      clickedBomb == true;
      lose();
    }
  }

  if(clickedBomb == false) {
    clickPass();
  }
}

// make box variable global
var box;

// initiate game
function init() {
  box = new Image();
  box.src = "http://i.imgur.com/b0e10JMt.jpg";

  // wait for box to load before drawing
  box.onload = function() {
    // execute for each bomb
    for (var i = 0; i < s.bombCount; i++) {
      // set bomb equal to a random x and y
      bombs[i] = [
        Math.floor(Math.random() * s.width),
        Math.floor(Math.random() * s.height)
      ]
    }

    drawCanvas();
  }
}

// redraw canvas on every update
function drawCanvas() {
  // clear canvas
  c.clearRect(0, 0, 400, 400);

  // draw boxes
  // rows
  for (var i = 0; i < s.rows; i++) {
    // columns
    for (var j = 0; j < s.cols; j++) {
      var x = j * s.width;
      var y = i * s.height;

      c.drawImage(box, x, y);
    }
  }
}


function clickPass() {
  // create array for all coordinates we need to check
  var boxesToCheck = [
    clickedX - 1, clickedY - 1,
    clickedX, clickedY - 1,
    clickedX + 1, clickedY - 1
  ];
}

// check to see if there are bombs around the clicked box
function checkBomb(i, x, y) {
  // if there is a value, there is a bomb
  if (bombs[i][x] != null && bombs[i][y] != null) {
    return true;
  }
}

// create lose state
function lose() {

}
