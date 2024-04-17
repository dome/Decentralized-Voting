import React from "react";

function MyText(props) {
	if (props.link !== "") {
		return (
			<div>
				<a href={props.link} target={"_blank"} rel="noreferrer">
					<p className="justify-between font-mono">{props.text}</p>
				</a>
			</div>
		);
	} else {
		return (
			<div>
				<p className="justify-between font-mono">{props.text}</p>
			</div>
		);
	}
}

export default MyText;
