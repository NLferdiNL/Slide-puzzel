<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Puzzle</title>
<style>
canvas {
	width:600px;
	max-width:600px;
	height:600px;
	max-height:600px;
	
	margin:auto;
	position:absolute;
	top:0;
	bottom:0;
	left:0;
	right:0;
	box-shadow:inset black 0 0 40px 5px;
}

input {
	text-align:center;
}

.invisible {
	color:rgba(0,0,0,0);	
}
</style>
</head>

<body>
<div>
<form method="get">
Image: 
<input type="url" name="img"><span class="invisible">.....</span>
Grid width: 
<input type="number" name="gridWidth">
<input type="submit">
</form>
</div>
<img id="srcimage" crossOrigin="Anonymous" src="
<?php 
if(isset($_GET['img'])) { 
	if($_GET['img'] != false) {
		echo $_GET['img'];
	} else {
		echo "./globe.png";
	}
} else {
	echo "./globe.png";
} 
?>" hidden>
<canvas id="canvas" height="600" width="600">Your browser does not seem to support canvas. Try updating to a modern browser.</canvas>
<script>
var gridWidth = 
<?php
if(isset($_GET['gridWidth'])) { 
	if($_GET['gridWidth'] != false) {
		echo $_GET['gridWidth'];
	} else {
		echo "4";
	}
} else {
	echo "4";
} 
?>;
</script>
<script src="utils.js"></script>
<script src="Piece.js"></script>
<script src="main.js"></script>
</body>
</html>