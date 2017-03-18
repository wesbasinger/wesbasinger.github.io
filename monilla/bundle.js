/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const background = __webpack_require__(1);
	const gameData = __webpack_require__(3);
	var gameUI = __webpack_require__(4);
	var gameLogic = __webpack_require__(5);
	var gameEmitter = __webpack_require__(6);


	background.draw();
	gameUI.drawPlayer(1);

	var   seaRate = document.getElementById('sea-rate'),
	      landRate = document.getElementById('land-rate'),
	      airRate = document.getElementById('air-rate'),
	      railRate = document.getElementById('rail-rate'),
	      hotelRate = document.getElementById('hotel-rate'),
	      houseRate = document.getElementById('house-rate'),
	      officeRate = document.getElementById('office-rate');
	seaRate.innerText = gameData.interestRate["sea"];
	landRate.innerText = gameData.interestRate["land"];
	airRate.innerText = gameData.interestRate["air"];
	railRate.innerText = gameData.interestRate["rail"];
	hotelRate.innerText = gameData.interestRate["hotel"];
	houseRate.innerText = gameData.interestRate["house"];
	officeRate.innerText = gameData.interestRate["office"];

	var currentBalance = document.getElementById('current-balance');
	currentBalance.innerText = gameLogic.balance.toFixed(2).replace(/./g, function(c, i, a) {
	    return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	});

	var messages = document.getElementById('messages');
	var decisionBox = document.getElementById('user-decision-box');


	var rollButton = document.getElementById('roll-dice');
	rollButton.onclick = function(e) {
	  var start = gameLogic.playerPosition;
	  background.draw();
	  var turn = gameLogic.takeTurn();
	  gameUI.drawPlayer(turn);
	  currentBalance.innerText = gameLogic.balance.toFixed(2).replace(/./g, function(c, i, a) {
	      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	  });
	}

	gameEmitter.on('communityChest', function(data) {
	  decisionBox.innerHTML = "";
	  messages.innerText = "";
	  messages.innerText = data.message;
	});

	gameEmitter.on('centralTransportation', function(data) {
	  messages.innerText = "";
	  messages.innerText = data.message;
	});

	gameEmitter.on('realEstate', function(data) {
	  messages.innerText = "";
	  messages.innerText = data.message;
	});

	gameEmitter.on('passedGo', function() {
	  gameLogic.balance += gameData.salary;
	  gameLogic.payDividends();
	  gameEmitter.emit('updateFinancials');
	  messages.innerText = ""
	  messages.innerText += "You passed Go!";
	});

	gameEmitter.on('investmentInterface', function(data) {
	  decisionBox.innerHTML = "";
	  var text = document.createElement("p");
	  if (data.context === "realEstate") {
	    text.innerText = "Would you like to invest in real estate?  If so, put a number in the box and confirm."
	  } else if (data.context === "centralTransportation") {
	    text.innerText = "Would you like to invest in transportation?  If so, put a number in the box and confirm."
	  }
	  decisionBox.appendChild(text);

	  var input = document.createElement("input");
	  input.setAttribute("id", "amount");
	  decisionBox.appendChild(input);

	  var button = document.createElement("button");
	  var bText = document.createTextNode("Confirm");
	  button.appendChild(bText);
	  button.onclick = function() {
	    var asset;
	    var squareNumber = data.property;
	    if (squareNumber === 3) {
	      asset = "air"
	    } else if (squareNumber === 5) {
	      asset = "hotel"
	    } else if (squareNumber === 7) {
	      asset = "land"
	    } else if (squareNumber === 8) {
	      asset = "house"
	    } else if (squareNumber === 9) {
	      asset = "sea"
	    } else if (squareNumber === 10) {
	      asset = "office"
	    } else if (squareNumber === 12) {
	      asset = "rail"
	    }
	    var possibleError = gameLogic.invest(asset, input.value);
	    input.value = "";
	    if (possibleError) {
	      text.innerText = "";
	      text.innerText = possibleError.error;
	    } else {
	      text.innerText = "";
	      text.innerText = "Investment was successful!"
	      input.style.visibility = 'hidden';
	      button.style.visibility = "hidden";
	    }

	  }
	  decisionBox.appendChild(button);
	})

	gameEmitter.on('gameWon', function() {
	  rollButton.style.visibility = "hidden";
	  decisionBox.innerHTML = null;
	  messages.innerHTML = "";
	  messages.innerText = "You win!  Game over.  Congrats on making it millionaire status."
	});

	gameEmitter.on('updateFinancials', function() {
	  currentBalance.innerText = "";
	  currentBalance.innerText = gameLogic.balance.toFixed(2).replace(/./g, function(c, i, a) {
	      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	  });
	  var net = document.getElementById('net-worth');
	  net.innerText = "";
	  net.innerText = gameLogic.netWorth().toFixed(2).replace(/./g, function(c, i, a) {
	      return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
	  });
	  var seaAmount = document.getElementById('sea-amount'),
	      landAmount = document.getElementById('land-amount'),
	      airAmount = document.getElementById('air-amount'),
	      railAmount = document.getElementById('rail-amount'),
	      hotelAmount = document.getElementById('hotel-amount'),
	      houseAmount = document.getElementById('house-amount'),
	      officeAmount = document.getElementById('office-amount');
	  seaAmount.innerText = "";
	  seaAmount.innerText = gameLogic.investment.sea;
	  landAmount.innerText = "";
	  landAmount.innerText = gameLogic.investment.land;
	  airAmount.innerText = "";
	  airAmount.innerText = gameLogic.investment.air;
	  railAmount.innerText = "";
	  railAmount.innerText = gameLogic.investment.rail;
	  hotelAmount.innerText = "";
	  hotelAmount.innerText = gameLogic.investment.hotel;
	  houseAmount.innerText = "";
	  houseAmount.innerText = gameLogic.investment.house;
	  officeAmount.innerText = "";
	  officeAmount.innerText = gameLogic.investment.office;
	})


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(2);

	const canvas = globals.canvas;
	const ctx = globals.ctx;

	const tileSize = globals.tileSize;
	const xPadding = globals.xPadding;
	const yPadding = globals.yPadding;
	const playerBoxPadding = globals.playerBoxPadding;

	var background = {
	  grid : [
	    [1,  12, 11, 10],
	    [2, 0, 0, 9],
	    [3, 0, 0, 8],
	    [4, 5, 6, 7]
	  ],
	  draw: function() {
	    var helper = function(color) {
	      ctx.beginPath();
	      ctx.rect(tileSize*i, tileSize*j, tileSize, tileSize);
	      ctx.fillStyle = color;
	      ctx.fill();
	      ctx.closePath();
	      if (color !== '#4ABDAC') {
	        ctx.beginPath();
	        ctx.rect(
	          tileSize*i + playerBoxPadding,
	          tileSize*j + playerBoxPadding,
	          playerBoxPadding*2,
	          playerBoxPadding*2
	        );
	        ctx.fillStyle = 'white';
	        ctx.fill();
	        ctx.closePath();
	      }
	    }
	    ctx.clearRect(0, 0, canvas.width, canvas.height);
	    for (var i=0; i<this.grid.length; i++) {
	      for (var j=0; j<this.grid[0].length; j++) {
	        // background
	        if (this.grid[i][j] === 0) {
	          helper('#4ABDAC');
	          //start square top left
	        } else if (this.grid[i][j] === 1) {
	          helper('#FC1A4A');
	          ctx.fillStyle = 'black';
	          ctx.font = "20px Arial";
	          ctx.fillText("Start", tileSize*i + xPadding + 20, tileSize*j + yPadding);
	          ctx.font = "10px Arial";
	          ctx.fillText("Every trip collects $200", tileSize*i + xPadding, tileSize*j + yPadding + 90)
	        } else if (this.grid[i][j] === 2 || this.grid[i][j] === 4 || this.grid[i][j] === 6 || this.grid[i][j] === 11) {
	          helper('#F7B733');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Community Chest", tileSize*i + xPadding, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Could be good, could be bad :-)", tileSize*i + xPadding -13, tileSize*j + yPadding + 90)
	        } else if (this.grid[i][j] === 3) {
	          helper('#DFDCE3');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Air -> Ticket Cost: $800", tileSize*i + xPadding, tileSize*j + yPadding + 90)
	        } else if (this.grid[i][j] === 5) {
	          helper('#FC1A4A');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Real Estate", tileSize*i + xPadding + 10, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Hotel -> Stay Price: $100", tileSize*i + xPadding, tileSize*j + yPadding + 85)
	          ctx.fillText("Hotel -> Buy Price: $400000", tileSize*i + xPadding, tileSize*j + yPadding + 95)
	        } else if (this.grid[i][j] === 7) {
	          helper('#DFDCE3');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Land -> Ticket Cost: $50", tileSize*i + xPadding, tileSize*j + yPadding + 90)
	        } else if (this.grid[i][j] === 8) {
	          helper('#FC1A4A');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Real Estate", tileSize*i + xPadding + 10, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("House -> Stay Price: $20", tileSize*i + xPadding, tileSize*j + yPadding + 85)
	          ctx.fillText("House -> Buy Price: $100000", tileSize*i + xPadding, tileSize*j + yPadding + 95)
	        } else if (this.grid[i][j] === 9) {
	          helper('#DFDCE3');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Sea -> Ticket Cost: $400", tileSize*i + xPadding, tileSize*j + yPadding + 90)
	        } else if (this.grid[i][j] === 10) {
	          helper('#FC1A4A');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Real Estate", tileSize*i + xPadding + 10, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Office -> Stay Price: Free", tileSize*i + xPadding, tileSize*j + yPadding + 85)
	          ctx.fillText("Office -> Buy Price: $200000", tileSize*i + xPadding, tileSize*j + yPadding + 95)
	        } else if (this.grid[i][j] === 12) {
	          helper('#DFDCE3');
	          ctx.fillStyle = 'black';
	          ctx.font = "12px Arial";
	          ctx.fillText("Central Transportation", tileSize*i + xPadding - 12, tileSize*j + yPadding - 5);
	          ctx.font = "8px Arial";
	          ctx.fillText("Rail -> Ticket Cost: $100", tileSize*i + xPadding, tileSize*j + yPadding + 90)
	        }
	      }
	    }
	  }
	}

	module.exports = background;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var globals = {
	  canvas: document.getElementById('canvas'),
	  ctx: canvas.getContext('2d'),
	  tileSize: 128,
	  xPadding: 20,
	  yPadding: 25,
	  playerBoxPadding: 32
	}

	module.exports = globals;


