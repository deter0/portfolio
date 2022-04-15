import React from "react";
import { createRoot } from "react-dom/client";

import "./styles/fonts.scss"
import "./styles/base.scss"
import Landing from "./landing";
import HackerEffect from "./canvas-effects/hacker-effect";
import ScrollIndicator from "./elements/scroll-ind";
import RoundNav from "./elements/round-nav";
import Balloon from "./elements/balloon";
import SecurityPage from "./elements/security";

class App extends React.Component {
	Canvas = React.createRef<HTMLCanvasElement>();
	componentDidMount() {
		if (this.Canvas.current) {
			new HackerEffect(this.Canvas.current);
		}
	}
	render() {
		return <div>
			<ScrollIndicator index={0} />
			<Landing Title="Portfolio" Paragraph="Hello there! I am a programmer">
				<canvas ref={this.Canvas} className="landing-canvas" />
			</Landing>
			<ScrollIndicator index={1} />
			<RoundNav>
				<h1>no bitches 🤔</h1>
				<p>wow</p>
			</RoundNav>
			<SecurityPage>
				<h1>
					I write very secure code (real)
				</h1>
				<p>And fast (so real)</p>
			</SecurityPage>
			<section>
				<button>smt</button>
			</section>
			<Balloon />
		</div >
	}
}

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);