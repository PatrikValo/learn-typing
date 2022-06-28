import { Component, For, createEffect } from "solid-js";
import Key from "./Key";
import {
	createFirstRow,
	createSecondRow,
	createThirdRow,
	createFourthRow,
	createFifthRow,
} from "../utils/keyboardLayout";

export type KeyboardProps = {
	input: string;
};

const Keyboard: Component<KeyboardProps> = (props) => {
	return (
		<div class="keyboard-container">
			<div class="keyboard">
				<div class="keyboard__row">
					<For each={createFirstRow(props.input)}>
						{(element) => <Key {...element} />}
					</For>
				</div>
				<div class="keyboard__row">
					<For each={createSecondRow(props.input)}>
						{(element) => <Key {...element} />}
					</For>
				</div>
				<div class="keyboard__row">
					<For each={createThirdRow(props.input)}>
						{(element) => <Key {...element} />}
					</For>
				</div>
				<div class="keyboard__row">
					<For each={createFourthRow(props.input)}>
						{(element) => <Key {...element} />}
					</For>
				</div>
				<div class="keyboard__row">
					<For each={createFifthRow(props.input)}>
						{(element) => <Key {...element} />}
					</For>
					<div class="key--arrow" style={{ background: "none" }}></div>
					<div
						class="key--double key--arrow--tall"
						style={{ background: "none" }}
					></div>
					<div class="key--arrow" style={{ background: "none" }}></div>
				</div>
			</div>
			<div class="hands">
				<div class="finger touch-5"></div>
				<div class="finger touch-4" style="margin-top: -17px;"></div>
				<div class="finger touch-3" style="margin-top: -30px;"></div>
				<div class="finger touch-2" style="margin-top: -15px;"></div>
				<div class="finger touch-1" style="margin-right: 15px"></div>
				<div class="finger touch-1"></div>
				<div class="finger touch-2" style="margin-top: -15px;"></div>
				<div class="finger touch-3" style="margin-top: -30px;"></div>
				<div class="finger touch-4" style="margin-top: -17px;"></div>
				<div class="finger touch-5"></div>
			</div>
		</div>
	);
};

export default Keyboard;
