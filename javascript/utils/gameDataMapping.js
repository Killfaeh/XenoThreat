////////////////////////////////////////////
// Mapping des données du jeu Xeno Threat //
////////////////////////////////////////////

//// Mapping des données compressées ////

var playerMapping =
[
	{ name: 'tileId', digit: 3 },
	{ name: 'sectionId', digit: 1 },
	{ name: 'orientation', digit: 1 },
	{ name: 'keys', digit: 1 },
	{ name: 'hp', digit: 2 },
	{ name: 'bullets', digit: 2 },
];

// var testP = spreadOut(16109930, playerMapping);
// console.log(testP);

var tileMapping1 =
[
	{ name: 'x', digit: 2 },
	{ name: 'y', digit: 2 },
	{ name: 'left', digit: 3 },
	{ name: 'right', digit: 3 },
];

var tileMapping2 =
[
	{ name: 'bottom', digit: 3 },
	{ name: 'top', digit: 3 },
	{ name: 'locked', digit: 1 },
	{ name: 'section', digit: 1 },
	{ name: 'item', digit: 2 },
];