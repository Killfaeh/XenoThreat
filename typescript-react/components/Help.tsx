import '../styles/Help.css'
import closeImg from '../assets/graphics/close.png'

function Help({ display, onMenu }: { display: string, onMenu: () => void }) {

	return (
		<>
			<div id="help" style={{display: display}} onClick={() => onMenu()} >
				<div id="help-content" >
					<table>
						<tbody>
							<tr><td className="action" >Turn on</td><td><span className="calculator-key light" >AC<sup>/on</sup></span></td><td><span className="computer-key" >Enter</span></td></tr>
							<tr><td className="action" >Enter</td><td><span className="calculator-key blue" >EXE</span></td><td><span className="computer-key" >Enter</span></td></tr>
							<tr><td className="action" >Quit game</td><td><span className="calculator-key black" >QUIT</span></td><td><span className="computer-key" >Escape</span></td></tr>
						
							<tr><th colSpan={3} className="table-head" >Exploration</th></tr>
							<tr><td className="action" >Go foward</td><td><span className="calculator-key gray" >8</span></td><td><span className="computer-key" >8</span></td></tr>
							<tr><td className="action" >Turn left</td><td><span className="calculator-key gray" >7</span></td><td><span className="computer-key" >7</span></td></tr>
							<tr><td className="action" >Turn right</td><td><span className="calculator-key gray" >9</span></td><td><span className="computer-key" >9</span></td></tr>
							<tr><td className="action" >Map</td><td><span className="calculator-key gray" >5</span></td><td><span className="computer-key" >5</span></td></tr>
							<tr><td className="action" >Stat</td><td><span className="calculator-key gray" >2</span></td><td><span className="computer-key" >2</span></td></tr>
							<tr><td className="action" >Help</td><td><span className="calculator-key gray" >6</span></td><td><span className="computer-key" >6</span></td></tr>
							<tr><td className="action" >Load game</td><td><span className="calculator-key gray" >1</span></td><td><span className="computer-key" >1</span></td></tr>
							<tr><td className="action" >Save game</td><td><span className="calculator-key gray" >3</span></td><td><span className="computer-key" >3</span></td></tr>
							
							<tr><th colSpan={3} className="table-head" >Fight</th></tr>
							<tr><td className="action" >Hand attack</td><td><span className="calculator-key gray" >1</span></td><td><span className="computer-key" >1</span></td></tr>
							<tr><td className="action" >Gun attack</td><td><span className="calculator-key gray" >2</span></td><td><span className="computer-key" >2</span></td></tr>
							<tr><td className="action" >Escape</td><td><span className="calculator-key gray" >3</span></td><td><span className="computer-key" >3</span></td></tr>
						</tbody>
					</table>
				</div>
				<div className="wall" ></div>
				<img id="img-close" src={closeImg} onClick={() => onMenu()} />
			</div>
		</>
	)
}

export default Help