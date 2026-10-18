/////////////////////////////////////////////
// Logique de jeu spécifique à Xeno Threat //
/////////////////////////////////////////////

//// Initialisation du jeu ////

import type { GameState, State, AllSaveStates, Tile } from './types'; // Chargement des types
import { subPrgm, initNewState } from './utils'; // Chargement du moteur généraliste
import { sounds } from './soundManager'; // Chargement du gestionnaire de sons

// Définition des données spécifiques du jeu
import { INITIAL_GAME_STATE } from './gameInitStates';
import { displayMessageScreen, displaySaveStates, initMap, getTileData, setTileData, emptyTile, displayBackground, displayTile, attackAlien } from './gameFunctions';

//// Pile de sous programmes ////

function displayStartScreen(): State {
	sounds.stopAll();
	sounds.loadAll();
	const newState: State = initNewState(INITIAL_GAME_STATE);
	newState.game.started = true;
	newState.graphics.logo = 1.0;
	return newState;
}

function displayStartMenu(gameState: GameState): State {
	sounds.play('open-menu');
	return displayMessageScreen(gameState, 'MAIN MENU\n0:NEW GAME\n1:LOAD GAME\nWHAT TO DO@', 'selectStartMenu');
}

function selectStartMenu(gameState: GameState): State {
	
	const newState: State = initNewState(gameState);
	
	if (newState.game.input === 0) {
		sounds.play('key-stroke');
		return displayMessageScreen(gameState, 'COMMANDS\n8:GO AHEAD\n7:TURN LEFT\n9:TURN RIGHT', 'displayNewGame1');
	} else if (newState.game.input === 1) {
		sounds.play('open-menu');
		return displayMessageScreen(gameState, displaySaveStates(), 'displayLoadPrompt');
	} else {
		return displayStartMenu(gameState);
	}
	
	return newState;
}

function displayNewGame1(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, '5:VIEW MAP\n2:VIEW STATS\n1:LOAD GAME\n3:SAVE GAME', 'displayNewGame2');
}

function displayNewGame2(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, '6:VIEW CMDS', 'displayNewGame3');
}

function displayNewGame3(gameState: GameState): State {
	sounds.stop('space-mood');
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, '...', 'displayNewGame4');
}

function displayNewGame4(gameState: GameState): State {
	sounds.play('red_alert');
	sounds.play('ship-mood-2', true);
	return displayMessageScreen(gameState, 'RED ALERT\nRED ALERT', 'displayNewGame5');
}

function displayNewGame5(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'HOSTILE\nALIENS HAVE\nINVADED\nTHE DEDALUS', 'displayNewGame6');
}

function displayNewGame6(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'YOU MUST\nEVACUATE\nTHE SHIP', 'displayNewGame7');
}

function displayNewGame7(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'REPEAT', 'displayNewGame8');
}

function displayNewGame8(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'YOU MUST\nEVACUATE\nTHE SHIP', 'startGame');
}

function displayLoadPrompt(gameState: GameState): State {
	return displayMessageScreen(gameState, 'CHOOSE SLOT\nTO LOAD@', 'startGame');
}

function displaySavePrompt(gameState: GameState): State {
	return displayMessageScreen(gameState, 'CHOOSE SLOT\nTO SAVE@', 'execSave');
}

function execSave(gameState: GameState): State {
	let newState: State = initNewState(gameState);
	
	if (newState.game.input > 0 && newState.game.input < 9) {
		sounds.play('save');
		const saved: string | null = localStorage.getItem('xeno-threat');
		const savedState: AllSaveStates = saved ? JSON.parse(saved) : { '1': null, '2': null, '3': null, '4': null, '5': null, '6': null, '7': null, '8': null, '9': null };
		const slot = newState.game.input.toString() as keyof AllSaveStates;
		savedState[slot] = newState.game.player;
		localStorage.setItem('xeno-threat', JSON.stringify(savedState))
	}
	
	newState.game.prgmCursor = 'displayActionPrompt';
	newState.graphics = displayBackground(newState.game);
	
	return newState;
}

