import { Component, createSignal, onMount, onCleanup } from "solid-js";
import Keyboard from "./components/Keyboard";

const App: Component = () => {
	const [key, setKey] = createSignal("");

	onMount(() => {
		const socket = new WebSocket("ws://localhost:8080/");

		socket.addEventListener("message", (event) => {
			setKey(JSON.parse(event.data).key);
			console.log(key());
		});

		onCleanup(() => socket.close());
	});

	return <Keyboard input={key()} />;
};

export default App;
