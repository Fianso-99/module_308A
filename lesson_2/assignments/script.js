/* =========================
   PART 1: HUMBLE BEGINNINGS
   (OBJECT VERSION - LEARNING STEP)
   ========================= */

/*
const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      belongings: ["small hat", "sunglasses"]
    }
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}`);
  }
};

// Inventory loop practice
for (let item of adventurer.inventory) {
  console.log(item);
}
*/



/* =========================
   PART 1 & 2: BASE CHARACTER
   ========================= */

class Character {
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}`);
    return result;
  }
}

/* =========================
   PART 3: ADVENTURER CLASS
   ========================= */

class Adventurer extends Character {
  static ROLES = ["Fighter", "Healer", "Wizard"];

  constructor(name, role) {
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error("Invalid role");
    }
    super(name);
    this.role = role;
    this.inventory.push("bedroll", "50 gold coins");
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    this.roll();
  }

  duel(opponent) {
    console.log(`⚔️ ${this.name} vs ${opponent.name}`);

    while (this.health > 50 && opponent.health > 50) {
      const roll1 = this.roll();
      const roll2 = opponent.roll();

      if (roll1 > roll2) {
        opponent.health--;
      } else if (roll2 > roll1) {
        this.health--;
      }

      console.log(
        `${this.name}: ${this.health} | ${opponent.name}: ${opponent.health}`
      );
    }

    const winner =
      this.health > opponent.health ? this.name : opponent.name;
    console.log(`🏆 ${winner} wins the duel!`);
  }
}

/* =========================
   PART 3: COMPANION CLASS
   ========================= */

class Companion extends Character {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  assist() {
    console.log(`${this.name} the ${this.type} assists!`);
  }
}

/* =========================
   PART 5: FACTORY CLASS
   ========================= */

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const adventurer = new Adventurer(name, this.role);
    this.adventurers.push(adventurer);
    return adventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find(a => a.name === name);
  }
}

/* =========================
   PART 6 & 7: GAME SETUP
   ========================= */

// Factories
const healers = new AdventurerFactory("Healer");
const fighters = new AdventurerFactory("Fighter");

// Adventurers
const robin = healers.generate("Robin");
const aragorn = fighters.generate("Aragorn");

// Companions
const leo = new Companion("Leo", "Cat");
const frank = new Companion("Frank", "Flea");

leo.companion = frank;
robin.companion = leo;

// Test actions
robin.scout();
aragorn.scout();

leo.assist();
frank.roll();

// Duel
aragorn.duel(robin);

