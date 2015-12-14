namespace gameHandler{
	using enemyZombie;

	class GameObjectManager{
		List<Enemy> enemies;

		//Constructor
		public GameObjectManager(){
			enemies = new List<Enemy>();
		}

		//Spawns a new zombie
		void addEnemy(Enemy e){
			enemies.add(e);
		}

		//Removes decorators from a zombie and eventually kills it.
		void removeEnemy(Enemy e){
			foreach (Enemy te in enemies){
				if (te == e){                 //Check if it's the correct enemy
				if (te.name == "Zombie")  //Base case (no attachments)
				enemies.remove(te);
				else{                     //This covers cases where the zombie has a decorator. It will recast the enemy a to base zombie.
					te = null;
					te = new Zombie();
				}
			}
		}
	}

}

class GameEventManager{
	public GameObjectManager objs;

	//Constructor
	public GameEventManager(){
		objs = new GameObjectManager();
	}

	//Called when a collision is detected between a Bullet b and an Enemy e
	public void doDamage(Bullet b, Enemy e){
		int damage = b.getDamage();
		e.TakeDamage(damage);
	}

	//Called when "collision" is detected between a MagnetShroom and an enemy.
	public void applyMagnetForce(Enemy e){
		//If it's a metal object, we call a "removeMetalObject()" method of e
		if (e.isMetal){
			e.takeDamage(1000);
		}
	}
}
}


namespace enemyZombie{
	using gameHandler;

	public abstract class Enemy{
		public int health;
		public bool isMetal;
		public string name;

		//Constructor
		public Enemy(){
			health = 1000;
			isMetal = false;
			name = "Generic Enemy";
		}

		//Abstract methods
		public abstract Die();
		public abstract TakeDamage(int damage);
	}

	/***
	* -Inherits the Enemy abstract class
	* -Represents the generic zombie with NO decortators
	***/
	public class Zombie : Enemy{
		public int health;
		public string name;
		public bool isMetal;
		public GameObjectMangager pieces;

		public Zombie(GameObjectManager g){
			isMetal = false;
			health = 1000;
			name = "Zombie"
			pieces = g;
		}

		//Decrements damage from the enemy
		public override TakeDamage(int damage){
			if (health - damage > 0)
			health -= damage;
			else
			this.die();
		}

		//Destroys the enemy
		public override die(){
			//KILL ME
			pieces.removeEnemy(this);
		}
	}

}


namespace zombieDecorator{
	using gameHandler;

	/****************************************
	* -Inherits the Enemy abstract class    *
	* -Represents abstract dectorator class *
	*****************************************/
	public abstract class ZombieDecorator : Enemy{
		public void removeMetalObject();
	}

	/*************************************
	* -Inherits the ZombieDecorator class*
	* -Represents the Door dectorator    *
	**************************************/
	public class Door : Enemy{
		public int health;
		public bool isMetal;
		public string name;
		public GameObjectMangager pieces;

		//Constructor
		public Door(GameObjectManger g){
			isMetal = true;
			name = "Door";
			health = 1000;
			pieces = g;
		}

		//Decrements damage from the enemy
		public override TakeDamage(int damage){
			if (health - damage > 0)
			health -= damage;
			else
			this.die();
		}

		//Destroys the enemy
		public override die(){
			//KILL ME
			pieces.removeEnemy(this);
		}
	}



	/***
	* -Inherits the ZombieDecorator class
	* -Represents the Bucket dectorator
	***/
	public class Bucket : Enemy{
		public int health;
		public bool isMetal;
		public string name;
		public GameObjectMangager pieces;

		public Bucket(GameObjectManger g){
			isMetal = true;
			name = "Bucket";
			health = 1000;
			pieces = g;
		}


		//Decrements damage from the enemy
		public override TakeDamage(int damage){
			if (health - damage > 0)
			health -= damage;
			else
			this.die();
		}

		//Destroys the enemy
		public override die(){
			//KILL ME
			pieces.removeEnemy(this);;
		}
	}


	/***
	* -Inherits the ZombieDecorator class
	* -Represents the Cone dectorator
	***/
	public class Cone : Enemy{
		public int health;
		public bool isMetal;
		public string name;
		public GameObjectMangager pieces;

		//Constructor
		public Cone(GameObjectManger g){
			isMetal = false;
			name = "Cone";
			health = 1000;
			pieces = g;
		}

		//Decrements damage from the enemy
		public override TakeDamage(int damage){
			if (health - damage > 0)
			health -= damage;
			else
			this.die();
		}

		//Destroys the enemy
		public override die(){
			//KILL ME
			pieces.removeEnemy(this);
		}
	}
}
