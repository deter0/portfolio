import React from "react";
import "./styles/landing.scss"

export default class Landing extends React.Component<{
	Title: string,
	Paragraph: string,
	children?: any
}> {
	render() {
		return <section className="landing-background">
			<h1 className="landing-title">{this.props.Title}</h1>
			<p className="landing-paragraph">{this.props.Paragraph}</p>
			<div className="landing-child-container">
				{this.props.children}
			</div>
		</section>
	}
}