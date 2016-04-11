/*
Requires: ScreenWidget.js
 */
function EnemySpaceShip(context, image, imageIndex, imageOffset, width, height)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.image = image;
    self.imageIndex = imageIndex;
    self.imageOffset = imageOffset;
    self.width = width;
    self.height = height;
    self.x = 500;//Math.floor((Math.random() * (window.innerWidth)));//Math.floor((Math.random() * (window.innerWidth / 64)));
    //self.y = 0;
    self.type = "Enemy Ship";

    var speedX =  2;//Math.floor((Math.random() * (2)) - 2);
    var speedY = 2;

    self.render = function(){
        self.context.drawImage(self.image,       //source image
            self.imageIndex * self.imageOffset,  //sprite x offset
            0,                                   //sprite y offset
            self.width,                          //sprite width
            self.height,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.width,                          //destination width (for scaling)
            self.height);                        //destination height (for scaling)
    };

    self.update = function (){
        self.y += speedY;
        self.x += speedX;
        var deleteMe = self.checkBoundary();

        if (deleteMe == true){
          self.y = 0;
          //speedX = Math.floor((Math.random() * 5) + 1);
          //speedY = Math.floor((Math.random() * 5) + 1);
        }

        //return deleteMe;
    };

    self.checkBoundary = function(){
        if(self.y >= maxY){
            self.x = 300;//Math.floor((Math.random() * (window.innerWidth)));
            return true;
        }
        if(self.x >= maxX){
            speedX = -1 * speedX;
            console.log(speedX);
            //return true;
        }
        if(self.x <= minX){
            speedX = -1 * speedX;
            console.log(speedX);
            //return true;
        }
        return false;
    };
}
