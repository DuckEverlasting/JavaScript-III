  // === Constructors ===
  
  // == GameObject ==

function GameObject(data) {
  this.createdAt = data.createdAt;
  this.name = data.name;
  this.dimensions = data.dimensions;
  this.exists = true;
};

GameObject.prototype.destroy = function() {
  this.exists = false;
  // return `${this.name} was removed from the game.`
};


  // == CharacterStats ==

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
  return `${this.name} took ${dam} damage.`
};
CharacterStats.prototype.displayHealth = function() {
  return `${this.name} currently has ${this.healthPoints} hp remaining.`
};



  // == Humanoid ==
 
function Humanoid(data) {
  CharacterStats.call(this, data);
  this.team = data.team;
  this.weapons = data.weapons;
  this.weaponDamage = data.weaponDamage;
  this.stats = data.stats;
  this.strength = data.strength;
  this.language = data.language;
};

Humanoid.prototype = Object.create(CharacterStats.prototype);
Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}.`;
};
Humanoid.prototype.attackStat = function() {
  switch (this.weapons[0].weaponType) {
    case "melee": return this.stats.str;
    case "ranged": return this.stats.dex;
    case "arcane": return this.stats.int;
    case "divine": return this.stats.wis;
    case "musical": return this.stats.cha;
    default: return this.stats.str;
  };
};
Humanoid.prototype.dodgeStat = function(dodger) {
  switch (this.weapons[0].weaponType) {
    case "melee": return dodger.stats.dex;
    case "ranged": return dodger.stats.dex;
    case "arcane": return dodger.stats.wis;
    case "divine": return dodger.stats.wis;
    case "musical": return dodger.stats.wis;
    default: return dodger.stats.dex;
  };
}


  // == Humanoid Subtypes ==

function Hero(data) {
  Humanoid.call(this, data);
  this.preferredAtk = data.preferredAtk ? data.preferredAtk : this.heroBasicAtk;

};

Hero.prototype = Object.create(Humanoid.prototype);
Hero.prototype.heroBasicAtk = function(target) {
  if (target.exists){
    if (this.exists) {
      const dam = Math.ceil((this.attackStat() / 10) * this.weapons[0].weaponDamage * (Math.random() * .3 + .85));
      const accuracy = (this.attackStat() / 25) * (this.dodgeStat(target) / 50);
      const hit = accuracy >= Math.random();
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
      const dam = Math.ceil((this.attackStat() / 10) * this.weapons[0].weaponDamage * (Math.random() * .3 + .85));
      const accuracy = (this.attackStat() / 25) * (this.dodgeStat(target) / 50);
      const hit = accuracy >= Math.random();
      return (hit) ? `${this.name} attacks ${target.name} maliciously with ${this.weapons[0].weaponName}! ${target.takeDamage(dam)}` : `${this.name} attacks ${target.name} maliciously with ${this.weapons[0].weaponName}! And misses!`;
    } else {
      return `${this.name} is dead!`
    };
  } else {
    return `${target.name} has been vanquished by ${this.name}!`
  };
};

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


  // === Character Data ===

  // == Heroes ==

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
    "weaponDamage":30,
    "weaponType":"arcane"}
  ],
  stats: {
    "str": 8,
    "dex": 13,
    "con": 10,
    "int": 18,
    "wis": 13,
    "cha": 11
  },
  // accuracy: .6,
  language: 'Common Tongue',
});

const swordsman = new Hero({
  createdAt: new Date(),
  dimensions: {
    length: 2,
    width: 2,
    height: 2,
  },
  healthPoints: 150,
  name: 'Sir Mustachio',
  team: 'The Round Table',
  weapons: [
    {"weaponName":"Giant Sword",
    "weaponDamage":25,
    "weaponType":"melee"},
    {"weaponName":"Shield",
    "weaponDamage":5,
    "weaponType":"melee"}
  ],
  stats: {
    "str": 16,
    "dex": 14,
    "con": 18,
    "int": 6,
    "wis": 10,
    "cha": 12
  },
  // accuracy: .72,
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
    "weaponDamage":15,
    "weaponType":"ranged"},
    {"weaponName":"Dagger",
    "weaponDamage":10,
    "weaponType":"melee"}
  ],
  stats: {
    "str": 14,
    "dex": 16,
    "con": 12,
    "int": 13,
    "wis": 15,
    "cha": 12
  },
  // accuracy: .85,
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
    "weaponDamage":20,
    "weaponType":"melee"},
    {"weaponName":"Dagger",
    "weaponDamage":10,
    "weaponType":"melee"}
  ],
  stats: {
    "str": 18,
    "dex": 14,
    "con": 16,
    "int": 10,
    "wis": 10,
    "cha": 15

  },
  // accuracy: .75,
  language: 'Common',
});


  // == Villains ==

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
    "weaponDamage":30,
    "weaponType":"arcane"},
    {"weaponName":"Twisted Knife",
    "weaponDamage":10,
    "weaponType":"melee"}
  ],
  stats: {
    "str": 12,
    "dex": 14,
    "con": 15,
    "int": 20,
    "wis": 14,
    "cha": 8
  },
  // accuracy: .70,
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
    "weaponDamage":10,
    "weaponType":"ranged"},
    {"weaponName":"Small Knife",
    "weaponDamage":5,
    "weaponType":"melee"}
  ],
  stats: {
    "str": 12,
    "dex": 14,
    "con": 10,
    "int": 5,
    "wis": 8,
    "cha": 6
  },
  // accuracy: .60,
  language: 'Common',
});



doBattle(beefman, evilDan);