/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = {
	  communityChest: [
	    {
	      "description" : "You have inherited $200 from a dead relative.  But the funeral cost $500.  Do the math.",
	      "net" : -300
	    },
	    {
	      "description" : "The kids need braces, all of them.  Pay the dentist $1000.",
	      "net" : -1000
	    },
	    {
	      "description" : "You win the lottery, here take this $10.  It was a scratch off.",
	      "net" : 10
	    },
	    {
	      "description" : "You pick up an odd job doing security.  It pays $500",
	      "net" : 500
	    },
	    {
	      "description" : "You find out you an an heir to a $200,000 fortune.  You keep it all for yourself.",
	      "net" : 200000
	    },
	    {
	      "description" : "Ugh, car repairs...",
	      "net" : -500
	    },
	    {
	      "description" : "You decide to go back to school.  That's going to cost $20,000",
	      "net" : 20000
	    }
	  ],
	  destinations: ["Texas", "Maine", "Hawaii", "Paris", "New York", "Dubai", "Instabul"],
	  initialBalance: 40000,
	  salary: 40000,
	  values: {
	    "hotel" : 400000,
	    "house" : 100000,
	    "office" : 200000
	  },
	  interestRate: {
	    "air": 0.20,
	    "hotel": 0.30,
	    "land": 0.25,
	    "house": 0.10,
	    "sea": 0.15,
	    "office": 0.15,
	    "rail": 0.05
	  },
	  winningBalance : 1000000
	}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var globals = __webpack_require__(2);
	var background = __webpack_require__(1);
	const ctx = globals.ctx;
	const playerBoxPadding = globals.playerBoxPadding;
	const tileSize = globals.tileSize;


	var gameUI = {
	  drawHelper: function(x, y) {
	    ctx.beginPath();
	    ctx.rect(x, y, playerBoxPadding, playerBoxPadding);
	    ctx.fillStyle = 'black';
	    ctx.fill();
	    ctx.closePath();
	  },
	  drawPlayer: function(squareNumber) {
	    if (squareNumber === 1) {
	      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2);
	    } else if (squareNumber === 2) {
	      this.drawHelper(playerBoxPadding*3/2 + tileSize, playerBoxPadding*3/2);
	    } else if (squareNumber === 3) {
	      this.drawHelper(playerBoxPadding*3/2 + 2*tileSize, playerBoxPadding*3/2);
	    } else if (squareNumber === 4) {
	      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2);
	    } else if (squareNumber === 5) {
	      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + tileSize);
	    } else if (squareNumber === 6) {
	      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + 2*tileSize);
	    } else if (squareNumber === 7) {
	      this.drawHelper(playerBoxPadding*3/2 + 3*tileSize, playerBoxPadding*3/2 + 3*tileSize);
	    } else if (squareNumber === 8) {
	      this.drawHelper(playerBoxPadding*3/2 + 2*tileSize, playerBoxPadding*3/2 + 3*tileSize);
	    } else if (squareNumber === 9) {
	      this.drawHelper(playerBoxPadding*3/2 + tileSize, playerBoxPadding*3/2 + 3*tileSize);
	    } else if (squareNumber === 10) {
	      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2 + 3*tileSize);
	    } else if (squareNumber === 11) {
	      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2 + 2*tileSize);
	    } else if (squareNumber === 12) {
	      this.drawHelper(playerBoxPadding*3/2, playerBoxPadding*3/2 + tileSize);
	    }
	  },
	  animate: function(start, numMoves) {
	    var self = this;
	    var start = start
	    var interval = setInterval(function() {
	      background.draw();
	      self.drawPlayer(start);
	      start ++;
	      if (start === numMoves + 2) {
	        clearInterval(interval);
	      }
	    }, 1000);
	  }
	}

	module.exports = gameUI;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const gameData = __webpack_require__(3);
	var gameEmitter = __webpack_require__(6);

	var gameLogic = {
	  playerPosition: 1,
	  balance: gameData.initialBalance,
	  investment: {
	    air: 0,
	    hotel: 0,
	    land: 0,
	    house: 0,
	    sea: 0,
	    office: 0,
	    rail: 0
	  },
	  netWorth: function() {
	    return this.balance + this.investment.air + this.investment.hotel +
	           this.investment.land + this.investment.house + this.investment.sea +
	           this.investment.office + this.investment.rail;
	  },
	  movePlayer: function(numSpaces) {
	    var nextPosition = (this.playerPosition + numSpaces) % 12;
	    if (nextPosition === 0) {
	      this.playerPosition = 1;
	    } else {
	      this.playerPosition = nextPosition;
	    }
	  },
	  roll: function() {
	    return Math.floor(Math.random() * 5) + 1;
	  },
	  takeTurn: function() {
	    var start = this.playerPosition;
	    var die = this.roll();
	    if (start + die >= 12) {
	      gameEmitter.emit('passedGo');
	      gameEmitter.emit('updateFinancials');
	    }
	    this.movePlayer(die);
	    if (this.playerPosition === 2 || this.playerPosition === 4 || this.playerPosition === 6 || this.playerPosition === 11) {
	      this.communityChest();
	    } else if (this.playerPosition === 3 ||
	               this.playerPosition === 7 ||
	               this.playerPosition === 9 ||
	               this.playerPosition === 12) {
	      this.centralTransportation(this.playerPosition);
	      gameEmitter.emit('investmentInterface', {property: this.playerPosition, context: 'centralTransportation'});
	    } else if (this.playerPosition === 5 ||
	               this.playerPosition === 8 ||
	               this.playerPosition === 10) {
	      this.realEstate(this.playerPosition);
	      gameEmitter.emit('investmentInterface', {property: this.playerPosition, context: 'realEstate'});
	    }
	    if (this.netWorth() >= gameData.winningBalance) {
	      gameEmitter.emit('gameWon');
	    }
	    return this.playerPosition;
	  },
	  communityChest: function() {
	    var random = Math.floor(Math.random() * (gameData.communityChest.length - 1));
	    var card = gameData.communityChest[random];
	    this.balance += card.net;
	    gameEmitter.emit('updateFinancials');
	    gameEmitter.emit('communityChest', {message: card.description});
	  },
	  centralTransportation: function(square) {
	    var randDest = gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)];
	    if (square === 3) { // air
	      this.balance -= 800;
	      gameEmitter.emit(
	        'centralTransportation',
	        {
	          message: `You bought an air ticket to ${randDest}.  It cost $800`
	        }
	      );
	    } else if (square === 7) {
	      this.balance -= 50;
	      gameEmitter.emit(
	        'centralTransportation',
	        {
	          message: `You bought an land ticket to ${randDest}.  It cost $50`
	        }
	      );
	    } else if (square === 9) {
	      this.balance -= 400;
	      gameEmitter.emit(
	        'centralTransportation',
	        {
	          message: `You bought an sea ticket to ${randDest}.  It cost $400`
	        }
	      );
	    } else if (square === 12) {
	      this.balance -= 100;
	      gameEmitter.emit(
	        'centralTransportation',
	        {
	          message: `You bought an rail ticket to ${randDest}.  It cost $100`
	        }
	      );
	    }
	    gameEmitter.emit('updateFinancials');
	  },
	  realEstate: function(square) {
	    var randDest = gameData.destinations[Math.floor(Math.random() * gameData.destinations.length)];
	    if (square === 5) {
	      if (this.checkOwned(square)) {
	        gameEmitter.emit('realEstate', {message: `You stayed at your hotel in ${randDest}.  It was nice!`})
	      } else {
	        this.balance -= 100;
	        gameEmitter.emit(
	          'realEstate',
	          {
	            message: `You stayed at a hotel in ${randDest}.  It cost $100.`
	          }
	        );
	        gameEmitter.emit('updateFinancials');
	      }
	    } else if (square === 8) {
	      if (this.checkOwned(square)) {
	        gameEmitter.emit('realEstate', {message: `You stayed at your house in ${randDest}.  It was nice!`})
	      } else {
	        this.balance -= 20;
	        gameEmitter.emit(
	          'realEstate',
	          {
	            message: `You stayed in a house in ${randDest}.  It cost $20`
	          }
	        );
	        gameEmitter.emit('updateFinancials');
	      }
	    } else if (square === 10) {
	      if (this.checkOwned(square)) {
	        gameEmitter.emit('realEstate', {message: `You visted at your office in ${randDest}.  It was nice!`})
	      } else {
	        gameEmitter.emit(
	          'realEstate',
	          {
	            message: `You visited an office in ${randDest}.`
	          }
	        );
	      }
	    }
	  },
	  invest: function(asset, amount) {
	    if (this.balance < amount) {
	      return {error: "You do not have sufficient funds."}
	    } else {
	      this.balance -= amount;
	      this.investment[asset] += parseInt(amount);
	      gameEmitter.emit('updateFinancials');
	    }
	  },
	  payDividends: function() {
	    var investments = Object.keys(this.investment);
	    investments.forEach(asset => {
	      this.balance += this.investment[asset] * (gameData.interestRate[asset]);
	    });
	    gameEmitter.emit('updateFinancials');
	  },
	  checkOwned: function(square) {
	    if (square === 5) {
	      if (this.investment.hotel >= gameData.values.hotel) {
	        return true;
	      } else {
	        return false;
	      }
	    } else if (square === 8 ) {
	      if (this.investment.house >= gameData.values.house) {
	        return true;
	      } else {
	        return false;
	      }
	    } else if (square === 10) {
	      if (this.investment.office >= gameData.values.house) {
	        return true;
	      } else {
	        return false;
	      }
	    } else {
	      return false;
	    }
	  }
	}

	module.exports = gameLogic;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(7).EventEmitter;
	var gameEmitter = new EventEmitter();

	module.exports = gameEmitter;


/***/ },
/* 7 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];

	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ]);