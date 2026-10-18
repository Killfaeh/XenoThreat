/////////////////////////////////////////////
// Logique de jeu spécifique à Xeno Threat //
/////////////////////////////////////////////

//// Pile de sous programmes ////

function displayStartScreen()
{
	sounds.stopAll();
	sounds.loadAll();
	var newState = initNewState(INITIAL_GAME_STATE);
	newState.game.started = true;
	newState.graphics.logo = 1.0;
	return newState;
}

function displayStartMenu(gameState)
{
	sounds.play('open-menu');
	return displayMessageScreen(gameState, 'MAIN MENU\n0:NEW GAME\n1:LOAD GAME\nWHAT TO DO@', 'selectStartMenu');
}

function selectStartMenu(gameState)
{
	var newState = initNewState(gameState);
	
	if (newState.game.input === 0)
	{
		sounds.play('key-stroke');
		return displayMessageScreen(gameState, 'COMMANDS\n8:GO AHEAD\n7:TURN LEFT\n9:TURN RIGHT', 'displayNewGame1');
	}
	else if (newState.game.input === 1)
	{
		sounds.play('open-menu');
		return displayMessageScreen(gameState, displaySaveStates(), 'displayLoadPrompt');
	}
	else
		return displayStartMenu(gameState);
	
	return newState;
}

function displayNewGame1(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, '5:VIEW MAP\n2:VIEW STATS\n1:LOAD GAME\n3:SAVE GAME', 'displayNewGame2');
}

function displayNewGame2(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, '6:VIEW CMDS', 'displayNewGame3');
}

function displayNewGame3(gameState)
{
	sounds.stop('space-mood');
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, '...', 'displayNewGame4');
}

function displayNewGame4(gameState)
{
	sounds.play('red_alert');
	sounds.play('ship-mood-2');
	return displayMessageScreen(gameState, 'RED ALERT\nRED ALERT', 'displayNewGame5');
}

function displayNewGame5(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'HOSTILE\nALIENS HAVE\nINVADED\nTHE DEDALUS', 'displayNewGame6');
}

function displayNewGame6(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'YOU MUST\nEVACUATE\nTHE SHIP', 'displayNewGame7');
}

function displayNewGame7(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'REPEAT', 'displayNewGame8');
}

function displayNewGame8(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'YOU MUST\nEVACUATE\nTHE SHIP', 'startGame');
}

function displayLoadPrompt(gameState) { return displayMessageScreen(gameState, 'CHOOSE SLOT\nTO LOAD@', 'startGame'); }
function displaySavePrompt(gameState) { return displayMessageScreen(gameState, 'CHOOSE SLOT\nTO SAVE@', 'execSave'); }

function execSave(gameState)
{
	var newState = initNewState(gameState);
	
	if (newState.game.input > 0 && newState.game.input < 9)
	{
		sounds.play('save');
		var saved = localStorage.getItem('xeno-threat');
		var savedState = saved ? JSON.parse(saved) : { '1': null, '2': null, '3': null, '4': null, '5': null, '6': null, '7': null, '8': null, '9': null };
		savedState[newState.game.input] = newState.game.player;
		localStorage.setItem('xeno-threat', JSON.stringify(savedState))
	}
	
	newState.game.prgmCursor = 'displayActionPrompt';
	newState.graphics = displayBackground(newState.game);
	
	return newState;
}

function startGame(gameState)
{
	sounds.stop('space-mood');
	sounds.play('load');
	sounds.play('ship-mood-2');
	
	var newState = initNewState(gameState);
	
	newState.game.player = JSON.parse(JSON.stringify(INITIAL_GAME_STATE.player));
	newState.game.prgmCursor = 'displayActionPrompt';
	
	if (newState.game.input > 0 && newState.game.input < 9)
	{
		var saved = localStorage.getItem('xeno-threat');
		var savedState = saved ? JSON.parse(saved) : { '1': null, '2': null, '3': null, '4': null, '5': null, '6': null, '7': null, '8': null, '9': null };
		
		if (savedState[newState.game.input])
			newState.game.player = JSON.parse(JSON.stringify(savedState[newState.game.input]));
	}
	
	newState.game.player.currentStage = initMap(newState.game.player);

	newState = displayTile(newState);
	
	return newState;
}