function startGame(gameState: GameState): State {

	sounds.stop('space-mood');
	sounds.play('load');
	sounds.play('ship-mood-2', true);

	let newState: State = initNewState(gameState);
	
	newState.game.player = {...INITIAL_GAME_STATE.player};
	newState.game.prgmCursor = 'displayActionPrompt';
	
	if (newState.game.input > 0 && newState.game.input < 9) {
		
		const saved: string | null = localStorage.getItem('xeno-threat');
		const savedState: AllSaveStates = saved ? JSON.parse(saved) : { '1': null, '2': null, '3': null, '4': null, '5': null, '6': null, '7': null, '8': null, '9': null };
		const slot = newState.game.input.toString() as keyof AllSaveStates;
		
		if (savedState[slot]) {
			newState.game.player = {...savedState[slot]};
		}
	}
	
	newState.game.player.currentStage = initMap(newState.game.player);

	newState = displayTile(newState);
	
	return newState;
}

function displayCurrentTile(gameState: GameState): State {
	sounds.play('key-stroke');
	let newState: State = initNewState(gameState);
	newState = displayTile(newState);
	return newState;
}

function displaySettingOnly(gameState: GameState): State {
	//sounds.play('key-stroke');
	const newState: State = initNewState(gameState);
	newState.game.prgmCursor = 'displayActionPrompt';
	newState.game.soundToPlay = 'key-stroke';
	newState.graphics = displayBackground(newState.game);
	return newState;
}

function displayActionPrompt(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'WHAT TO DO@', 'execAction');
}

// Sous programme d'exécution des commandes du joueur
function execAction(gameState: GameState): State {
	let newState: State = initNewState(gameState);
	newState.game.prgmCursor = 'displayActionPrompt';
	
	// Modifier les données du jeu et changer action suivante en fontion de la commande
	
	// Déplacements
	if (newState.game.input < 1 || (newState.game.input > 6 && newState.game.input < 10)) {
	
		// Effectuer le déplacement
		const tileData: Tile = getTileData(newState.game.player);
		
		// Tourner à gauche
		if (newState.game.input === 7) {
			newState.game.player.orientation--;
		}
		
		// Tourner à droite
		if (newState.game.input === 9) {
			newState.game.player.orientation++;
		}
		
		// Corriger l'orientation si nécessaire
		if (newState.game.player.orientation <= 0) {
			newState.game.player.orientation = 4;
		}
		
		if (newState.game.player.orientation > 4) {
			newState.game.player.orientation = 1;
		}
		
		// Avancer
		if (newState.game.input === 8) {
			
			// Sortir
			if (tileData.item === 4 && newState.game.player.orientation === 1) {
				sounds.stop('ship-mood-2');
				sounds.play('door');
				sounds.play('space-mood', true);
				return displayMessageScreen(newState.game, 'YOU ESCAPED\nFROM THE\nDEDALUS', 'escapeFromStarship1');
			}
			
			// Récupération de l'id de la tuile suivante en fonction de l'orientation
			let nextId: number = tileData.top;
		
			if (newState.game.player.orientation === 2) {
				nextId = tileData.right;
			} else if (newState.game.player.orientation === 3) {
				nextId = tileData.bottom;
			} else if (newState.game.player.orientation === 4) {
				nextId = tileData.left;
			}
			
			// Si l'id existe...
			if (nextId > 0) {
			
				// On vérifie des clés sont nécessaires pour atteindre la tuile suivante
				let keysNeeded: number = 0;
				
				if (newState.game.player.orientation === 1) {
					keysNeeded = tileData.locked;
				}
				
				// Si le joueur a assez de clés, on le déplace
				if (newState.game.player.keys >= keysNeeded) {
				
					// Les clé ne sont nécessaire qu'en se déplaçant vers le nord
					if (newState.game.player.orientation === 1) {
						
						// On retire les clés nécessaires de l'inventaire du joueur
						newState.game.player.keys = newState.game.player.keys-keysNeeded;
						emptyTile(newState.game.player, tileData);
						
						// Si nécessaire on passe à la section suivante
						if (nextId > newState.game.player.tileId) {
							sounds.play('door');
							newState.game.player.sectionId--;
							newState.game.player.currentStage = initMap(newState.game.player);
						}
					}
					
					// Cas du retour à la section précédente
					if (newState.game.player.orientation === 3) {
						if (nextId < newState.game.player.tileId) {
							sounds.play('door');
							newState.game.player.sectionId++;
							newState.game.player.currentStage = initMap(newState.game.player);
						}
					}
					
					newState.game.player.oldTileId = newState.game.player.tileId;
					newState.game.player.tileId = nextId;
					console.log("Player position : " + newState.game.player.tileId);
				}
			}
		}

		sounds.play('key-stroke');
		newState = displayTile(newState);
	
	// Affichage de la map
	} else if (newState.game.input === 5) {
	
		sounds.play('open-menu');
		const tileData: Tile = getTileData(newState.game.player);
		newState.graphics.map = 1.0;
		newState.graphics.position = 1.0;
		newState.graphics.exe = 1.0;
		newState.game.waitInput = false;
		newState.graphics.posX = 136.009 + tileData.x*4;
		newState.graphics.posY = 135 + 188 - tileData.y*4;
		newState.game.prgmCursor = 'displayCurrentTile';
	
	// Affichage des statistiques du joueur
	} else if (newState.game.input === 2) {
		sounds.play('open-menu');
		newState = displayMessageScreen(newState.game, `STATS\nHEALTH: ${newState.game.player.hp}`, 'displayPlayerStat2');
	
	// Affichage de l'écran de chargement d'une partie
	} else if (newState.game.input === 1) {
		sounds.play('open-menu');
		newState = displayMessageScreen(newState.game, displaySaveStates(), 'displayLoadPrompt');
	
	// Affichage de l'écran de sauvegarde de la partie
	} else if (newState.game.input === 3) {
		sounds.play('open-menu');
		newState = displayMessageScreen(newState.game, displaySaveStates(), 'displaySavePrompt');
	
	// Afficher les commandes du jeu
	} else if (newState.game.input === 6) {
		sounds.play('open-menu');
		return displayMessageScreen(gameState, 'COMMANDS\n8:GO AHEAD\n7:TURN LEFT\n9:TURN RIGHT', 'displayHelp');
	
	// Affichage du décor de la case actuelle
	} else {
		sounds.play('key-stroke');
		newState.graphics = displayBackground(newState.game);
	}
	
	return newState;
}

