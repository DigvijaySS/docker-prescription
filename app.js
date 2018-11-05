var canvas;
var context;
var outlineImage = new Image();
var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;
var curColor = '#000000';
var clickColor = new Array();
var clickSize = new Array();
var curSize = "1";
var clickTool = new Array();
var curTool = "pencil";

$('#set_pencil').addClass('active');

canvas = document.getElementById('myCanvas');
context = canvas.getContext('2d');
canvasWidth = window.innerWidth;
canvasHeight = window.innerHeight-150;
context.canvas.width = canvasWidth;
context.canvas.height = canvasHeight;
drawOutlineImage();

// Download as image
$('#save_as_image').click(function(e) {
	var link = document.getElementById('save_as_image');
  	link.setAttribute('download', 'prescription1.png');
  	link.setAttribute('href', canvas.toDataURL("image/png"));
});

// $('#myCanvas').on("mousedown touchstart", function(e){
//   	var mouseX = e.pageX - this.offsetLeft;
//   	var mouseY = e.pageY - this.offsetTop;	
//   	paint = true;
//   	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
//   	redraw();
// });

// $('#myCanvas').on("mousemove touchmove", function(e){
//   	if(paint){
// 	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
// 	    redraw();
//   	}
// });

// $('#myCanvas').on("mouseup touchend", function(e){
//   	paint = false;
// });

// $('#myCanvas').on("mouseleave touchcancel", function(e){
//   	paint = false;
// });

canvas.addEventListener('touchstart', function(e){
	var mouseX = e.pageX - this.offsetLeft;
  	var mouseY = e.pageY - this.offsetTop;	
  	paint = true;
  	addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
  	redraw();
}, false);

canvas.addEventListener('touchmove', function(e){
	if(paint){
	    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	    redraw();
  	}
}, false);

canvas.addEventListener('touchend', function(e){
	paint = false;
}, false);

canvas.addEventListener('touchcancel', function(e){
	paint = false;
}, false);


$('#clear_form').click(function(e) {
	clickX.length = 0;
	clickY.length = 0;
	clickDrag.length = 0;
	clickColor.length = 0;
	clickSize.length = 0;
	clickTool.length = 0;

	context.clearRect(0, 0, canvasWidth, canvasHeight);
	drawOutlineImage();
});

$('#point_size').change(function(e) {
	curSize = $(this).val();
});

$('#set_pencil, #set_eraser').click(function(e) {
	curTool = $(this).attr('data-id');
	$('#set_pencil, #set_eraser').removeClass('active');
	$(this).addClass('active');
});


function drawOutlineImage()
{
	outlineImage.src = "./images/bg1.png";
	context.drawImage(outlineImage, 0, 0, canvasWidth, canvasHeight);
}

function addClick(x, y, dragging)
{
  	clickX.push(x);
  	clickY.push(y);
  	clickDrag.push(dragging);
  	if(curTool == "eraser"){
  		console.log(curTool);
    	clickColor.push("white");
  	}else{
  		console.log(curTool);
    	clickColor.push(curColor);
  	}
  	clickSize.push(curSize);
}

function redraw()
{
  	context.clearRect(0, 0, canvasWidth, canvasHeight);
	drawOutlineImage();

  	context.lineJoin = "round";
  			
  	for(var i=0; i < clickX.length; i++) {		
	    context.beginPath();
	    if(clickDrag[i] && i){
	      context.moveTo(clickX[i-1], clickY[i-1]);
	    } else {
	       	context.moveTo(clickX[i]-1, clickY[i]);
	    }
	    context.lineTo(clickX[i], clickY[i]);
	    context.closePath();
	    context.strokeStyle = clickColor[i];
	    context.lineWidth = clickSize[i];
	    context.stroke();
  	}
}