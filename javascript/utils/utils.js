////////////////////////////////
// Moteur de jeu réutilisable //
////////////////////////////////

var customFunctionMap = {};

//// Divers ////

// Récupère une liste de propriétés à partir d'un nombre entier

function spreadOut(num, mapping)
{
	var tmpNum = num;
	var totalDigit = mapping.reduce(function($sum, $row) { return $sum + $row.digit; }, 0);
	var digitOffset = 0;
	var map = {};
	
	mapping.forEach(function(row)
	{
		var rowName = row.name;
		var rowDigit = row.digit;
		var powNum = Math.pow(10, totalDigit-digitOffset-rowDigit);
		var rowValue = Math.floor(tmpNum/powNum);
		tmpNum = tmpNum - rowValue*powNum;
		digitOffset += rowDigit;
		
		map[rowName] = rowValue;
		
		if (digitOffset > totalDigit)
			digitOffset = totalDigit;
	});
	
	return map;
}


//// Gestion des événements ////

// Mapping des événements disponibles

var eventMap = {};

// Emission d'un signal

function emitEvent(type, data)
{
	var event = new CustomEvent(type, { detail: data });
	window.dispatchEvent(event);
}

// Exécution de l'événement émis

function execEvent($name, $event)
{
	if (eventMap[$name])
		eventMap[$name]($event);
}

// Evénements clavier

var keys = {}; // Mapping de l'état des touches

var handleKey = function($event)
{
	keys[$event.code] = ($event.type === 'keydown');
	emitEvent('game:keyboard', { keys: JSON.parse(JSON.stringify(keys)) });
};

window.addEventListener('keydown', handleKey);
window.addEventListener('keyup', handleKey);
window.addEventListener('game:keyboard', function($event) { execEvent('game:keyboard', $event); });

//// Boucle de jeu ////

// Mapping des sous programmes
var subPrgm = {};

// Mapping des états intiaux
var initialStates = {};
initialStates['INITIAL_GAME_STATE'] = {};
initialStates['INITIAL_GRAPHICS_STATE'] = {};
initialStates['INITIAL_TEXT_STATE'] = [];
initialStates['INITIAL_STATE'] = {};

// Initialisation d'un nouvel état du jeu
function initNewState(gameState)
{
	var newGameState = JSON.parse(JSON.stringify(gameState));
	var newGraphicsState = customFunctionMap['clearGraphicsScreen']();
	var newTextState = customFunctionMap['clearTextScreen']();
	
	var newState =
	{
		game: newGameState,
		graphics: newGraphicsState,
		text: newTextState,
	};
	
	return newState;
}

// Réinitialisation du jeu
function reset()
{
	var oldGameState = JSON.parse(JSON.stringify(initialStates['INITIAL_STATE']));
	
	if (subPrgm['displayStartScreen'])
		return subPrgm['displayStartScreen'](oldGameState);
	else
		return customFunctionMap['clearGraphicsScreen']();
}

// Exécution du prochain tour de jeu
function execGameLoop(gameState)
{
	var oldGameState = JSON.parse(JSON.stringify(gameState));
	oldGameState.textAnimation = false;
	oldGameState.waitInput = false;
	
	if (subPrgm[oldGameState.prgmCursor])
	{
		sounds.play(oldGameState.soundToPlay);
		var newState = subPrgm[oldGameState.prgmCursor](oldGameState);
		newState.game.input = -1;
		return newState;
	}
	else
		return customFunctionMap['clearGraphicsScreen']();
}

//// Gestion de l'écran texte ////

var charMap = {};

charMap['A'] = 'A.png';
charMap['B'] = 'B.png';
charMap['C'] = 'C.png';
charMap['D'] = 'D.png';
charMap['E'] = 'E.png';
charMap['F'] = 'F.png';
charMap['G'] = 'G.png';
charMap['H'] = 'H.png';
charMap['I'] = 'I.png';
charMap['J'] = 'J.png';
charMap['K'] = 'K.png';
charMap['L'] = 'L.png';
charMap['M'] = 'M.png';
charMap['N'] = 'N.png';
charMap['O'] = 'O.png';
charMap['P'] = 'P.png';
charMap['Q'] = 'Q.png';
charMap['R'] = 'R.png';
charMap['S'] = 'S.png';
charMap['T'] = 'T.png';
charMap['U'] = 'U.png';
charMap['V'] = 'V.png';
charMap['W'] = 'W.png';
charMap['X'] = 'X.png';
charMap['Y'] = 'Y.png';
charMap['Z'] = 'Z.png';
charMap['0'] = '0.png';
charMap['1'] = '1.png';
charMap['2'] = '2.png';
charMap['3'] = '3.png';
charMap['4'] = '4.png';
charMap['5'] = '5.png';
charMap['6'] = '6.png';
charMap['7'] = '7.png';
charMap['8'] = '8.png';
charMap['9'] = '9.png';
charMap['►'] = 'arrow.png';
charMap['{'] = 'acc-start.png';
charMap['}'] = 'acc-end.png';
charMap['['] = 'cro-start.png';
charMap[']'] = 'cro-end.png';
charMap['_'] = 'cursor.png';
charMap['.'] = 'dot.png';
charMap['?'] = 'question.png';
charMap[':'] = 'semi.png';
charMap[' '] = 'space.png';

// Récupère l'image du caractère passé en paramètre
function stringToImages($input)
{
	return Array.from($input).map(function($char)
	{
		if ($char === '\n')
			return '<br />';
		else if (charMap[$char])
			return charMap[$char];
		else
			return '';
	});
}

// Intervale de temps entre l'affichage de 2 lettres
var delay = 20;

// Boucle d'animation de l'affichage du texte
function animeText(gameState, textState, index = 0)
{
	if (!index)
		index = 0;
	
	var newGameState = JSON.parse(JSON.stringify(gameState));
	newGameState.textAnimation = true;
	newGameState.input = -1;
	
	if (index < textState.length)
	{
		var newTextState = textState.slice(0, index);
		emitEvent('game:textAnimation', { gameState: newGameState, textState: newTextState });
		setTimeout(function() { animeText(newGameState, textState, index+1); }, delay);
	}
	else
	{
		newGameState.textAnimation = false;
		emitEvent('game:textAnimation', { gameState: newGameState, textState: textState });
	}
}

// Envoie du texte à afficher vers l'interface graphique
function onTextAnimation(gameState, textState)
{
	var newState =
	{
		game: gameState,
		graphics: customFunctionMap['clearGraphicsScreen'](),
		text: textState,
	};
	
	if (newState.game.textAnimation === false && newState.game.waitInput === false)
		newState.graphics.exe = 1.0;
	
	emitEvent('game:textUpdate', { state: newState });
}

// Connexion de l'événement d'animation de texte
eventMap['game:textAnimation'] = function($event) { onTextAnimation($event.detail.gameState, $event.detail.textState); };

// Connexion des événements à l'environnement web
window.addEventListener('game:textAnimation', function($event) { execEvent('game:textAnimation', $event); });
window.addEventListener('game:textUpdate', function($event) { execEvent('game:textUpdate', $event); });
