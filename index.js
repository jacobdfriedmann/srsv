var gamePrompt = require('game-prompt');
var colors = require('colors');

var playerName;
var vehicleName;
var fuel = 1000;
var playerInventory = [];

function addItemToInventory(item) {
  // Ensure this item is not already in inventory
  if (playerInventory.indexOf(item) < 0) {
    // Push it into the inventory array
    playerInventory.push(item);
  }
}

function begin() {
  gamePrompt('S.R.S.V.\nPress ENTER to start'.red, intro);
}

function intro() {
  gamePrompt([
    'You are the captain of a Solo Research Space Vehicle (S.R.S.V.) on an ' +
    'expedition to explore foreign planets. Your mission is to make contact ' +
    'with three alien life forms, acquire an artifact representative of their ' +
    'culture, and bring back your findings to Earth.',
    'A voice comes on over the intercom'.red,
    '"S.R.S.V. captain, please state your name for identity verification."'
  ], saveName);
}

function saveName(name) {
  playerName = name;

  gamePrompt([
    '"Thank you Captain ' + playerName + '."',
    '"Please state your vehicle name for identity verification."'
  ], saveVehicleName);
}

function saveVehicleName(name) {
  vehicleName = name;

  gamePrompt([
    '"Thank you Captain ' + playerName + ' of S.R.S.V. ' + vehicleName + '."',
    '"Your identity has been verified."'
  ], askTravel);
}

function askTravel() {
  // Create a string for displaying the current level of fuel
  var fuelPrompt = 'You have ' + fuel + ' gallons of remaining.';
  // Build up a string for choosing the destination
  var travelPrompt = 'Choose your destination Captain ' + playerName + '.';
  travelPrompt += '\n(E)arth - 10 lightyears';
  travelPrompt += '\n(M)esnides - 20 lightyears';
  travelPrompt += '\n(L)aplides - 50 lightyears';
  travelPrompt += '\n(K)iyturn - 120 lightyears';
  travelPrompt += '\n(A)enides - 25 lightyears';
  travelPrompt += '\n(C)ramuthea - 200 lightyears';
  travelPrompt += '\n(S)meon T9Q - 400 lightyears';
  travelPrompt += '\n(G)leshan 7Z9 - 85 lightyears';

  // Display both strings to the user
  gamePrompt([
    fuelPrompt,
    travelPrompt
  ], travel);
}

function travel(planet) {
  // Standardize the case of the input
  var planetUpperCase = planet.toUpperCase();

  // Check to see if the user indicated Earth
  if (planetUpperCase === 'E') {
    // Subtract the appropriate amount of gas from the global fuel
    // variable
    fuel -= 10;
    // If the fuel has dipped below 0, end the game
    if (fuel <= 0) {
      lose();

    // Else, continue travelling to earth
    } else {
      gamePrompt([
        'Travelling to Earth using 10 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachEarth);
    }
  } else if (planetUpperCase === 'M') {
    // this is the same as above, except for Mesnides
    fuel -= 20;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Mesnides using 20 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachMesnides);
    }
  } else if (planetUpperCase === 'L') {
    fuel -= 50;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Laplides using 50 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachLaplides);
    }
  } else if (planetUpperCase === 'K') {
    fuel -= 120;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Kiyturn using 120 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachKiyturn);
    }
  } else if (planetUpperCase === 'A') {
    fuel -= 25;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Aenides using 25 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachAenides);
    }
  } else if (planetUpperCase === 'C') {
    fuel -= 200;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Cramuthea using 200 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachCramuthea);
    }
  } else if (planetUpperCase === 'S') {
    fuel -= 400;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Smeon T9Q using 400 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachSmeon);
    }
  } else if (planetUpperCase === 'G') {
    fuel -= 85;
    if (fuel <= 0) {
      lose();
    } else {
      gamePrompt([
        'Travelling to Gleshan 7Z9 using 85 gallons of fuel',
        'You now have ' + fuel + ' gallons of fuel remaining.'
      ], approachGleshan);
    }
  // If the user put in characters we don't recognize, let them try again
  } else {
    gamePrompt(
      'That is not a recognized destination',
      travel
    );
  }
}

function approachEarth() {
  // On Earth, look to see if the user has collected sufficient artifacts to win.
  if (playerInventory.length === 3) {
    gamePrompt('You\'ve arrived at Earth with 3 artifacts.', win);
  // If not, send them back out
  } else {
    fuel += 10;
    gamePrompt([
      'You\'ve arrived at Earth.',
      '"Captain ' + playerName + ', you do not have enough artifacts."',
      '"Take this fuel and get back out there." (+10)'
    ], askTravel);
  }
}

function approachSmeon() {
  fuel += 100;

  gamePrompt([
    'You\'ve arrived at Smeon T9Q. As you land, a representative of the Cramuthean people is there to greet you.',
    '"Welcome to Smeon T9Q."',
    '"The Cramuthean people have lived here since we were forced to leave our home planet 100 years ago."',
    '"The planet was ravaged by droughts, severe weather and foreign invasions."',
    '"We now call Smeon T9Q home."',
    '"You\'ve travelled far, here is some fuel for your journey. (+100)"',
    'You now have ' + fuel + ' gallons of fuel.'
  ], askSmeon);
}

