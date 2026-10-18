//// Ecran d'aide ////

var displayHelp = 'none';

var handleDisplayHelp = function()
{
	displayHelp = (displayHelp === 'none') ? 'block' : 'none';
	document.getElementById('help').style.display = displayHelp;
};

document.getElementById('img-help').onclick = handleDisplayHelp;
document.getElementById('img-close').onclick = handleDisplayHelp;
document.getElementById('help').onclick = handleDisplayHelp;

//// Jeu ////

var state = INITIAL_STATE;

var updateFromState = function()
{
	document.getElementById('img-corridor').style.opacity = state.graphics.corridor;
	document.getElementById('img-wall').style.opacity = state.graphics.wall;
	document.getElementById('img-door').style.opacity = state.graphics.door;
	document.getElementById('img-exit').style.opacity = state.graphics.exit;
	document.getElementById('img-left-corridor').style.opacity = state.graphics.leftCorridor;
	document.getElementById('img-right-corridor').style.opacity = state.graphics.rightCorridor;
	document.getElementById('img-left-wall').style.opacity = state.graphics.leftWall;
	document.getElementById('img-right-wall').style.opacity = state.graphics.rightWall;
	document.getElementById('img-corridor-canvas').style.opacity = state.graphics.corridorCanvas;
	document.getElementById('img-alien').style.opacity = state.graphics.alien;
	document.getElementById('img-bullets').style.opacity = state.graphics.bullets;
	document.getElementById('img-heal').style.opacity = state.graphics.heal;
	document.getElementById('img-key').style.opacity = state.graphics.key;
	document.getElementById('img-exe').style.opacity = state.graphics.exe;
	document.getElementById('img-north').style.opacity = state.graphics.north;
	document.getElementById('img-east').style.opacity = state.graphics.east;
	document.getElementById('img-south').style.opacity = state.graphics.south;
	document.getElementById('img-west').style.opacity = state.graphics.west;
	document.getElementById('img-map').style.opacity = state.graphics.map;
	document.getElementById('img-position').style.opacity = state.graphics.position;
	document.getElementById('img-end').style.opacity = state.graphics.end;
	document.getElementById('img-logo').style.opacity = state.graphics.logo;
	
	document.getElementById('img-position').setAttribute('x', state.graphics.posX);
	document.getElementById('img-position').setAttribute('y', state.graphics.posY);
	
	document.getElementById('text').innerHTML = state.text.map(function($char, $i)
	{
		var key = 'char-' + (new Date()).getTime() + $i;
		return ($char === '<br />' || $char === '') ? '<br />' : '<img width="24" height="32" src="assets/chars/' + $char + '" />';
		
	}).join('');
	
	document.getElementById('input').innerHTML = '';
	
	if (state.game.input >= 0)
		document.getElementById('input').innerHTML = '<img width="24" height="32" src="assets/chars/' + state.game.input + '.png" />';
};

var handleStart = function()
{
	if (!state.game.started)
	{
		state = reset();
		updateFromState();
	}
};

const handleReset = function()
{
	if (state.game.started && !state.game.textAnimation)
	{
		state = reset();
		updateFromState();
	}
};

var handleExec = function()
{ 
	if (state.game.started && !state.game.textAnimation && (!state.game.waitInput || (state.game.waitInput && state.game.input >= 0)))
	{
		state = execGameLoop(state.game);
		updateFromState();
	}
};

var handleInput = function($input)
{
	if (state.game.started && !state.game.textAnimation && state.game.waitInput)
	{
		sounds.play('key-stroke');
		state = JSON.parse(JSON.stringify(state));
		state.game.input = $input;
		updateFromState();
	}
};

var handleKeyboard = function($event)
{
	var keys = $event.detail.keys;
	
	//console.log(keys);
	
	if (keys['Enter'])
	{
		if (state.game.started)
			handleExec();
		else
			handleStart();
	}
	
	else if (keys['Escape'])
	{
		if (displayHelp === 'block')
			handleDisplayHelp();
		else
			handleReset();
	}
	
	else if (keys['Space'])
		handleDisplayHelp();
	else if (keys['Numpad0'])
		handleInput(0);
	else if (keys['Numpad1'])
		handleInput(1);
	else if (keys['Numpad2'])
		handleInput(2);
	else if (keys['Numpad3'])
		handleInput(3);
	else if (keys['Numpad4'])
		handleInput(4);
	else if (keys['Numpad5'])
		handleInput(5);
	else if (keys['Numpad6'])
		handleInput(6);
	else if (keys['Numpad7'] || keys['ArrowLeft'])
		handleInput(7);
	else if (keys['Numpad8'] || keys['ArrowUp'])
		handleInput(8);
	else if (keys['Numpad9'] || keys['ArrowRight'])
		handleInput(9);
};

var handleTextUpdate = function($event)
{
	if ($event.detail.state)
	{
		state = $event.detail.state;
		updateFromState();
	}
};

eventMap['game:keyboard'] = handleKeyboard;
eventMap['game:textUpdate'] = handleTextUpdate;

//// Accrochage des événements sur le DOM ////

document.getElementById('key-0').onclick = function() { handleInput(0); };
document.getElementById('key-1').onclick = function() { handleInput(1); };
document.getElementById('key-2').onclick = function() { handleInput(2); };
document.getElementById('key-3').onclick = function() { handleInput(3); };
document.getElementById('key-4').onclick = function() { handleInput(4); };
document.getElementById('key-5').onclick = function() { handleInput(5); };
document.getElementById('key-6').onclick = function() { handleInput(6); };
document.getElementById('key-7').onclick = function() { handleInput(7); };
document.getElementById('key-8').onclick = function() { handleInput(8); };
document.getElementById('key-9').onclick = function() { handleInput(9); };
document.getElementById('key-quit').onclick = function() { handleReset(); };
document.getElementById('key-ac').onclick = function() { handleStart(); };
document.getElementById('key-exe').onclick = function() { handleExec(); };
document.getElementById('key-menu').onclick = function() { handleDisplayHelp(); };
