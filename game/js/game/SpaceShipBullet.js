function SpaceShipBullet(context){
    ScreenWidget.call(this, context);

    var self = this;
    self.speed = 2;
    self.width = 10;
    self.height = 10;
    self.enemey = false;
    self.type = "Bullet";
    self.y;
    self.x;

    self.render = function(){
        self.context.fillStyle = self.color;
        self.context.beginPath();
        self.context.rect(self.x, self.y, 10, 10);
        self.context.fill();
    };

    self.update = function(){
        self.y -= self.speed;
        var deleteMe = self.checkBoundary();
        return deleteMe;
    };

    self.checkBoundary = function(){
        if(self.y <= minY || self.y >= maxY)
        {
            return true;
        }

        return false;
    };
}

SpaceShipBullet.makeBullet = function(context, width, speed, tx, ty, isEnemy){
    var someBullet = new SpaceShipBullet(context);
    var red = 255;
    var green = 0;
    var blue = 0;

    someBullet.color = "#F2E0E0";//"rgb(" + red + ", " + green + ", " + blue + ")";
    someBullet.speed = speed;
    someBullet.width = width;
    someBullet.height = width;
    someBullet.x = tx;
    someBullet.y = ty;
    someBullet.enemey = isEnemy;

    if (isEnemy == true){
      someBullet.color = "#534B56";
    }

    return someBullet;
};