function displayCurrentTile(gameState)
{
	sounds.play('key-stroke');
	var newState = initNewState(gameState);
	newState = displayTile(newState);
	return newState;
}

function displaySettingOnly(gameState)
{
	var newState = initNewState(gameState);
	newState.game.prgmCursor = 'displayActionPrompt';
	newState.game.soundToPlay = 'key-stroke';
	newState.graphics = displayBackground(newState.game);
	return newState;
}

function displayActionPrompt(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'WHAT TO DO@', 'execAction');
}

// Sous programme d'exécution des commandes du joueur
function execAction(gameState)
{
	var newState = initNewState(gameState);
	newState.game.prgmCursor = 'displayActionPrompt';
	
	// Modifier les données du jeu et changer action suivante en fontion de la commande
	
	// Déplacements
	if (newState.game.input < 1 || (newState.game.input > 6 && newState.game.input < 10))
	{
		// Effectuer le déplacement
		var tileData = getTileData(newState.game.player);
		
		// Tourner à gauche
		if (newState.game.input === 7)
			newState.game.player.orientation--;
		
		// Tourner à droite
		if (newState.game.input === 9)
			newState.game.player.orientation++;
		
		// Corriger l'orientation si nécessaire
		if (newState.game.player.orientation <= 0)
			newState.game.player.orientation = 4;
		
		if (newState.game.player.orientation > 4)
			newState.game.player.orientation = 1;
		
		// Avancer
		if (newState.game.input === 8)
		{
			
			// Sortir
			if (tileData.item === 4 && newState.game.player.orientation === 1)
			{
				sounds.stop('ship-mood-2');
				sounds.play('door');
				sounds.play('space-mood');
				return displayMessageScreen(newState.game, 'YOU ESCAPED\nFROM THE\nDEDALUS', 'escapeFromStarship1');
			}
			
			// Récupération de l'id de la tuile suivante en fonction de l'orientation
			var nextId = tileData.top;
		
			if (newState.game.player.orientation === 2)
				nextId = tileData.right;
			else if (newState.game.player.orientation === 3)
				nextId = tileData.bottom;
			else if (newState.game.player.orientation === 4)
				nextId = tileData.left;
			
			// Si l'id existe...
			if (nextId > 0)
			{
				// On vérifie des clés sont nécessaires pour atteindre la tuile suivante
				var keysNeeded = 0;
				
				if (newState.game.player.orientation === 1)
					keysNeeded = tileData.locked;
				
				// Si le joueur a assez de clés, on le déplace
				if (newState.game.player.keys >= keysNeeded)
				{
					// Les clé ne sont nécessaire qu'en se déplaçant vers le nord
					if (newState.game.player.orientation === 1)
					{
						// On retire les clés nécessaires de l'inventaire du joueur
						newState.game.player.keys = newState.game.player.keys-keysNeeded;
						emptyTile(newState.game.player, tileData);
						
						// Si nécessaire on passe à la section suivante
						if (nextId > newState.game.player.tileId)
						{
							sounds.play('door');
							newState.game.player.sectionId--;
							newState.game.player.currentStage = initMap(newState.game.player);
						}
					}
					
					// Cas du retour à la section précédente
					if (newState.game.player.orientation === 3)
					{
						if (nextId < newState.game.player.tileId)
						{
							sounds.play('door');
							newState.game.player.sectionId++;
							newState.game.player.currentStage = initMap(newState.game.player);
						}
					}
					
					newState.game.player.oldTileId = newState.game.player.tileId;
					newState.game.player.tileId = nextId;
					//console.log("Player position : " + newState.game.player.tileId);
				}
			}
		}

		sounds.play('key-stroke');
		newState = displayTile(newState);
	}
	
	// Affichage de la map
	else if (newState.game.input === 5)
	{
		sounds.play('open-menu');
		var tileData = getTileData(newState.game.player);
		newState.graphics.map = 1.0;
		newState.graphics.position = 1.0;
		newState.graphics.exe = 1.0;
		newState.game.waitInput = false;
		newState.graphics.posX = 136.009 + tileData.x*4;
		newState.graphics.posY = 135 + 188 - tileData.y*4;
		newState.game.prgmCursor = 'displayCurrentTile';
	}
	
	// Affichage des statistiques du joueur
	else if (newState.game.input === 2)
	{
		sounds.play('open-menu');
		newState = displayMessageScreen(newState.game, `STATS\nHEALTH: ${newState.game.player.hp}`, 'displayPlayerStat2');
	}
	
	// Affichage de l'écran de chargement d'une partie
	else if (newState.game.input === 1)
	{
		sounds.play('open-menu');
		newState = displayMessageScreen(newState.game, displaySaveStates(), 'displayLoadPrompt');
	}
	
	// Affichage de l'écran de sauvegarde de la partie
	else if (newState.game.input === 3)
	{
		sounds.play('open-menu');
		newState = displayMessageScreen(newState.game, displaySaveStates(), 'displaySavePrompt');
	}
	
	// Afficher les commandes du jeu
	else if (newState.game.input === 6)
	{
		sounds.play('open-menu');
		return displayMessageScreen(gameState, 'COMMANDS\n8:GO AHEAD\n7:TURN LEFT\n9:TURN RIGHT', 'displayHelp');
	}
	
	// Affichage du décor de la case actuelle
	else
	{
		sounds.play('key-stroke');
		newState.graphics = displayBackground(newState.game);
	}
	
	return newState;
}

