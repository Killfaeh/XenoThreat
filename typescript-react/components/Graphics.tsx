import corridorImg from '../assets/graphics/corridor.png'
import wallImg from '../assets/graphics/wall.png'
import doorImg from '../assets/graphics/door.png'
import exitImg from '../assets/graphics/exit.png'
import leftCorridorImg from '../assets/graphics/left-corridor.png'
import rightCorridorImg from '../assets/graphics/right-corridor.png'
import leftWallImg from '../assets/graphics/left-wall.png'
import rightWallImg from '../assets/graphics/right-wall.png'
import corridorCanvasImg from '../assets/graphics/corridor-canvas.png'
import alienImg from '../assets/graphics/alien.png'
import bulletsImg from '../assets/graphics/bullets.png'
import healImg from '../assets/graphics/heal.png'
import keyImg from '../assets/graphics/key.png'
import exeImg from '../assets/graphics/exe.png'
import northImg from '../assets/graphics/north.png'
import eastImg from '../assets/graphics/east.png'
import southImg from '../assets/graphics/south.png'
import westImg from '../assets/graphics/west.png'
import mapImg from '../assets/graphics/map.png'
import positionImg from '../assets/graphics/position.png'
import endImg from '../assets/graphics/end.png'
import logoImg from '../assets/graphics/logo.png'
import '../styles/Graphics.css'
import type { GraphicsState } from '../utils/types';

function Graphics({ display }: { display: GraphicsState }) {
	
	return (
		<>
			<div id="graphics" >
				<svg viewBox="0 0 612 1202" >
					<image id="img-corridor" href={corridorImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.corridor}} />
					<image id="img-wall" href={wallImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.wall}} />
					<image id="img-door" href={doorImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.door}} />
					<image id="img-exit" href={exitImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.exit}} />
					<image id="img-left-corridor" href={leftCorridorImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.leftCorridor}} />
					<image id="img-right-corridor" href={rightCorridorImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.rightCorridor}} />
					<image id="img-left-wall" href={leftWallImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.leftWall}} />
					<image id="img-right-wall" href={rightWallImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.rightWall}} />
					<image id="img-corridor-canvas" href={corridorCanvasImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.corridorCanvas}} />
					<image id="img-alien" href={alienImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.alien}} />
					<image id="img-bullets" href={bulletsImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.bullets}} />
					<image id="img-heal" href={healImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.heal}} />
					<image id="img-key" href={keyImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.key}} />
					<image id="img-exe" href={exeImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.exe}} />
					<image id="img-north" href={northImg} x="152.009" y="299" width="60" height="32" style={{opacity: display.north}} />
					<image id="img-east" href={eastImg} x="152.009" y="299" width="60" height="32" style={{opacity: display.east}} />
					<image id="img-south" href={southImg} x="152.009" y="299" width="60" height="32" style={{opacity: display.south}} />
					<image id="img-west" href={westImg} x="152.009" y="299" width="60" height="32" style={{opacity: display.west}} />
					<image id="img-map" href={mapImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.map}} />
					<image id="img-position" href={positionImg} x={display.posX} y={display.posY} width="20" height="20" style={{opacity: display.position}} />
					<image id="img-end" href={endImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.end}} />
					<image id="img-logo" href={logoImg} x="148.009" y="143" width="316" height="188" style={{opacity: display.logo}} />
				</svg>
				<div className="wall" ></div>
			</div>
		</>
	)
}

export default Graphics