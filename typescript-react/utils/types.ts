//////////////////////////
// Définition des types //
//////////////////////////

export interface DataMappingRow {
	name: string;
	digit: number;
};

export type DataMapping = DataMappingRow[];

export interface GameMap {
	slot1: number[];
	slot2: number[];
};
	
export type Orientation = 1 | 2 | 3 | 4;

export interface Player {
	oldTileId: number;
	tileId: number;
	sectionId: number;
	currentStage: GameMap;
	orientation: Orientation;
	keys: number;
	hp: number;
	bullets: number;
};

export interface Tile1 {
	x: number;
	y: number;
	left: number;
	right: number;
};

export interface Tile2 {
	bottom: number;
	top: number;
	locked: number;
	section: number;
	item: number;
};

export interface Tile {
	x: number;
	y: number;
	left: number;
	right: number;
	bottom: number;
	top: number;
	locked: number;
	section: number;
	item: number;
};

export type PrgmCursor = 0 | 1 | 2 | 3;

export interface GameState {
	started: boolean;
	prgmCursor: string;
	textAnimation: boolean;
	waitInput: boolean;
	input: number;
	alienHP: number;
	player: Player;
};

export type Display = 0.0 | 1.0;

export interface GraphicsState {
    corridor: Display;
	wall: Display;
	door: Display;
	exit: Display;
	leftCorridor: Display;
	rightCorridor: Display;
	leftWall: Display;
	rightWall: Display;
	corridorCanvas: Display;
	alien: Display;
	bullets: Display;
	heal: Display;
	key: Display;
	exe: Display;
	north: Display;
	east: Display;
	south: Display;
	west: Display;
	map: Display;
	position: Display;
	posX: number;
	posY: number;
	end: Display;
	logo: Display;
};

export interface State {
	game: GameState;
	graphics: GraphicsState;
	text: string[];
};

export type SaveState = Player | null;

export interface AllSaveStates {
	'1': SaveState;
	'2': SaveState;
	'3': SaveState;
	'4': SaveState;
	'5': SaveState;
	'6': SaveState;
	'7': SaveState;
	'8': SaveState;

};

export interface GameEventMap {
	'game:keyboard': { keys: Record<string, boolean> };
	'game:textAnimation': { gameState: GameState, textState: string[] };
	'game:textUpdate': { state: State };
};

declare global {
	interface WindowEventMap {
		'game:keyboard': CustomEvent<GameEventMap['game:keyboard']>;
		'game:textAnimation': CustomEvent<GameEventMap['game:textAnimation']>;
		'game:textUpdate': CustomEvent<GameEventMap['game:textUpdate']>;
	}
}
