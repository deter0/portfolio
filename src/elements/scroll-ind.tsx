// Scroll indicator

import React from "react";

import "../styles/scroll.scss"

export default class ScrollIndicator extends React.Component<{ index: number }> {
	button = React.createRef<HTMLButtonElement>();
	render() {
		return <div className="scroll-ind-cont">
			<button onClick={(event) => {
				console.log(event.target);
				window.scroll({
					top: (this.props.index + 1) * window.innerHeight,
					behavior: "smooth"
				});
			}} className="icon-large icon">arrow_downward</button>
		</div>
	}
}