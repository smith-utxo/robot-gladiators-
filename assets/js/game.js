var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min); 

  return value; 
}


var playerInfo = {
  name: window.prompt("What is your robot's name?"),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100; 
    this.attack = 10; 
    this.money = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      console.log("Health refilled by 20 pts for 7 dollars. Good Deal!");
    this.heatlh += 20; 
    this.money -= 7;
    } 
    else{
      console.log("I'm sorry but you're broke!");
    }
  },
  upgradeAttack: function() {
    if(this.money >= 7) {
      console.log("You just upgraded your attack by 7 pts for $7!");
    this.attack += 7; 
    this.money -= 7; 
    }
    else{
      console.log("you are broke and will need to sell a kidney first!");
    }
  }

};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14),
    shield: {
       type: "wood",
       strength: 10
    }
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

var enemyHealth = 50;
var enemyAttack = 12;


// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
  
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerInfo.name + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerInfo.money for skipping
        playerInfo.money = Math.max(0, playerInfo.money - 10);
        console.log("playerInfo.money", playerInfo.money);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack); 
    enemy.health = Math.max(0, enemy.health - damage); 
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemy.attack variable
    var damage = randomNumber(enemy.attack - 3, enemy.attack);
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  } // end of while loop
}

var startGame = function() {
  // reset player stats
  playerInfo.reset(); 
// fight each enemy-robot by looping over them and fighting them one at a time

  for (var i = 0; i < enemyInfo.length; i++) {
  // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

    // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60); 

    

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
     fight(pickedEnemyObj);

     if (playerInfo.health > 0 && i < enemyInfo.length -1){
       var storeConfirm = window.confirm("The fight is over, visit the store?");

       if (storeConfirm){
      
       shop(); 
     }
    }
   }
  // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
   }
  }
}

startGame(); 

var shop = function() {
  var shopOption = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
  var shopOptionPrompt = shopOption.toLowerCase(); 

  switch (shopOptionPrompt){
    case 'refill':
      playerInfo.refillHealth(); 
      break;   
     
      case 'upgrade':
      playerInfo.upgradeAttack(); 
      break; 

    case 'leave': 
      window.alert("leaving the store"); 
      break; 

    default: window.alert("you did not pick a valid option. Please try again."); 
    shop(); 
    break; 
  }


}





  // function to end the entire game 
var endGame = function() {
  window.alert("The game has now ended. Let's see how you did!");

  //if player is still alive, player wins! 
  if (playerInfo.health > 0) {
    window.alert("Great Job, you've survived the game! you now have a score of " + playerInfo.money + ".");
  }
  else {
    window.alert("you've lost your robot in battle.");
  }

  //ask player if they'd like to play again 

var playAgainConfirm = window.confirm("Would you like to play again?");

if (playAgainConfirm) {
  //restart the game 
  startGame(); 
}
else {
  window.alert("Thank you for playing Robot Gladiators! Come back soon!");
}
}

