import '../styles/Keyboard.css'

interface KeyboardProps {
	onStart: () => void;
	onInput: (input: number) => void;
	onExec: () => void;
	onReset: () => void;
	onMenu: () => void;
}

function Keyboard({ onStart, onInput, onExec, onReset, onMenu }: KeyboardProps) {
	
	//<rect id="key-del" x="362.692" y="788.776" width="80.611" height="55.44" onClick={() => onReset()} />
	//<rect id="key-quit" x="313.469" y="569.462" width="63.936" height="41.109" onClick={() => onReset()} />
	
	return (
		<>
			<div id="keyboard" >
				<svg viewBox="0 0 612 1202" >
					<rect id="key-0" x="67.468" y="1035.1" width="80.611" height="55.44" onClick={() => onInput(0)} />
					<rect id="key-1" x="67.628" y="952.792" width="80.611" height="55.44" onClick={() => onInput(1)} />
					<rect id="key-2" x="166.804" y="951.792" width="80.611" height="55.44" onClick={() => onInput(2)} />
					<rect id="key-3" x="266.005" y="951.792" width="80.611" height="55.44" onClick={() => onInput(3)} />
					<rect id="key-4" x="67.904" y="870.933" width="80.611" height="55.44" onClick={() => onInput(4)} />
					<rect id="key-5" x="167.017" y="870.933" width="80.611" height="55.44" onClick={() => onInput(5)} />
					<rect id="key-6" x="266.237" y="870.933" width="80.611" height="55.44" onClick={() => onInput(6)} />
					<rect id="key-7" x="69.447" y="789.776" width="80.611" height="55.44" onClick={() => onInput(7)} />
					<rect id="key-8" x="167.823" y="788.776" width="80.611" height="55.44" onClick={() => onInput(8)} />
					<rect id="key-9" x="265.852" y="788.776" width="80.611" height="55.44" onClick={() => onInput(9)} />
					<rect id="key-quit" x="313.469" y="569.462" width="63.936" height="41.109" onClick={() => onReset()} />
					<rect id="key-ac" x="461.675" y="788.776" width="80.611" height="55.44" onClick={() => onStart()} />
					<rect id="key-exe" x="464.014" y="1033.57" width="80.611" height="55.44" onClick={() => onExec()} />
					<rect id="key-menu" x="313.469" y="496.645" width="63.936" height="41.109" onClick={() => onMenu()} />
				</svg>
				<div className="wall" ></div>
			</div>
		</>
	)
}

export default Keyboard