function displayHelp(gameState: GameState): State {
	return displayMessageScreen(gameState, '5:VIEW MAP\n2:VIEW STATS\n1:LOAD GAME\n3:SAVE GAME', 'displayHelp2');
}

function displayHelp2(gameState: GameState): State {
	return displayMessageScreen(gameState, '6:VIEW CMDS', 'displaySettingOnly');
}

function displayPlayerStat2(gameState: GameState): State {
	return displayMessageScreen(gameState, `BULLETS: ${gameState.player.bullets}`, 'displayPlayerStat3');
}

function displayPlayerStat3(gameState: GameState): State {
	return displayMessageScreen(gameState, `KEYS: ${gameState.player.keys}`, 'displayCurrentTile');
}

// Sous programmes des combats

function startFight(gameState: GameState): State {
	return displayMessageScreen(gameState, 'EVIL ALIEN\nEMERGES\nWHAT TO DO?', 'displayFightMenu');
}

function displayFightMenu(gameState: GameState): State {
	
	sounds.play('open-menu');
	
	let message = '1:HAND ATK\n';
	
	if (gameState.player.bullets > 0) {
		message = message + '2:GUN ATK\n';
	}
	
	message = message + '3:ESCAPE\n';
	message = message + 'WHAT TO DO@';
	
	return displayMessageScreen(gameState, message, 'execFightAction');
}

function execFightAction(gameState: GameState): State {
	const newState: State = initNewState(gameState);
	newState.game.prgmCursor = 'displayFightMenu';
	
	if (newState.game.input > 0 && newState.game.input < 4) {
	
		newState.game.prgmCursor = 'alienAction';
		
		if (newState.game.input === 1) {
			return attackAlien(newState.game, 5);
		} else if (newState.game.input === 2) {
			return attackAlien(newState.game, 10);
		} else if (newState.game.input === 3) {
			
			const randNum: number = Math.random();
			
			sounds.play('escape');
			
			if (randNum > 0.5) {
				const tileData: Tile = getTileData(newState.game.player);
				tileData.item = newState.game.alienHP + 4;
				setTileData(newState.game.player, tileData);
				newState.game.player.tileId = newState.game.player.oldTileId;
				console.log("Player position : " + newState.game.player.tileId);
				return displayMessageScreen(newState.game, 'YOUR ESCAPE\nSUCCEDED', 'displayCurrentTile');
			} else {
				return displayMessageScreen(newState.game, 'YOUR ESCAPE\nFAILED', 'alienAction');
			}
		}
	}
	
	return newState;
}

