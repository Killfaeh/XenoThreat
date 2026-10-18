////////////////////////////////
// Moteur de jeu réutilisable //
////////////////////////////////

import type { DataMapping, GameState, GraphicsState, State, GameEventMap } from './types';
import { sounds } from './soundManager'; // Chargement du gestionnaire de sons

export const customFunctionMap = new Map();

//// Divers ////

// Récupère une liste de propriétés à partir d'un nombre entier

export function spreadOut<T>(num: number, mapping: DataMapping): T {
	
	let tmpNum: number = num;
	const totalDigit: number = mapping.reduce((sum, row) => sum + row.digit, 0);
	let digitOffset: number = 0;
	const map = new Map();
	
	mapping.forEach((row) => {
		const rowName: string = row.name;
		const rowDigit: number = row.digit;
		const powNum: number = Math.pow(10, totalDigit-digitOffset-rowDigit);
		const rowValue: number = Math.floor(tmpNum/powNum);
		tmpNum = tmpNum - rowValue*powNum;
		digitOffset += rowDigit;
		
		map.set(rowName, rowValue);
		
		if (digitOffset > totalDigit) {
			digitOffset = totalDigit;
		}
	});
	
	return Object.fromEntries(map);
}


//// Gestion des événements ////

// Mapping des événements disponibles

export const eventMap = new Map();

// Emission d'un signal

export function emitEvent<T extends keyof GameEventMap>(type: T, data: GameEventMap[T]): void {
	const event = new CustomEvent(type, { detail: data });
	window.dispatchEvent(event);
}

// Exécution de l'événement émis

export function execEvent<T extends keyof GameEventMap>(name: string, e: CustomEvent<GameEventMap[T]>): void {
	if (eventMap.has(name)) {
		eventMap.get(name)(e);
	}
}

// Evénements clavier

const keys: Record<string, boolean> = {}; // Mapping de l'état des touches

const handleKey = (e: KeyboardEvent): void => {
	keys[e.code] = (e.type === 'keydown');
	emitEvent('game:keyboard', { keys: {...keys} });
};

window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);
window.addEventListener('game:keyboard', (e) => { execEvent('game:keyboard', e); });

//// Boucle de jeu ////

// Mapping des sous programmes
export const subPrgm = new Map();

// Mapping des états intiaux
export const initialStates = new Map();
initialStates.set('INITIAL_GAME_STATE', {});
initialStates.set('INITIAL_GRAPHICS_STATE',{});
initialStates.set('INITIAL_TEXT_STATE',[]);
initialStates.set('INITIAL_STATE', {});

// Initialisation d'un nouvel état du jeu
export function initNewState(gameState: GameState): State {
	
	const newGameState: GameState = {...gameState};
	const newGraphicsState: GraphicsState = customFunctionMap.get('clearGraphicsScreen')();
	const newTextState: string[] = customFunctionMap.get('clearTextScreen')();
	
	const newState: State = {
		game: newGameState,
		graphics: newGraphicsState,
		text: newTextState,
	};
	
	return newState;
}

// Réinitialisation du jeu
export function reset(): State {
	
	const oldGameState: GameState = {...initialStates.get('INITIAL_STATE')};
	
	if (subPrgm.has('displayStartScreen')) {
		return subPrgm.get('displayStartScreen')(oldGameState);
	} else {
		return customFunctionMap.get('clearGraphicsScreen')();
	}
}

// Exécution du prochain tour de jeu
export function execGameLoop(gameState: GameState): State {
	
	const oldGameState: GameState = {...gameState};
	oldGameState.textAnimation = false;
	oldGameState.waitInput = false;
	
	if (subPrgm.has(oldGameState.prgmCursor)) {
		sounds.play(oldGameState.soundToPlay);
		const newState = subPrgm.get(oldGameState.prgmCursor)(oldGameState);
		newState.game.input = -1;
		return newState;
	}
	else
		return customFunctionMap.get('clearGraphicsScreen')();
}

//// Gestion de l'écran texte ////

const charMap = new Map();

charMap.set('A', 'A.png');
charMap.set('B', 'B.png');
charMap.set('C', 'C.png');
charMap.set('D', 'D.png');
charMap.set('E', 'E.png');
charMap.set('F', 'F.png');
charMap.set('G', 'G.png');
charMap.set('H', 'H.png');
charMap.set('I', 'I.png');
charMap.set('J', 'J.png');
charMap.set('K', 'K.png');
charMap.set('L', 'L.png');
charMap.set('M', 'M.png');
charMap.set('N', 'N.png');
charMap.set('O', 'O.png');
charMap.set('P', 'P.png');
charMap.set('Q', 'Q.png');
charMap.set('R', 'R.png');
charMap.set('S', 'S.png');
charMap.set('T', 'T.png');
charMap.set('U', 'U.png');
charMap.set('V', 'V.png');
charMap.set('W', 'W.png');
charMap.set('X', 'X.png');
charMap.set('Y', 'Y.png');
charMap.set('Z', 'Z.png');
charMap.set('0', '0.png');
charMap.set('1', '1.png');
charMap.set('2', '2.png');
charMap.set('3', '3.png');
charMap.set('4', '4.png');
charMap.set('5', '5.png');
charMap.set('6', '6.png');
charMap.set('7', '7.png');
charMap.set('8', '8.png');
charMap.set('9', '9.png');
charMap.set('►', 'arrow.png');
charMap.set('{', 'acc-start.png');
charMap.set('}', 'acc-end.png');
charMap.set('[', 'cro-start.png');
charMap.set(']', 'cro-end.png');
charMap.set('_', 'cursor.png');
charMap.set('.', 'dot.png');
charMap.set('?', 'question.png');
charMap.set(':', 'semi.png');
charMap.set(' ', 'space.png');

// Récupère l'image du caractère passé en paramètre
export function stringToImages(input: string): string[] {
	
	return Array.from(input).map((char: string) => {
		
		if (char === '\n')
			return '<br />';
		else if (charMap.has(char))
			return charMap.get(char);
		else
			return '';
	});
}

// Intervale de temps entre l'affichage de 2 lettres
const delay: number = 20;

// Boucle d'animation de l'affichage du texte
export function animeText(gameState: GameState, textState: string[], index: number = 0): void {
	
	const newGameState: GameState = {...gameState};
	newGameState.textAnimation = true;
	newGameState.input = -1;
	
	if (index < textState.length)
	{
		const newTextState = textState.slice(0, index);
		emitEvent('game:textAnimation', { gameState: newGameState, textState: newTextState });
		setTimeout(() => { animeText(newGameState, textState, index+1); }, delay);
	}
	else
	{
		newGameState.textAnimation = false;
		emitEvent('game:textAnimation', { gameState: newGameState, textState: textState });
	}
}

// Envoie du texte à afficher vers l'interface graphique
function onTextAnimation(gameState: GameState, textState: string[]): void {

	const newState: State = {
		game: gameState,
		graphics: customFunctionMap.get('clearGraphicsScreen')(),
		text: textState,
	};
	
	if (newState.game.textAnimation === false && newState.game.waitInput === false) {
		newState.graphics.exe = 1.0;
	}
	
	emitEvent('game:textUpdate', { state: newState });
}

// Connexion de l'événement d'animation de texte
eventMap.set('game:textAnimation', (e: CustomEvent<GameEventMap['game:textAnimation']>) => { onTextAnimation(e.detail.gameState, e.detail.textState); });

// Connexion des événements à l'environnement web
window.addEventListener('game:textAnimation', (e) => { execEvent('game:textAnimation', e); });
window.addEventListener('game:textUpdate', (e) => { execEvent('game:textUpdate', e); });
