//////////////////////////////////
// Fonctions du jeu Xeno Threat //
//////////////////////////////////

//// Fonctions utiles spécifiques à Xeno Threat ////

// Factorisation du paramétrage et du lancement d'une animation texte

function displayMessageScreen(gameState, message, nextCursor)
{
	var newState = initNewState(gameState);
	var chars = stringToImages(message.replaceAll('@', '?'));
	newState.game.prgmCursor = nextCursor;
	
	if (/\@$/.test(message))
		newState.game.waitInput = true;
	else
		newState.game.waitInput = false;
	
	animeText(newState.game, chars);
	return newState;
}

// Fonction d'affichage des slots de sauvegarde

function displaySaveStates()
{
	var saved = localStorage.getItem('xeno-threat');
	var savedState = saved ? JSON.parse(saved) : { '1': null, '2': null, '3': null, '4': null, '5': null, '6': null, '7': null, '8': null, '9': null };
	
	var message = `1:[${savedState[1] ? 'X' : ' '}] 2:[${savedState[2] ? 'X' : ' '}]\n`
							+ `3:[${savedState[3] ? 'X' : ' '}] 4:[${savedState[4] ? 'X' : ' '}]\n`
							+ `5:[${savedState[5] ? 'X' : ' '}] 6:[${savedState[6] ? 'X' : ' '}]\n`
							+ `7:[${savedState[7] ? 'X' : ' '}] 8:[${savedState[8] ? 'X' : ' '}]`;
	
	return message;
}

// Initialisation de la map

function initMap(player)
{
	var currentStage =
	{
		slot1: [].concat(map[player.sectionId-1].slot1),
		slot2: [].concat(map[player.sectionId-1].slot2),
	};
	
	player.currentStage = currentStage;
	var playerTile = player.tileId;
	
	// Initialiser la position du monstre...
	
	var stageSize = currentStage.slot1.length;
	var tryAgain = true;
	
	while (tryAgain === true)
	{
		var randomTile = Math.floor((stageSize-3)*Math.random())+2;
		player.tileId = randomTile;
		var tileData = getTileData(player);
		
		if (tileData.item === 0 && tileData.locked === 0)
		{
			tileData.item = 94;
			setTileData(player, tileData);
			tryAgain = false;
			// console.log(currentStage.slot2);
			// console.log('Alien position : ' + randomTile);
		}
	}
	
	player.tileId = playerTile;
	
	return currentStage;
}

// Récupérer les données d'une tuile

function getTileData(player)
{
	var tileId = player.tileId;
	var currentStage = player.currentStage;
	var tileData1 = currentStage.slot1[tileId-1];
	var tileData2 = currentStage.slot2[tileId-1];
	var spreadTileData1 = spreadOut(tileData1, tileMapping1);
	var spreadTileData2 = spreadOut(tileData2, tileMapping2);
	
	var tileData = {};
	
	for (var key in spreadTileData1)
	{
		if (spreadTileData1.hasOwnProperty(key))
			tileData[key] = spreadTileData1[key];
	}
	
	for (var key in spreadTileData2)
	{
		if (spreadTileData2.hasOwnProperty(key))
			tileData[key] = spreadTileData2[key];
	}
	
	tileData.left -= 1;
	tileData.right -= 1;
	tileData.bottom -= 1;
	tileData.top -= 1;
	return tileData;
}

// Mise à jour des données d'une tuile

function setTileData(player, tileData)
{
	var tileId = player.tileId;
	var currentStage = player.currentStage;
	var tileData1 = 100000000*tileData.x + 1000000*tileData.y + 1000*(tileData.left+1) + (tileData.right+1);
	var tileData2 = 10000000*(tileData.bottom+1) + 10000*(tileData.top+1) + 1000*tileData.locked + 100*tileData.section + tileData.item;
	currentStage.slot1[tileId-1] = tileData1;
	currentStage.slot2[tileId-1] = tileData2;
}

// Réinitialisation des données d'une tuile

function emptyTile(player, tileData)
{
	tileData.locked = 0;
	tileData.item = 0;
	setTileData(player, tileData);
}

// Affichage du décor de la tuile courante