function alienAction(gameState: GameState): State {
	const newState: State = initNewState(gameState);
	newState.game.prgmCursor = 'displayFightMenu';
	
	let nextStep: string = 'displayFightMenu';
	const randNum: number = Math.random();
	let damage: number = 0;
	
	if (randNum > 0.5) {
		sounds.play('slash');
		damage = Math.floor(10*Math.random())+10;
		newState.game.player.hp = newState.game.player.hp - damage;
		
		if (newState.game.player.hp <= 0) {
			nextStep = 'gameOver';
		}
	} else {
		sounds.play('miss');
	}
	
	return displayMessageScreen(newState.game, `ALIEN ATTACK\nHITS : ${damage}`, nextStep);
}

function alienDead(gameState: GameState): State {
	sounds.play('dead-alien');
	return displayMessageScreen(gameState, ' \n \n ALIEN DEAD', 'displaySettingOnly');
}

function gameOver(gameState: GameState): State {
	sounds.play('game-over');
	return displayMessageScreen(gameState, ' \n \n GAME OVER', 'displayStartScreen');
}
	
// Sortir du vaisseau

function escapeFromStarship1(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'YOU LAUNCH\nINTO THE\nSTARS', 'escapeFromStarship2');
}

function escapeFromStarship2(gameState: GameState): State {
	sounds.play('key-stroke');
	return displayMessageScreen(gameState, 'LEAVING\nTHE HORROR\nBEHIND', 'escapeFromStarship3');
}

function escapeFromStarship3(gameState: GameState): State {
	sounds.play('key-stroke');
	sounds.play('jet');
	const newState: State = initNewState(gameState);
	newState.graphics.end = 1.0;
	newState.game.prgmCursor = 'displayStartScreen';
	return newState;
}

// Mapping des sous programmes

subPrgm.set('displayStartScreen', displayStartScreen);
subPrgm.set('displayStartMenu', displayStartMenu);
subPrgm.set('selectStartMenu', selectStartMenu);
subPrgm.set('displayNewGame1', displayNewGame1);
subPrgm.set('displayNewGame2', displayNewGame2);
subPrgm.set('displayNewGame3', displayNewGame3);
subPrgm.set('displayNewGame4', displayNewGame4);
subPrgm.set('displayNewGame5', displayNewGame5);
subPrgm.set('displayNewGame6', displayNewGame6);
subPrgm.set('displayNewGame7', displayNewGame7);
subPrgm.set('displayNewGame8', displayNewGame8);
subPrgm.set('displayLoadPrompt', displayLoadPrompt);
subPrgm.set('displaySavePrompt', displaySavePrompt);
subPrgm.set('execSave', execSave);
subPrgm.set('startGame', startGame);
subPrgm.set('displayCurrentTile', displayCurrentTile);
subPrgm.set('displaySettingOnly', displaySettingOnly);
subPrgm.set('displayActionPrompt', displayActionPrompt);
subPrgm.set('execAction', execAction);
subPrgm.set('displayHelp', displayHelp);
subPrgm.set('displayHelp2', displayHelp2);
subPrgm.set('displayPlayerStat2', displayPlayerStat2);
subPrgm.set('displayPlayerStat3', displayPlayerStat3);
subPrgm.set('startFight', startFight);
subPrgm.set('displayFightMenu', displayFightMenu);
subPrgm.set('execFightAction', execFightAction);
subPrgm.set('alienAction', alienAction);
subPrgm.set('alienDead', alienDead);
subPrgm.set('gameOver', gameOver);
subPrgm.set('escapeFromStarship1', escapeFromStarship1);
subPrgm.set('escapeFromStarship2', escapeFromStarship2);
subPrgm.set('escapeFromStarship3', escapeFromStarship3);

export const gameLoaded = true;