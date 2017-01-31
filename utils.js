function echo(MessageToLog) {
	return console.log(MessageToLog);
}

function randNumbBetween(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}

function genPos(Zero,Full) {
	return {x:randNumbBetween(Zero.x,Full.x),y:randNumbBetween(Zero.y,Full.y)};
}

function genVel(Zero,Max) {
	return {x:randNumbBetween(Zero,Max),y:randNumbBetween(Zero,Max)};
}

function randomFromArray(array) {
	return array[randNumbBetween(0,array.length-1)];
}

function randFromArray(array, pop) {
	if(pop) {
		return array.pop(randNumbBetween(0,array.length-1));
	} else {
		randomFromArray(array);
	}
}

function getCanvasMousePos(mousePos, canvas) {
	return {x:mousePos.x-canvas.offsetLeft,y:mousePos.y-canvas.offsetTop};
}

function hitTest(A,aSize,B,bSize) {
	if(typeof A == "undefined") { return false; }
	if(typeof B == "undefined") { return false; }
	if(typeof aSize == "undefined") { return false; }
	if(typeof bSize == "undefined") { return false; }
	if(A.x > B.x - bSize && A.x < B.x + bSize && 
       A.y > B.y - bSize && A.y < B.y + bSize) {
        return true;
    } return false;
}

function mouseHitTest(b,mousePos) {
	if(typeof b == "undefined") { return false; }
	if(mousePos.x > b.pos.x - b.size / 2 &&
	mousePos.x < b.pos.x + b.size / 2 &&
    mousePos.y > b.pos.y - b.size / 2 &&
	mousePos.y < b.pos.y + b.size / 2) { return true; } return false;
}

function copyImageData(context, original) {
  var rv = context.createImageData(original.width, original.height);
  // would 
  //   rv.data = Array.prototype.slice.call(original.data, 0);
  // work?
  for (var i = 0; i < original.data.length; ++i)
    rv.data[i] = original.data[i];
  return rv;
}

function genColor() {
	return "rgba(" + randNumbBetween(0,255) + "," + randNumbBetween(0,255) + "," + randNumbBetween(0,255) + ",1)";
}

/* 
 * Remove function
 *
 * Credits for this go to
 * http://stackoverflow.com/users/704371/johan-dettmar
 * from
 * http://stackoverflow.com/a/18120786
 *
 */

Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}

NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}