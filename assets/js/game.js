
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min); 

  return value; 
}


// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip" || promptFight === "SKIP") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // remove enemy's health by subtracting the amount set in the playerAttack variable
    var damage = randomNumber(playerAttack - 3, playerAttack); 
    enemyHealth = Math.max(0, enemyHealth - damage); 
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    // remove players's health by subtracting the amount set in the enemyAttack variable
    var damage = randomNumber(enemyAttack - 3, enemyAttack);
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  } // end of while loop
}; // end of fight function

var startGame = function() {
  // reset player stats
  playerHealth = 100; 
  playerAttack = 10; 
  playerMoney = 10; 
// fight each enemy-robot by looping over them and fighting them one at a time

  for (var i = 0; i < enemyNames.length; i++) {
  // if player is still alive, keep fighting
    if (playerHealth > 0) {
    // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
    window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

    // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];

    // reset enemyHealth before starting new fight
      enemyHealth = Math.floor(Math.random() * 21) + 60;

    

    // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
     fight(pickedEnemyName);

     if (playerHealth > 0 && i < enemyNames.length -1){
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
      if (playerMoney >= 7){
      window.alert("Refilling player's health by 20 for 7 dollars.");
    playerHealth = playerHealth + 20; 
    playerMoney = playerMoney - 7; 
  
      }
      else {
        window.alert("You do not have enough money!");
      }
      break; 
    case 'upgrade':
      if (playerMoney >= 7){
       window.alert("Upgrading player's attack by 6 for 7 dollars.");
    playerAttack = playerAttack + 6; 
    playerMoney = playerMoney - 7; 
      }
      else {
        window.alert("You do not have enough money!"); 
      }
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
  if (playerHealth > 0) {
    window.alert("Great Job, you've survived the game! you now have a score of " + playerMoney + ".");
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

