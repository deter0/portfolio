import React from "react";
import "../styles/balloon.scss"

export default class Balloon extends React.Component {
	state = {
		Active: false
	};

	componentDidMount() {
		window.onscroll = () => {
			this.setState({ Active: window.scrollY > window.innerHeight / 4 });
		}
	}

	render() {
		return <button onClick={() => {
			window.scroll({
				top: 0,
				behavior: "smooth"
			})
		}} className={`${!this.state.Active && "balloon-inactive"} balloon`}>
			<svg aria-hidden="true" role="img" width="48" height="48" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" className="iconify iconify--mdi"><path fill="currentColor" d="M13.16 12.74L14 14h-1.5c-.15 2.71-.5 5.41-1 8.08l-1-.16c.5-2.62.84-5.26 1-7.92H10l.84-1.26C8.64 11.79 7 8.36 7 6a5 5 0 0 1 5-5a5 5 0 0 1 5 5c0 2.36-1.64 5.79-3.84 6.74Z"></path></svg>
		</button>
	}
}