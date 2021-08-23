import React from "react";
import "./Wrapper.styles.css";

export const Wrapper = (props: any) => (
	<React.Fragment>
		<div
			className="bg-light content-wrap"
			style={{ padding: "2% 5% 2% 5%" }}
		>
			{props.children}
		</div>
	</React.Fragment>
);
