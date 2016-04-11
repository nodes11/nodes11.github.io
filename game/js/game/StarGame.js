/*
Main file for Star Game
Requires: ScreenWidget.js
          Star.js
          SpaceShip.js
 */
function StarGame(canvas, shipImageSrc, enemyShipImageSrc, numShips)
{
    var self = this;
    var enemeyShoot = 0;
    numEnemyShips = numShips;
    livesLeft = 3;

    //set up globals
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;

    self.lives = 3;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.shipImage = new Image();
    self.enemyShipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.enemyShipImage.src = enemyShipImageSrc;

    self.widgets = Array();

    self.enemyShipWidgets = Array();
    self.enemyBulletWidgets = Array();

    self.shipWidgets = Array();
    self.goodBulletWidgets = Array();

    //Hide mouse
    self.canvas.style.cursor = "none";

    //Set up player piece
    self.playerShips = Array();
    self.enemyShips = Array();

    //Create the array of playerships to spawn
    for (var i = 0; i < self.lives; i++){
      self.playerShips[i] = new SpaceShip(self.context, self.shipImage, 0, 66, 64, 64);
    }

    //Create an array of enemy ships to spawn
    for (var i = 0; i < numEnemyShips; i++){
      self.enemyShips[i] = new EnemySpaceShip(self.context, self.enemyShipImage, 1, 66, 64, 64);
    }

    //Start the game
    self.begin = function(){
        self.init();
        self.renderLoop();
    };

    //Resets game state
    self.init = function(){
        //100 small stars
        for (var i = 0; i < 100; i++){
            //make it so most stars are in the far background
            var howFast = Math.random() * 100;
            var speed = 5;
            if (howFast > 60)
            {
                speed = 2;
            }
            else if (howFast > 20)
            {
                speed = 1;
            }
            //var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 2, speed);
            self.widgets.push(someStar);
        }

        //20 medium stars
        for (var i = 0; i < 10; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 3, speed);
            self.widgets.push(someStar);
        }

        //200 tiny stars
        for (var i = 0; i < 200; i++) {
            var speed = (Math.floor(Math.random() * 3) + 1) * 1;
            var someStar = Star.makeStar(self.context, 1, speed);
            self.widgets.push(someStar);
        }

        //Placing ship last puts it on top of the stars
        for (var i = 0; i < self.playerShips.length; i++){
          self.shipWidgets.push(self.playerShips[i]);
        }

        //Place the enemy ships
        for (var i = 0; i < numEnemyShips; i++){
          self.enemyShipWidgets.push(self.enemyShips[i]);
        }

        //Begin game
        window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function(){
        //Display the number of lives
        document.getElementById("lives").innerHTML = livesLeft;
        document.getElementById("enemies").innerHTML = numEnemyShips;

        //Break game upon 3 deaths
        if (self.lives <= 0){
          document.getElementById("status").style.display = "inline-block";
          document.getElementById("status").innerHTML = "You Lose!";
          return;
        }

        if (numEnemyShips == 0){
          document.getElementById("status").style.display = "inline-block";
          document.getElementById("status").innerHTML = "You Win!";
          return;
        }

        //Clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        //Paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        var del;

        //Check for collisions
        self.isCollision();

        //Render star widgets
        for(var i = 0; i < self.widgets.length; i++){
            self.widgets[i].render();
            del = self.widgets[i].update();

            //Do we need to remove the object from our widgets?
            if (del == true)
              self.widgets.splice(i, 1);
        }

        //Render ship widgets widgets
        if (self.lives > 0 && self.shipWidgets.length > 0){
          for(var i = 0; i < 1; i++){
              delete del;

              self.shipWidgets[self.lives - 1].render();
              del = self.shipWidgets[self.lives - 1].update();

              //Do we need to remove the object from our widgets?
              if (del == true)
                self.shipWidgets.splice(self.lives - 1, 1);
          }
        }

        delete del;

        self.enemyShipWidgets[numEnemyShips-1].render();
        del = self.enemyShipWidgets[numEnemyShips-1].update();

        //Do we need to remove the object from our widgets?
        if (del == true)
          self.widgets.splice(numEnemyShips-1, 1);

        //Render enemy bullet widgets widgets
        for(var i = 0; i < self.enemyBulletWidgets.length; i++){
            delete del;
            //self.isCollision();
            self.enemyBulletWidgets[i].render();
            del = self.enemyBulletWidgets[i].update();

            //Do we need to remove the object from our widgets?
            if (del == true)
              self.enemyBulletWidgets.splice(i, 1);
        }

        //Render good bullet widgets widgets
        for(var i = 0; i < self.goodBulletWidgets.length; i++){
            delete del;
            //self.isCollision();
            self.goodBulletWidgets[i].render();
            del = self.goodBulletWidgets[i].update();

            //Do we need to remove the object from our widgets?
            if (del == true)
              self.goodBulletWidgets.splice(i, 1);
        }

        //Enemy shooting
        if (enemeyShoot == 50){
          var someBullet = SpaceShipBullet.makeBullet(self.context, 10, -3, self.enemyShipWidgets[numEnemyShips-1].x + self.enemyShipWidgets[numEnemyShips-1].width/2 - 5, self.enemyShipWidgets[numEnemyShips-1].y + self.enemyShipWidgets[numEnemyShips-1].height, true);
          self.enemyBulletWidgets.push(someBullet);
          enemeyShoot = 0;
        }
        else{
          enemeyShoot++;
        }

        //Show number of items on screen (FOR DEBUGGING)
        window.requestAnimationFrame(self.renderLoop);
    };

    self.isCollision = function(){
      //Player ship with enemy ship
      var delete1 = Array();
      var delete2 = Array();

      for (var i = 0; i < self.shipWidgets.length; i++){
        for (var j = 0; j < self.enemyShipWidgets.length; j++){
            if (didCollide(self.shipWidgets[i], self.enemyShipWidgets[j]) == 1){
              delete1.push(i);
              delete2.push(j);
              if (((livesLeft*10)%10) == 0){
                self.lives--;
                livesLeft--;
              }
              else{
                self.lives --;
                livesLeft = self.lives;
              }
              numEnemyShips--;
              break;
            }
        }
      }

      for (var i = 0; i < delete1.length; i++){
        self.shipWidgets.splice(delete1[i], 1);
      }
      for (var i = 0; i < delete2.length; i++){
        self.enemyShipWidgets.splice(delete2[i], 1);
      }

      delete1 = Array();
      delete2 = Array();

      //Player ship with enemy bullet
      for (var i = 0; i < self.shipWidgets.length; i++){
        for (var j = 0; j < self.enemyBulletWidgets.length; j++){
            if (didCollide(self.shipWidgets[i], self.enemyBulletWidgets[j]) == 1){
              livesLeft -= .5;
              if (((livesLeft*10)%10) == 0){
                self.lives = livesLeft;
                delete1.push(i);
                delete2.push(j);
                break;
              }
              else{
                delete2.push(j);
              }
            }
        }
      }

      for (var i = 0; i < delete1.length; i++){
        self.shipWidgets.splice(delete1[i], 1);
      }
      for (var i = 0; i < delete2.length; i++){
        self.enemyBulletWidgets.splice(delete2[i], 1);
      }

      delete1 = Array();
      delete2 = Array();

      //Player bullet with enemy ship
      for (var i = 0; i < self.enemyShipWidgets.length; i++){
        for (var j = 0; j < self.goodBulletWidgets.length; j++){
            if (didCollide(self.enemyShipWidgets[i], self.goodBulletWidgets[j]) == 1){
              delete1.push(i);
              delete2.push(j);
              numEnemyShips--;
              break;
            }
        }
      }

      for (var i = 0; i < delete1.length; i++){
        self.enemyShipWidgets.splice(delete1[i], 1);
      }
      for (var i = 0; i < delete2.length; i++){
        self.goodBulletWidgets.splice(delete2[i], 1);
      }
    }


    //set up event listeners
    $("canvas").mousemove(self.canvasMouseMoved, function(evt){
        //update interested parties
        if (self.lives > 0)
          self.playerShips[self.lives-1].mouseMoved(evt);
    });
    $("canvas").mousedown(self.canvasMousePressed, function(evt){
      var someBullet;
      if (self.lives > 0){
        someBullet = SpaceShipBullet.makeBullet(self.context, 10, 3, self.playerShips[self.lives-1].x + self.playerShips[self.lives - 1].width/2 - 5, self.playerShips[self.lives-1].y, false);
        self.goodBulletWidgets.push(someBullet);
      }
    });
}

function didCollide(obj1, obj2) {
  var collide = obj1.x < obj2.x + obj2.width && obj1.x + obj1.width > obj2.x && obj1.y < obj2.y + obj2.height && obj1.y + obj1.height > obj2.y;

  return collide;
}
