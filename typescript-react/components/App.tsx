import { useState, useEffect } from 'react'

import '../styles/App.css'
import helpImg from '../assets/graphics/help.png'

import type { GameEventMap } from '../utils/types';
import { eventMap, reset, execGameLoop } from '../utils/utils';
import { INITIAL_STATE } from '../utils/gameInitStates';
import { gameLoaded } from '../utils/gameEngine';
import { sounds } from '../utils/soundManager';

import Calculator from './Calculator'
import Graphics from './Graphics'
import TextScreen from './TextScreen'
import Keyboard from './Keyboard'
import Help from './Help'

function App() {
	
	const [loaded, setLoaded] = useState(gameLoaded)
	const [state, setState] = useState(INITIAL_STATE)
	const [displayHelp, setDisplayHelp] = useState('none')

	console.log(`Game loaded : ${loaded}`);	
	console.log(setLoaded);	

	const handleDisplayHelp = (): void => {
		setDisplayHelp(() => (displayHelp === 'none') ? 'block' : 'none');
	};
	
	const handleStart = (): void => {
		if (!state.game.started) {
			setState(() => reset());
		}
	};
	
	const handleExec = (): void => { 
		if (state.game.started && !state.game.textAnimation && (!state.game.waitInput || (state.game.waitInput && state.game.input >= 0))) {
			const newState = execGameLoop(state.game);
			setState(() => newState);
		}
	};
	
	const handleInput = (input: number): void => {

		if (state.game.started && !state.game.textAnimation && state.game.waitInput) {
			sounds.play('key-stroke');
			const newState = {...state};
			newState.game.input = input;
			setState(() => newState);
		}
	};
	
	const handleReset = (): void => { (state.game.started && !state.game.textAnimation) ? setState(() => reset()) : null };
	
	const handleKeyboard = (e: CustomEvent<GameEventMap['game:keyboard']>): void => {
		
		const keys = e.detail.keys;
		
		console.log(keys);
		
		if (keys['Enter']) {
			if (state.game.started) {
				handleExec();
			} else {
				handleStart();
			}
		}
		else if (keys['Escape']) {
		
			if (displayHelp === 'block') {
				handleDisplayHelp();
			} else {
				handleReset();
			}
		}
		else if (keys['Space']) {
			handleDisplayHelp();
		}
		else if (keys['Numpad0']) {
			handleInput(0);
		}
		else if (keys['Numpad1']) {
			handleInput(1);
		}
		else if (keys['Numpad2']) {
			handleInput(2);
		}
		else if (keys['Numpad3']) {
			handleInput(3);
		}
		else if (keys['Numpad4']) {
			handleInput(4);
		}
		else if (keys['Numpad5']) {
			handleInput(5);
		}
		else if (keys['Numpad6']) {
			handleInput(6);
		}
		else if (keys['Numpad7'] || keys['ArrowLeft']) {
			handleInput(7);
		}
		else if (keys['Numpad8'] || keys['ArrowUp']) {
			handleInput(8);
		}
		else if (keys['Numpad9'] || keys['ArrowRight']) {
			handleInput(9);
		}
	};
	
	const handleTextUpdate = (e: CustomEvent<GameEventMap['game:textUpdate']>): void => { e.detail.state ? setState(() => e.detail.state) : null };
	
	useEffect(() => { 
		eventMap.set('game:keyboard', handleKeyboard);
		eventMap.set('game:textUpdate', handleTextUpdate);
	});
	
	return (
		<>
			<Calculator />
			<Graphics display={state.graphics} />
			<TextScreen gameState={state.game} chars={state.text} />
			<Keyboard onInput={handleInput} onExec={handleExec} onReset={handleReset} onStart={handleStart} onMenu={handleDisplayHelp} />
			<Help display={displayHelp} onMenu={handleDisplayHelp} />
			<img id="img-help" src={helpImg} onClick={() => handleDisplayHelp()} />
		</>
	)
}

export default App