function displayBackground(gameState)
{
	var newState = JSON.parse(JSON.stringify(INITIAL_GRAPHICS_STATE));
	newState.corridorCanvas = 1.0;
	newState.exe = 1.0;
	
	var player = gameState.player;
	var tileData = getTileData(player);
	var surroundingTiles = [tileData.top, tileData.right, tileData.bottom, tileData.left];
	
	var frontTileId = surroundingTiles[player.orientation-1];
	var rightTileId = surroundingTiles[(player.orientation < 4) ? player.orientation : 0];
	var bottomTileId = surroundingTiles[(player.orientation+1 < 4) ? player.orientation+1 : (player.orientation+1-4)];
	var leftTileId = surroundingTiles[(player.orientation+2 < 4) ? player.orientation+2 : (player.orientation+2-4)];
	
	if (frontTileId > 0)
		newState.corridor = 1.0;
	else
		newState.wall = 1.0;
	
	if (rightTileId > 0)
		newState.rightCorridor = 1.0;
	else
		newState.rightWall = 1.0;
	
	if (leftTileId > 0)
		newState.leftCorridor = 1.0;
	else
		newState.leftWall = 1.0;
	
	if (player.orientation === 1 && tileData.locked > 0)
	{
		newState.door = 1.0;
		newState.corridor = 0.0;
		newState.wall = 0.0;
	}
	
	if (player.orientation === 1)
		newState.north = 1.0;
	else if (player.orientation === 2)
		newState.east = 1.0;
	else if (player.orientation === 3)
		newState.south = 1.0;
	else if (player.orientation === 4)
		newState.west = 1.0;
	
	return newState;
}

// Affichage d'un item

function displayItem(gameState, graphicsState)
{
	var player = gameState.player;
	var tileData = getTileData(player);
	
	if (tileData.item === 1)
		graphicsState.key = 1.0;
	else if (tileData.item === 2)
		graphicsState.bullets = 1.0;
	else if (tileData.item === 3)
		graphicsState.heal = 1.0;
	else if (tileData.item === 4)
		graphicsState.exit = 1.0;
	
	return graphicsState;
}

// Affichage compvar de la tuile

function displayTile(state) 
{
	
	// console.log(state.game.player.currentStage.slot2);
	
	state.game.prgmCursor = 'displayActionPrompt';
	
	// Checker si un item est affiché ou non...
	var tileData = getTileData(state.game.player);
	
	// Checker si un alien est là ou non...
	if (tileData.item > 4)
	{
		sounds.play('alien');
		state.graphics.alien = 1.0;
		state.graphics.exe = 1.0;
		state.game.alienHP = tileData.item-4;
		state.game.prgmCursor = 'startFight';
	}
	else
	{
		state.game.soundToPlay = 'key-stroke';
		
		// Afficher la case
		state.graphics = displayBackground(state.game);
		
		// Afficher l'item s'il y en a un
		state.graphics = displayItem(state.game, state.graphics);
		
		// Ramasser les items s'il y en a
		if (tileData.item > 0 && tileData.item < 4)
		{
			// 1 : Une clé
			if (tileData.item === 1)
			{
				state.game.player.keys++;
				emptyTile(state.game.player, tileData);
				state.game.soundToPlay = 'key';
			}
				
			// 2 : Un lot de 10 munitions
			else if (tileData.item === 2)
			{
				state.game.player.bullets = state.game.player.bullets + 10;
				
				if (state.game.player.bullets > 99)
					state.game.player.bullets = 99;
				
				emptyTile(state.game.player, tileData);
				
				state.game.soundToPlay = 'bullets';
			}
			
			// 3 : Une trousse de secours rapportant maximum 30 points de vie
			else if (tileData.item === 3 && state.game.player.hp < 99)
			{
				state.game.player.hp = state.game.player.hp + 30;
				
				if (state.game.player.hp > 99)
					state.game.player.hp = 99;
				
				emptyTile(state.game.player, tileData);
				
				state.game.soundToPlay = 'health';
			}
			
			state.game.prgmCursor = 'displaySettingOnly';
		}
	}
	
	return state;
}

// Infliger des dégâts à l'alien

function attackAlien(gameState, damageScale)
{
	var nextStep = 'alienAction';
	var tileData = getTileData(gameState.player);
	var randNum = Math.random();
	
	if (randNum > 0.25)
	{
		var damage = Math.floor(damageScale*Math.random())+damageScale;
		gameState.alienHP = gameState.alienHP - damage;
		
		if (gameState.alienHP <= 0)
		{
			tileData.item = 0;
			setTileData(gameState.player, tileData);
			nextStep = 'alienDead';
		}
		
		if (damageScale > 5)
			sounds.play('gun');
		else
			sounds.play('punch');
		
		return displayMessageScreen(gameState, "YOUR ATTACK\nSUCCEDED\nHITS : " + damage, nextStep);
	}
	else
	{
		sounds.play('miss');
		return displayMessageScreen(gameState, 'YOUR ATTACK\nFAILED', 'alienAction');
	}
}