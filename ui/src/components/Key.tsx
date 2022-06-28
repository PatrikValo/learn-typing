import { Component, Show, For } from "solid-js";
import { keyToFinger } from "../utils/keyboardLayout";

type KeySingleProps = {
	variant: "letter";
	verticalAlign?: "center" | "down";
	horizontalAlign?: "left" | "center" | "right";
	width?: "w1" | "w2" | "w3" | "w4" | "w5" | "w6";
	title: string;
	touch: boolean;
};

type KeyDoubleProps = {
	variant: "double";
	title: [string, string];
	touch: boolean;
};

type KeySpaceProps = {
	variant: "space";
	touch: boolean;
};

export type KeyProps = KeySingleProps | KeyDoubleProps | KeySpaceProps;

const Key: Component<KeyProps> = (props) => {
	const { variant, touch } = props;

	if (variant === "space") {
		return (
			<div
				class={`key--double key--space ${
					touch ? "touch-" + keyToFinger(" ") : ""
				}`}
			>
				&nbsp;
			</div>
		);
	}

	const { title } = props;

	if (variant === "letter") {
		const { horizontalAlign, verticalAlign, width } = props;
		let classes = !width ? "" : `key--${width} `;
		const finger = keyToFinger(props.title);
		classes += touch && finger ? "touch-" + finger : "";
		return (
			<div
				class={classes}
				classList={{
					"key--letter": !width && !horizontalAlign && !verticalAlign,
					"key--word": !!width,
					touch,
					"key--bottom-right":
						verticalAlign === "down" && horizontalAlign === "right",
					"key--bottom-left":
						verticalAlign === "down" && horizontalAlign === "left",
					empty: !title,
				}}
			>
				<span>{title}</span>
			</div>
		);
	}

	return (
		<div class={`key--double ${touch ? "touch-" + keyToFinger(title[0]) : ""}`}>
			<For each={props.title}>{(t) => <div>{t}</div>}</For>
		</div>
	);
};

export default Key;
