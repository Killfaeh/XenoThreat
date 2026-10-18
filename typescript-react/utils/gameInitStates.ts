/////////////////////////////////////
// État initial du jeu Xeno Threat //
/////////////////////////////////////

import type { GameState, GraphicsState, State, GameMap } from './types';
import { initialStates, customFunctionMap } from './utils';
import { map } from './gameData';

//// Définition de l'état initial du jeu spécifique à Xeno Threat ////

export const initialStage: GameMap = map[map.length-1];

// Etat initial du jeu
export const INITIAL_GAME_STATE:GameState = {
	started: false,
	prgmCursor: 'displayStartMenu',
	soundToPlay: '',
	textAnimation: false,
	waitInput: false,
	input: -1,
	alienHP: 0,
	player: {
		oldTileId: initialStage.slot1.length,
		tileId: initialStage.slot1.length,
		sectionId: 6,
		currentStage: initialStage,
		orientation: 1,
		keys: 0,
		hp: 99,
		bullets: 30,
	}
};

// Envoie vers le mapping des états initiaux du moteur
initialStates.set('INITIAL_GAME_STATE', INITIAL_GAME_STATE);

// Etat initial de l'interface graphique
export const INITIAL_GRAPHICS_STATE:GraphicsState = {
	corridor: 0.0,
	wall: 0.0,
	door: 0.0,
	exit: 0.0,
	leftCorridor: 0.0,
	rightCorridor: 0.0,
	leftWall: 0.0,
	rightWall: 0.0,
	corridorCanvas: 0.0,
	alien: 0.0,
	bullets: 0.0,
	heal: 0.0,
	key: 0.0,
	exe: 0.0,
	north: 0.0,
	east: 0.0,
	south: 0.0,
	west: 0.0,
	map: 0.0,
	position: 0.0,
	posX: 140.009,
	posY: 135,
	end: 0.0,
	logo: 0.0,
};

// Envoie vers le mapping des états initiaux du moteur
initialStates.set('INITIAL_GRAPHICS_STATE', INITIAL_GRAPHICS_STATE);

// Etat intial du texte affiché
export const INITIAL_TEXT_STATE: string[] = [];

// Envoie vers le mapping des états initiaux du moteur
initialStates.set('INITIAL_TEXT_STATE', INITIAL_TEXT_STATE);

// Etat initial complet
export const INITIAL_STATE:State = {
	game: INITIAL_GAME_STATE,
	graphics: INITIAL_GRAPHICS_STATE,
	text: INITIAL_TEXT_STATE,
};

// Envoie vers le mapping des états initiaux du moteur
initialStates.set('INITIAL_STATE', INITIAL_STATE);

//// Définition des fonctions de reset de l'écran de jeu spécifiques à Xeno Threat ////

function clearGraphicsScreen(): GraphicsState {
	const newState: GraphicsState = {...INITIAL_GRAPHICS_STATE};
	return newState;
}

customFunctionMap.set('clearGraphicsScreen', clearGraphicsScreen);

function clearTextScreen(): string[] {
	return [];
}

customFunctionMap.set('clearTextScreen', clearTextScreen);
