// to-do: rename variables to better names

window.onload = function() {
	var imageData = {src: document.getElementById("srcimage").src, scale:0};
	var imageLoadingObj = new Image();
	var ignoredPiece;
	
	imageLoadingObj.setAttribute('crossOrigin', 'anonymous');
	imageLoadingObj.src = imageData.src;
	
	imageData.imgobj = imageLoadingObj;
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	var pieceScale = canvas.width / gridWidth;
	
	var pieces;
	
	//console.log(pieces.length);
	
	imageLoadingObj.onload = function() {
		imageData.scale = imageLoadingObj.width;
		document.getElementById("srcimage").remove(); // You are no longer needed
		start();
	};
	
	function start() {
		pieces = createPieces(imageData, pieceScale, {x: canvas.width, y: canvas.height});
		
		ignoredPiece = pieces[pieces.length-1];
		ignoredPiece.ignoredPiece = true;
		
		canvas.onclick = onClick;
		
		shufflePieces(pieces);
		
		render(true);
	}
	
	function render() {
		render(false);
	}
	
	function render(border) {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		for(var i = 0; i < pieces.length; i++) {
			var piece = pieces[i];
			if(!piece.ignoredPiece) {
				ctx.putImageData(piece.imageData,
								 piece.pos.x*pieceScale,
								 piece.pos.y*pieceScale);
								 
				if(border) {
					ctx.rect(piece.pos.x*pieceScale,
							 piece.pos.y*pieceScale,
							 pieceScale, pieceScale);
					ctx.lineWidth=1;
					ctx.strokeStyle="rgba(0,0,0,0.3)";
					ctx.stroke();
				}
			}
		}
	}
	
	function onClick(e) {
		var actualMousePos = getCanvasMousePos({x:e.clientX,y:e.clientY}, canvas);
		
		//console.log(actualMousePos.x + ", " + actualMousePos.y + " | " + pieces[0].pos.x*pieceScale + ", " + pieces[0].pos.y*pieceScale);
		
		var clickedPiece = getPieceFromPos(actualMousePos);
		
		if(clickedPiece != false && clickedPiece != null) {
			if(nearIgnoredPiece(clickedPiece)) {
				var ignoredPiecePos = {x: ignoredPiece.pos.x, y: ignoredPiece.pos.y};
				ignoredPiece.pos.x = clickedPiece.pos.x;
				ignoredPiece.pos.y = clickedPiece.pos.y;
				clickedPiece.pos.x = ignoredPiecePos.x;
				clickedPiece.pos.y = ignoredPiecePos.y;
				
				render(true);
				checkWin();
			}
		}
	}
	
	function nearIgnoredPiece(piece) {
		var xCheck = piece.pos.x == ignoredPiece.pos.x + 1 || piece.pos.x == ignoredPiece.pos.x - 1;
		var yCheck = piece.pos.y == ignoredPiece.pos.y + 1 || piece.pos.y == ignoredPiece.pos.y - 1;
		
		var farCheck = (piece.pos.x > ignoredPiece.pos.x || piece.pos.x < ignoredPiece.pos.x) &&
					   (piece.pos.y > ignoredPiece.pos.y || piece.pos.y < ignoredPiece.pos.y);
		
		var posCheck = (xCheck || yCheck);
		var diag = xCheck && yCheck;
		
		if(diag || farCheck)
		posCheck = false;
		
		return posCheck;
	}
	
	function getPieceFromPos(mousePos) {
		var pieceToReturn = null;
		pieces.forEach(function(piece) {
			if(!piece.ignoredPiece) {
				var xCheck = piece.pos.x * pieceScale < mousePos.x && mousePos.x < piece.pos.x * pieceScale + pieceScale;
				var yCheck = piece.pos.y * pieceScale < mousePos.y && mousePos.y < piece.pos.y * pieceScale + pieceScale;
				
				if(xCheck && yCheck) {
					pieceToReturn =  piece;
				}
			}
		});
		return pieceToReturn;
	}
	
	function checkWin() {
		var hasWon = true;
		
		pieces.forEach(function(piece) {
			//console.log("index: " + piece.index + " | " + piece.pos.x + ", " + piece.pos.y + " | " + piece.originalPos.x + ", " + piece.originalPos.y);
			if(piece.pos.x != piece.originalPos.x || piece.pos.y != piece.originalPos.y) {
				hasWon = false;
			}
		});
		if(hasWon) {
			canvas.onclick = null;
			ignoredPiece.ignoredPiece = false;
			render();
			console.log("haswon");
		}
	}
}

function createPieces(srcimage, scale, canvasScale) {
	var pieces = [];
	var imageCuts = cutImageUp(srcimage, scale, canvasScale);
	
	for(var i = 0; i < imageCuts.length; i++) {
		var image = imageCuts[i];
		var piece = new Piece(image.pos, image.imageData, i);
		
		pieces.push(piece);
	}
	
	return pieces;
}

function shufflePieces(pieces) {
	var positions = [];
	
	//Index all positions
	for(var i = 0; i < pieces.length; i++) {
		var piece = pieces[i]
		positions.push(piece.pos);
	}
	
	shuffle(positions);
	
	//And assign them
	for(var i = 0; i < pieces.length; i++) {
		var piece = pieces[i]
		piece.pos = positions.pop(randNumbBetween(0,positions.length));
	}
}

function cutImageUp(image, scale, canvasSize) {
	cutImageUp(image, scale, canvasSize, false)
}

function cutImageUp(image, scale, canvasSize, border) {
	//console.log(image);
    var imagePieces = [];
	var canvas = document.createElement("canvas");
	document.body.appendChild(canvas);
	canvas.width = canvasSize.x;
	canvas.height = canvasSize.y;
	var ctx = canvas.getContext('2d');
	ctx.drawImage(image.imgobj, 
				  0,
				  0, 
				  canvas.width,
				  canvas.height);
	
    for(var x = 0; x < image.scale / scale; x++) {
        for(var y = 0; y < image.scale / scale; y++) {
			
			//console.log(x*scale + ", " + y*scale);
			if(border) 
			ctx.strokeRect(x*scale,y*scale,scale,scale);
			
			var imageData = ctx.getImageData(x*scale,y*scale,scale,scale);
			
			imagePieces.push({imageData: imageData, pos: {x: x, y: y}});
        }
    }

	canvas.remove();
	
    // imagePieces now contains image data of all the pieces of the image

    return imagePieces;
}

// Credits to http://stackoverflow.com/a/2450976/4441452
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}