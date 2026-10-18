import calculatorImg from '../assets/calculator.png'
import '../styles/Calculator.css'

function Calculator() {
	
	return (
		<>
			<div id="calculator" >
				<svg viewBox="0 0 612 1202" >
					<image href={calculatorImg} x="0" y="0" width="612" height="1202" />
					<rect id="screen-background" x="148.009" y="143" width="316" height="188" />
				</svg>
				<div className="wall" ></div>
			</div>
		</>
	)
}

export default Calculator