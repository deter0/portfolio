import React from "react";
import "../styles/round-nav.scss"
import RoundNavEffect from "../canvas-effects/roundnav-effect";

export default class RoundNav extends React.Component<{
	children?: any
}> {
	canvas = React.createRef<HTMLCanvasElement>();
	componentDidMount() {
		if (this.canvas.current) {
			new RoundNavEffect(this.canvas.current);
		} else {
			console.error("No canvas?");
		}
	}
	render() {
		return <section className="nav-background">
			<canvas ref={this.canvas} className="nav-canv" />
			<section className="nav-sec">
				{this.props.children}
			</section>
		</section>
	}
}