import { KeyProps } from "../components/Key";

const leftHand = {
	"~": 5,
	"`": 5,
	"1": 5,
	"!": 5,
	"2": 5,
	"@": 5,
	tab: 5,
	q: 5,
	a: 5,
	shift: 5,
	z: 5,
	"3": 4,
	"#": 4,
	w: 4,
	s: 4,
	x: 4,
	"4": 3,
	$: 3,
	e: 3,
	d: 3,
	c: 3,
	"5": 2,
	"%": 2,
	r: 2,
	f: 2,
	v: 2,
	"6": 2,
	"^": 2,
	t: 2,
	g: 2,
	b: 2,
	" ": 1,
} as Record<string, 1 | 2 | 3 | 4 | 5>;

const rightHand = {
	"]": 5,
	"}": 5,
	"\\": 5,
	"|": 5,
	enter: 5,
	shift: 5,
	"": 5,
	"=": 5,
	"+": 5,
	"[": 5,
	"{": 5,
	"'": 5,
	'"': 5,
	"-": 5,
	_: 5,
	p: 5,
	";": 5,
	":": 5,
	"/": 5,
	"?": 5,
	"0": 4,
	")": 4,
	o: 4,
	l: 4,
	".": 4,
	">": 4,
	"9": 3,
	"(": 3,
	i: 3,
	k: 3,
	",": 3,
	"<": 3,
	"8": 2,
	"*": 2,
	u: 2,
	j: 2,
	m: 2,
	"7": 2,
	"&": 2,
	y: 2,
	h: 2,
	n: 2,
} as Record<string, 1 | 2 | 3 | 4 | 5>;

const shiftLeftHand = [
	"&",
	"*",
	"(",
	")",
	"_",
	"+",
	"{",
	"}",
	":",
	'"',
	"|",
	"<",
	">",
	"?",
];

const shiftRightHand = ["~", "!", "@", "#", "$", "%", "^"];

export const keyToFinger = (input: string): 1 | 2 | 3 | 4 | 5 | undefined => {
	return leftHand[input.toLowerCase()] ?? rightHand[input.toLowerCase()];
};

export const createFirstRow = (input: string): KeyProps[] => {
	const characters = [
		["~", "`"],
		["!", "1"],
		["@", "2"],
		["#", "3"],
		["$", "4"],
		["%", "5"],
		["^", "6"],
		["&", "7"],
		["*", "8"],
		["(", "9"],
		[")", "0"],
		["_", "-"],
		["+", "="],
	] as [string, string][];
	return [
		...characters.map((title) => ({
			variant: "double",
			title,
			touch: title[0] === input || title[1] === input,
		})),
		{
			variant: "letter",
			title: "backspace",
			verticalAlign: "down",
			horizontalAlign: "right",
			width: "w4",
			touch: false,
		},
	] as KeyProps[];
};

export const createSecondRow = (input: string): KeyProps[] => {
	const letterCharacters = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const doubleCharacters = [
		["{", "["],
		["}", "]"],
	] as [string, string][];
	return [
		{
			variant: "letter",
			title: "tab",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w3",
			touch: "tab" === input,
		},
		...letterCharacters.map((title) => ({
			variant: "letter",
			title,
			touch: title.toLowerCase() === input.toLowerCase(),
		})),
		...doubleCharacters.map((title) => ({
			variant: "double",
			title,
			touch: title[0] === input || title[1] === input,
		})),
		{
			variant: "letter",
			title: "enter",
			verticalAlign: "down",
			horizontalAlign: "right",
			width: "w3",
			touch: "\n" === input,
		},
	] as KeyProps[];
};

export const createThirdRow = (input: string): KeyProps[] => {
	const letterCharacters = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const doubleCharacters = [
		[":", ";"],
		['"', "'"],
		["|", "\\"],
	] as [string, string][];
	return [
		{
			variant: "letter",
			title: "caps lock",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w4",
			touch: false,
		},
		...letterCharacters.map((title) => ({
			variant: "letter",
			title,
			touch: title.toLowerCase() === input.toLowerCase(),
		})),
		...doubleCharacters.map((title) => ({
			variant: "double",
			title,
			touch: title[0] === input || title[1] === input,
		})),
		{
			variant: "letter",
			title: "",
			verticalAlign: "down",
			horizontalAlign: "right",
			width: "w1",
			touch: "\n" === input,
		},
	] as KeyProps[];
};

const touchLeftShift = (input: string): boolean => {
	const inputLowerCase = input.toLowerCase();
	return (
		(inputLowerCase !== input && rightHand[inputLowerCase] !== undefined) ||
		shiftLeftHand.includes(input)
	);
};

const touchRightShift = (input: string): boolean => {
	const inputLowerCase = input.toLowerCase();
	return (
		(inputLowerCase !== input && leftHand[inputLowerCase] !== undefined) ||
		shiftRightHand.includes(input)
	);
};

export const createFourthRow = (input: string): KeyProps[] => {
	const letterCharacters = ["Z", "X", "C", "V", "B", "N", "M"];
	const doubleCharacters = [
		["<", ","],
		[">", "."],
		["?", "/"],
	] as [string, string][];
	return [
		{
			variant: "letter",
			title: "shift",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w6",
			touch: touchLeftShift(input),
		},
		...letterCharacters.map((title) => ({
			variant: "letter",
			title,
			touch: title.toLowerCase() === input.toLowerCase(),
		})),
		...doubleCharacters.map((title) => ({
			variant: "double",
			title,
			touch: title[0] === input || title[1] === input,
		})),
		{
			variant: "letter",
			title: "shift",
			verticalAlign: "down",
			horizontalAlign: "right",
			width: "w6",
			touch: touchRightShift(input),
		},
	] as KeyProps[];
};

export const createFifthRow = (input: string): KeyProps[] => {
	return [
		{
			variant: "letter",
			title: "ctrl",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w1",
			touch: false,
		},
		{
			variant: "letter",
			title: "fn",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w1",
			touch: false,
		},
		{
			variant: "letter",
			title: "option",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w1",
			touch: false,
		},
		{
			variant: "letter",
			title: "alt",
			verticalAlign: "down",
			horizontalAlign: "left",
			width: "w3",
			touch: false,
		},
		{
			variant: "space",
			touch: " " === input,
		},
		{
			variant: "letter",
			title: "alt",
			verticalAlign: "down",
			horizontalAlign: "right",
			width: "w3",
			touch: false,
		},
		{
			variant: "letter",
			title: "ctrl",
			verticalAlign: "down",
			horizontalAlign: "right",
			width: "w1",
			touch: false,
		},
	] as KeyProps[];
};
