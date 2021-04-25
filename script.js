(function () {
  var lastTime = 0;
  var vendors = ['webkit', 'moz'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame =
      window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function (callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function () {
        callback(currTime + timeToCall);
      },
        timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function (id) {
      clearTimeout(id);
    };
}());

var main_canvas,
  main_context,
  canvasWidth,
  canvasHeight,
  isPressed = false,
  rad = 0.1,
  spd = 20;
//
var items = [],
  particleCount,
  itemW,
  itemH;

var colorArr = ['#EC008B', '#A42B39', '#40bbff', '#86d300', '#F6893E', '#CE118C', '#FFF100', '#ED1847', '#44270d'];

function randomNumber(min, max) {
  const r = Math.random() * (max - min) + min
  return Math.floor(r)
}

window.onload = function () {
  start();
}

function start() {
  //init vars
  // ||||| Change itemCount to add more particles |||||
  particleCount = randomNumber(2, 50);
  main_canvas = document.getElementById("c");
  main_context = main_canvas.getContext("2d");
  // auto adjust width and hight based on the window size
  main_canvas.width = window.innerWidth;
  main_canvas.height = window.innerHeight;
  canvasHeight = main_canvas.height;
  canvasWidth = main_canvas.width;
  addItems();
  //go time
  initTimer();

}

function initTimer() {
  window.requestAnimationFrame(initTimer);
  build();
}

function build() {
  // main_context.clearRect(0,0,main_canvas.width, main_canvas.height);
  update();
}

function addItems() {
  for (var i = 0; i < particleCount; i++) {
    var itm = {};
    itm.x = Math.floor(Math.random() * canvasWidth);
    itm.y = Math.floor(Math.random() * canvasHeight);
    //randomizes colors
    itm.color = colorArr[Math.floor(Math.random() * colorArr.length)]

    //keeps colors in order
    itm.color = colorArr[i % colorArr.length]

    items.push(itm);
  }
}

function update() {
  var tgt;
  for (var i = 0; i < items.length; i++) {
    obj = items[i];
    if (i < items.length - 1) {
      tgt = items[i + 1]
    } else {
      tgt = items[0];
    }
    obj.x += (tgt.x - obj.x) / spd;
    obj.y += (tgt.y - obj.y) / spd;
  }

  draw();
}

function draw() {
  var obj;
  var color;
  for (var i = 0; i < items.length; i++) {
    obj = items[i];
    //
    main_context.fillStyle = obj.color;
    main_context.strokeStyle = obj.color;
    main_context.lineWidth = .15;
    //
    main_context.beginPath();
    // main_context.arc(obj.x, obj.y, rad*(Math.random()), 0, Math.PI*2, false);
    // main_context.fill();

    main_context.moveTo(obj.x, obj.y);
    if (i < items.length - 1) {
      main_context.lineTo(items[i + 1].x, items[i + 1].y);
    } else {
      main_context.lineTo(items[0].x, items[0].y);
    }
    main_context.stroke();

  }

}