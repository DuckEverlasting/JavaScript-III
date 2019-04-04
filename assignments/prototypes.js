/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance hierarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properties and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * name
  * dimensions (These represent the character's size in the video game)
  * destroy() // prototype method that returns: `${this.name} was removed from the game.`
*/

function GameObject(data) {
  this.createdAt = data.createdAt;
  this.name = data.name;
  this.dimensions = data.dimensions;
  this.exists = true;
};

GameObject.prototype.destroy = function() {
  this.exists = false;
  return `${this.name} was removed from the game.`
};


/*
  === CharacterStats ===
  * healthPoints
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats(data) {
  GameObject.call(this, data);
  this.healthPoints = data.healthPoints;
};


CharacterStats.prototype = Object.create(GameObject.prototype);
CharacterStats.prototype.takeDamage = function(dam) {
  this.healthPoints -= dam;
  if (this.healthPoints <= 0) {
    this.healthPoints = 0;
    this.destroy()
  };
  return `${this.name} took damage.`
};
CharacterStats.prototype.displayHealth = function() {
  return `${this.name} currently has ${this.healthPoints} hp remaining.`
};


/*
  === Humanoid (Having an appearance or character resembling that of a human.) ===
  * team
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
 
function Humanoid(data) {
  CharacterStats.call(this, data);
  this.team = data.team;
  this.weapons = data.weapons;
  this.weaponDamage = data.weaponDamage;
  this.accuracy = data.accuracy ? data.accuracy : 0.5;
  this.strength = data.strength;
  this.language = data.language;
};

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

function Hero(data) {
  Humanoid.call(this, data);
  this.preferredAtk = data.preferredAtk ? data.preferredAtk : this.heroBasicAtk;

};

Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.heroBasicAtk = function(target) {
  if (target.exists){
    if (this.exists) {
      let dam = Math.ceil((this.strength / 10) * this.weapons[0].weaponDamage);
      let hit = this.accuracy >= Math.random();
      return (hit) ? `${this.name} attacks ${target.name} valiantly with ${this.weapons[0].weaponName}! ${target.takeDamage(dam)}` : `${this.name} attacks ${target.name} valiantly with ${this.weapons[0].weaponName}! And misses!`;
    } else {
      return `${this.name} is dead!`
    };
  } else {
    return `${target.name} has been vanquished by ${this.name}!`
  };
};

function Villain(data) {
  Humanoid.call(this, data);
  this.preferredAtk = data.preferredAtk ? data.preferredAtk : this.villainBasicAtk;
};

Villain.prototype = Object.create(Humanoid.prototype);
Villain.prototype.villainBasicAtk = function(target) {
  if (target.exists){
    if (this.exists) {
      let dam = Math.ceil((this.strength / 10) * this.weapons[0].weaponDamage);
      let hit = this.accuracy >= Math.random();
      return (hit) ? `${this.name} attacks ${target.name} maliciously with ${this.weapons[0].weaponName}! ${target.takeDamage(dam)}` : `${this.name} attacks ${target.name} maliciously with ${this.weapons[0].weaponName}! And misses!`;
    } else {
      return `${this.name} is dead!`
    };
  } else {
    return `${target.name} has been vanquished by ${this.name}!`
  };
};


// Test you work by un-commenting these 3 objects and the list of console logs below:


const mage = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 1,
    height: 1,
  },
  healthPoints: 50,
  name: 'Bruce',
  team: 'Mage Guild',
  weapons: [
    {"weaponName":"Staff of Shamalama",
    "weaponDamage":30}
  ],
  strength: 14,
  accuracy: .6,
  language: 'Common Tongue',
});

const swordsman = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 15,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    {"weaponName":"Giant Sword",
    "weaponDamage":25},
    {"weaponName":"Shield",
    "weaponDamage":5}
  ],
  strength: 17,
  accuracy: .72,
  language: 'Common Tongue',
});

const archer = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 100,
  name: 'Lilith',
  team: 'Forest Kingdom',
  weapons: [
    {"weaponName":"Bow",
    "weaponDamage":15},
    {"weaponName":"Dagger",
    "weaponDamage":10}
  ],
  strength: 14,
  accuracy: .85,
  language: 'Elvish',
});

const beefman = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 200,
  name: 'Beefman',
  team: 'Good Guys',
  weapons: [
    {"weaponName":"Sword",
    "weaponDamage":20},
    {"weaponName":"Dagger",
    "weaponDamage":10}
  ],
  strength: 18,
  accuracy: .75,
  language: 'Common',
});

const evilDan = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 4,
  },
  healthPoints: 200,
  name: 'Evil Dan',
  team: 'Bad Guys',
  weapons: [
    {"weaponName":"Vile Magicks",
    "weaponDamage":30},
    {"weaponName":"Twisted Knife",
    "weaponDamage":10}
  ],
  strength: 16,
  accuracy: .70,
  language: 'Common',
});

const goblin = new Villain({
  createdAt: new Date(),
  dimensions: {
    length: 1,
    width: 2,
    height: 2,
  },
  healthPoints: 50,
  name: 'Goblin',
  team: 'Bad Guys',
  weapons: [
    {"weaponName":"Slingshot",
    "weaponDamage":10},
    {"weaponName":"Small Knife",
    "weaponDamage":5}
  ],
  strength: 12,
  accuracy: .60,
  language: 'Common',
});

  
  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.healthPoints); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.team); // The Round Table
  console.log(mage.weapons[0].weaponName); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.


   // Stretch task: 
  // * Create Villain and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villains different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villain and one a hero and fight it out with methods!

  
const doBattle = function (fighter1, fighter2) {
  do {
    console.log(fighter1.preferredAtk(fighter2));
    console.log(fighter2.preferredAtk(fighter1));
    console.log(fighter1.displayHealth());
    console.log(fighter2.displayHealth());
    console.log();
  } while (
    fighter1.exists && fighter2.exists
  );
  
  if (fighter1.exists && !fighter2.exists) {
    console.log(`${fighter2.name} has been slain!\n${fighter1.name} is victorious!`)
  } else if (!fighter1.exists && fighter2.exists) {
    console.log(`${fighter1.name} has been slain!\n${fighter2.name} is victorious!`)
  } else if (!fighter1.exists && !fighter2.exists) {
    console.log(`${fighter1.name} and ${fighter2.name} have slain each other, somehow!`)
  } else {
    console.log(`ERROR`)
  };
};

doBattle(beefman, evilDan);