function displayHelp(gameState) { return displayMessageScreen(gameState, '5:VIEW MAP\n2:VIEW STATS\n1:LOAD GAME\n3:SAVE GAME', 'displayHelp2'); }
function displayHelp2(gameState) { return displayMessageScreen(gameState, '6:VIEW CMDS', 'displaySettingOnly'); }
function displayPlayerStat2(gameState) { return displayMessageScreen(gameState, `BULLETS: ${gameState.player.bullets}`, 'displayPlayerStat3'); }
function displayPlayerStat3(gameState) { return displayMessageScreen(gameState, `KEYS: ${gameState.player.keys}`, 'displayCurrentTile'); }

// Sous programmes des combats

function startFight(gameState) { return displayMessageScreen(gameState, 'EVIL ALIEN\nEMERGES\nWHAT TO DO?', 'displayFightMenu'); }

function displayFightMenu(gameState)
{
	sounds.play('open-menu');
	
	var message = '1:HAND ATK\n';
	
	if (gameState.player.bullets > 0)
		message = message + '2:GUN ATK\n';
	
	message = message + '3:ESCAPE\n';
	message = message + 'WHAT TO DO@';
	
	return displayMessageScreen(gameState, message, 'execFightAction');
}

function execFightAction(gameState)
{
	var newState = initNewState(gameState);
	newState.game.prgmCursor = 'displayFightMenu';
	
	if (newState.game.input > 0 && newState.game.input < 4)
	{
		newState.game.prgmCursor = 'alienAction';
		
		if (newState.game.input === 1)
			return attackAlien(newState.game, 5);
		else if (newState.game.input === 2)
			return attackAlien(newState.game, 10);
		else if (newState.game.input === 3)
		{
			var randNum = Math.random();
			
			sounds.play('escape');
			
			if (randNum > 0.5)
			{
				var tileData = getTileData(newState.game.player);
				tileData.item = newState.game.alienHP + 4;
				setTileData(newState.game.player, tileData);
				newState.game.player.tileId = newState.game.player.oldTileId;
				//console.log("Player position : " + newState.game.player.tileId);
				return displayMessageScreen(newState.game, 'YOUR ESCAPE\nSUCCEDED', 'displayCurrentTile');
			}
			else
				return displayMessageScreen(newState.game, 'YOUR ESCAPE\nFAILED', 'alienAction');
		}
	}
	
	return newState;
}

