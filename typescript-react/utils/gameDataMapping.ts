////////////////////////////////////////////
// Mapping des données du jeu Xeno Threat //
////////////////////////////////////////////

import type { DataMapping, Player } from './types';
import { spreadOut } from './utils';

//// Mapping des données compressées ////

export const playerMapping: DataMapping = [
	{ name: 'tileId', digit: 3 },
	{ name: 'sectionId', digit: 1 },
	{ name: 'orientation', digit: 1 },
	{ name: 'keys', digit: 1 },
	{ name: 'hp', digit: 2 },
	{ name: 'bullets', digit: 2 },
];

const testP: Player = spreadOut<Player>(16109930, playerMapping);
console.log(testP);

export const tileMapping1: DataMapping = [
	{ name: 'x', digit: 2 },
	{ name: 'y', digit: 2 },
	{ name: 'left', digit: 3 },
	{ name: 'right', digit: 3 },
];

export const tileMapping2: DataMapping = [
	{ name: 'bottom', digit: 3 },
	{ name: 'top', digit: 3 },
	{ name: 'locked', digit: 1 },
	{ name: 'section', digit: 1 },
	{ name: 'item', digit: 2 },
];