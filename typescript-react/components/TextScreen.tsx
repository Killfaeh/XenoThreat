import '../styles/TextScreen.css'
import type { GameState } from '../utils/types';
import { charsFolder } from '../assets/chars/chars';

function TextScreen({ gameState, chars }: { gameState: GameState, chars: string[] }) {
	
	return (
		<>
			<div id="text-screen" >
				<svg viewBox="0 0 612 1202" >
					<foreignObject x="148.009" y="143" width="316" height="188" >
						<div id="html" >
							{ chars.map((char, i) => {
								const key = 'char-'+(new Date()).getTime()+i;
								return (char === '<br />' || char === '') ? <br key={key} /> : <img width="24" height="32" key={key} src={`${charsFolder}${char}`} /> 
							}) }
							<br />
							{ gameState.input >= 0 ? <img width="24" height="32" src={`${charsFolder}${gameState.input}.png`} /> : null }
						</div>
					</foreignObject>
				</svg>
				<div className="wall" ></div>
			</div>
		</>
	)
}

export default TextScreen