function alienAction(gameState)
{
	var newState = initNewState(gameState);
	newState.game.prgmCursor = 'displayFightMenu';
	
	var nextStep = 'displayFightMenu';
	var randNum = Math.random();
	var damage = 0;
	
	if (randNum > 0.5)
	{
		sounds.play('slash');
		damage = Math.floor(10*Math.random())+10;
		newState.game.player.hp = newState.game.player.hp - damage;
		
		if (newState.game.player.hp <= 0)
			nextStep = 'gameOver';
	}
	else
		sounds.play('miss');
	
	return displayMessageScreen(newState.game, `ALIEN ATTACK\nHITS : ${damage}`, nextStep);
}

function alienDead(gameState)
{
	sounds.play('dead-alien');
	return displayMessageScreen(gameState, ' \n \n ALIEN DEAD', 'displaySettingOnly');
}

function gameOver(gameState)
{
	sounds.play('game-over');
	return displayMessageScreen(gameState, ' \n \n GAME OVER', 'displayStartScreen');
}

// Sortir du vaisseau

function escapeFromStarship1(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'YOU LAUNCH\nINTO THE\nSTARS', 'escapeFromStarship2');
}

function escapeFromStarship2(gameState)
{
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'LEAVING\nTHE HORROR\nBEHIND', 'escapeFromStarship3');
}

function escapeFromStarship3(gameState)
{
	sounds.play('key-stroke');
	sounds.play('jet');
	var newState = initNewState(gameState);
	newState.graphics.end = 1.0;
	newState.game.prgmCursor = 'displayStartScreen';
	return newState;
}

// Mapping des sous programmes

subPrgm['displayStartScreen'] = displayStartScreen;
subPrgm['displayStartMenu'] = displayStartMenu;
subPrgm['selectStartMenu'] = selectStartMenu;
subPrgm['displayNewGame1'] = displayNewGame1;
subPrgm['displayNewGame2'] = displayNewGame2;
subPrgm['displayNewGame3'] = displayNewGame3;
subPrgm['displayNewGame4'] = displayNewGame4;
subPrgm['displayNewGame5'] = displayNewGame5;
subPrgm['displayNewGame6'] = displayNewGame6;
subPrgm['displayNewGame7'] = displayNewGame7;
subPrgm['displayNewGame8'] = displayNewGame8;
subPrgm['displayLoadPrompt'] = displayLoadPrompt;
subPrgm['displaySavePrompt'] = displaySavePrompt;
subPrgm['execSave'] = execSave;
subPrgm['startGame'] = startGame;
subPrgm['displayCurrentTile'] = displayCurrentTile;
subPrgm['displaySettingOnly'] = displaySettingOnly;
subPrgm['displayActionPrompt'] = displayActionPrompt;
subPrgm['execAction'] = execAction;
subPrgm['displayHelp'] = displayHelp;
subPrgm['displayHelp2'] = displayHelp2;
subPrgm['displayPlayerStat2'] = displayPlayerStat2;
subPrgm['displayPlayerStat3'] = displayPlayerStat3;
subPrgm['startFight'] = startFight;
subPrgm['displayFightMenu'] = displayFightMenu;
subPrgm['execFightAction'] = execFightAction;
subPrgm['alienAction'] = alienAction;
subPrgm['alienDead'] = alienDead;
subPrgm['gameOver'] = gameOver;
subPrgm['escapeFromStarship1'] = escapeFromStarship1;
subPrgm['escapeFromStarship2'] = escapeFromStarship2;
subPrgm['escapeFromStarship3'] = escapeFromStarship3;