function askSmeon() {
  gamePrompt('"What brings you here?"\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerSmeon);
}

function answerSmeon(answer) {
  // Check user input for particular letter
  if (answer.toLowerCase() === 'a') {
    // Add the item to the players global inventory by using the addItemToInventory
    // helper function we defined above.
    addItemToInventory('Cramun Flower');

    gamePrompt([
      '"Here, take this dried Cramun Flower from our home planet."',
      'Cramun Flower added to your inventory.',
      // Here add the 's' to the end of 'artifact' if the number of things in the
      // inventory array is greater than 1.
      'You now have ' + playerInventory.length + ' artifact' + (playerInventory.length > 1 ? 's.' : '.')
    ], askSmeon);
  } else if (answer.toLowerCase() === 'p') {
    gamePrompt([
      '"The people of Aenides once tried to take over our home planet by force."',
      '"We fended them off, but they are an aggresive people to be avoided.'
    ], askSmeon);
  } else if (answer.toLowerCase() === 'l') {
    // If they want to leave, go back to the travel prompt. Here we can just call it
    // directly instead of letting gamePrompt do it since we have nothing to say to the
    // user before it happens.
    askTravel();
  } else {
    gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askSmeon);
  }
}

function approachGleshan() {
  gamePrompt([
    'You\'ve arrived at Gleshan 7Z9. As you land, a representative of the Gleshan people is there to greet you.',
    '"Welcome to our humble planet Gleshan 7Z9."',
  ], askGleshan);
}

function askGleshan() {
  gamePrompt('"How can we be of service?"\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerGleshan);
}

function answerGleshan(answer) {
  if (answer.toLowerCase() === 'a') {
    gamePrompt(
      '"I\'m sorry, but we are a poor planet and it is against our custom to part with our precious artifacts."',
      askGleshan
    );
  } else if (answer.toLowerCase() === 'p') {
    gamePrompt([
      '"We were once friends with the people of Cramuthea, but it has been years since we have heard from them."',
      '"They are a friendly and generous people."'
    ], askGleshan);
  } else if (answer.toLowerCase() === 'l') {
    askTravel();
  } else {
    gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askGleshan);
  }
}

function approachAenides() {
  gamePrompt([
    'You\'ve arrived at Aenides. As you try to land, the people begin firing on your ship.',
    'You narrowly avoid disaster, but are forced to turn around.'
  ], askTravel);
}

function approachKiyturn() {
  gamePrompt(
    'You\'ve arrived at Kiyturn. As you land, a representative of the Kiyturn people is there to greet you.',
    askKiyturn
  );
}

function askKiyturn() {
  gamePrompt('"Hello, what brings you to Kiyturn? You\'re not here to cause trouble are you?"' +
    '\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerKiyturn);
}

function answerKiyturn(answer) {
  if (answer.toLowerCase() === 'a') {
    addItemToInventory('Kiyturn Glass Bowl');
    gamePrompt([
      '"Here, take this Kiyturn Glass Bowl, a symbol of our civilization."',
      'Kiyturn Glass Bowl added to your inventory.',
      'You now have ' + playerInventory.length + ' artifact' + (playerInventory.length > 1 ? 's.' : '.')
    ], askMesnides);
  } else if (answer.toLowerCase() === 'p') {
    gamePrompt('"I\'m sorry, but we do not leave our planet. The universe, to us, is a beautiful mystery."', askKiyturn);
  } else if (answer.toLowerCase() === 'l') {
    askTravel();
  } else {
    gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askKiyturn);
  }
}

function approachLaplides() {
  gamePrompt([
    'You enter orbit around Laplides. Looking down at the planet, you see ' +
    'signs of atomic war and realize there is no option but to turn around.'
  ], askTravel);
}

function approachMesnides() {
  gamePrompt([
    'You\'ve arrived at Mesnides. As you land, a representative of the Mesnidian people is there to greet you.',
    '"Welcome, traveler, to Mesnides."',
  ], askMesnides);
}

function askMesnides() {
  gamePrompt('"How can we assist you?"\nAsk about (A)rtifact.\nAsk about other (P)lanets\n(L)eave', answerMesnides);
}

function answerMesnides(answer) {
  if (answer.toLowerCase() === 'a') {
    addItemToInventory('Myoin Horn');
    gamePrompt([
      '"Here, take this Myoin Horn, an ancient Mesnidian instrument."',
      'Myoin Horn added to your inventory.',
      'You now have ' + playerInventory.length + ' artifact' + (playerInventory.length > 1 ? 's.' : '.')
    ], askMesnides);
  } else if (answer.toLowerCase() === 'p') {
    gamePrompt('"Well, Laplides suffered from atomic war and has been uninhabited ' +
    'for centuries. You would do well to avoid it on your journey."', askMesnides);
  } else if (answer.toLowerCase() === 'l') {
    askTravel();
  } else {
    gamePrompt('I\'m sorry traveler, but I don\'t understand your question', askMesnides);
  }
}

function approachCramuthea() {
  fuel += 500;

  gamePrompt([
    'You have arrived at Cramuthea.',
    'The planet is abandoned, but it looks like people were here in the not-too-distant past.',
    'You land on the planet and find fuel for your ship. (+500)',
    'You now have ' + fuel + ' gallons of fuel.',
    'You find a beacon signal.',
    'It appears the people that once lived here have migrated to Smeon T9Q.'
  ], askTravel);
}

function lose() {
  gamePrompt([
    'You ran out of fuel',
    'Game Over'.red
  ]);
}

function win() {
  gamePrompt([
    '"Great work Captain ' + playerName + '."',
    '"Your mission is complete"'.green
  ]);
}

// Call the begin function to actually get things going!
begin();
