var Piece = function(pos, imageData, index) {
	
	t = this;
	
	t.pos = pos;
	t.originalPos = {x: pos.x, y:pos.y};
	t.imageData = imageData;
	t.ignoredPiece = false;
	
	t.index = index;
	
	/*t.render = function(ctx, scale) {
		//console.log(t.index);
		//console.log(t.imageData);
		//console.log(this.pos.x*scale + ", " + this.pos.y*scale);
		//console.log(t.ignoredPiece);
		
		ctx.putImageData(t.imageData,
						 t.pos.x*scale,
						 t.pos.y*scale);//
						 
						 
		ctx.font="20px Georgia";
		ctx.fillStyle="red"
		ctx.fillText(t.index, t.pos.x * scale + 20, t.pos.y * scale + 20);
		//ctx.fillText(t.pos.x + ", " + t.pos.y + " | " + t.originalPos.x + ", " + t.originalPos.y, t.pos.x * scale + 20, t.pos.y * scale + 20);
						 
		//ctx.drawImage(t.imageData, t.pos.x*scale, t.pos.y*scale);
	};*/// Old function, for some reason didnt render correctly.
};