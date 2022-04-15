import React from "react";
// Reduce, reuse, recycle
import "../styles/round-nav.scss"
import Security from "../canvas-effects/security-effect";

export default class SecurityPage extends React.Component<{
	children?: any
}> {
	canvas = React.createRef<HTMLCanvasElement>();
	componentDidMount() {
		if (this.canvas.current) {
			new Security(this.canvas.current);
		} else {
			console.error("No canvas?");
		}
	}
	render() {
		return <section className="nav-background-gr-flip nav-background">
			<canvas ref={this.canvas} className="nav-canv" />
			<section className="nav-sec">
				{this.props.children}
			</section>
		</section>
	}
}