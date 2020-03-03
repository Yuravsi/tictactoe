for (let i of document.querySelectorAll(".cell")) {
	i.onclick = function() {
		Click(i);
	};
}

let step = 0;
let history = [];
let counter = 1;
let canMove = true;

if (localStorage.getItem("data")) {
	Recover();
}

function Click(el) {
	if (canMove) {
		if (!el.hasChildNodes()) {
			if (counter != 1) {
				for (let i = 1; i < counter; i++) {
					history.pop();
				}
				counter = 1;
			}
			if (step % 2 === 0) {
				let X = document.createElement("div");
				X.className = "ch";
				el.appendChild(X);
			} else {
				let O = document.createElement("div");
				O.className = "r";
				el.appendChild(O);
			}
			step++;
			history.push(el.id);
			document.querySelector(".undo-btn").disabled = false;
			document.querySelector(".redo-btn").disabled = true;
			Check();
		}
	}
}

document.querySelector(".undo-btn").onclick = function() {
	step--;
	document
		.getElementById(history[history.length - counter])
		.removeChild(document.getElementById(history[history.length - counter]).firstChild);
	document.querySelector(".redo-btn").disabled = false;
	if (history.length - counter === 0) {
		document.querySelector(".undo-btn").disabled = true;
	}
	counter++;
};
document.querySelector(".redo-btn").onclick = function() {
	document.querySelector(".undo-btn").disabled = false;
	counter--;
	if (history.length - counter > history.length - 2) {
		document.querySelector(".redo-btn").disabled = true;
	}
	if (step % 2 === 0) {
		let X = document.createElement("div");
		X.className = "ch";
		document.getElementById(history[history.length - counter]).appendChild(X);
	} else {
		let O = document.createElement("div");
		O.className = "r";
		document.getElementById(history[history.length - counter]).appendChild(O);
	}
	step++;
};

document.querySelector(".restart-btn").onclick = function() {
	step = 0;
	history = [];
	canMove = true;
	document.querySelector(".won-title").classList.add("hidden");
	RemoveMarkedCells();
};

function Check() {
	let Size = document.querySelector(".field").childNodes.length;
	let MarkedCells = 0;
	for (let i = 0; i < Size; i++) {
		for (let e = 0; e < Size; e++) {
			if (!document.querySelector(".field").childNodes[i].childNodes[e].firstChild) {
				break;
			}
			MarkedCells++;
			if (e === Size - 1) {
				let FirstElement = document.querySelector(".field").childNodes[i].firstChild.firstChild.className;

				for (let el = 1; el < document.querySelector(".field").childNodes[i].childNodes.length; el++) {
					if (FirstElement !== document.querySelector(".field").childNodes[i].childNodes[el].firstChild.className) {
						break;
					}
					if (el === Size - 1) {
						document.querySelector(".won-title").classList.remove("hidden");
						if (document.querySelector(".field").childNodes[i].childNodes[el].firstChild.className === "ch") {
							document.querySelector(".won-message").textContent = "Crosses won!";
						} else {
							document.querySelector(".won-message").textContent = "Toes won!";
						}
						for (let WinCell = 0; WinCell < Size; WinCell++) {
							document.querySelector(".field").childNodes[i].childNodes[WinCell].classList.add("win");
							document.querySelector(".field").childNodes[i].childNodes[WinCell].classList.add("horizontal");
						}
						document.querySelector(".undo-btn").disabled = true;
						canMove = false;
					}
				}
			}
		}
		for (let e = 0; e < Size; e++) {
			if (!document.querySelector(".field").childNodes[e].childNodes[i].firstChild) {
				break;
			}

			if (e === Size - 1) {
				let FirstElement = document.querySelector(".field").firstChild.childNodes[i].firstChild.className;

				for (let el = 1; el < Size; el++) {
					if (FirstElement !== document.querySelector(".field").childNodes[el].childNodes[i].firstChild.className) {
						break;
					}
					if (el === Size - 1) {
						document.querySelector(".won-title").classList.remove("hidden");
						if (document.querySelector(".field").childNodes[el].childNodes[i].firstChild.className === "ch") {
							document.querySelector(".won-message").textContent = "Crosses won!";
						} else {
							document.querySelector(".won-message").textContent = "Toes won!";
						}
						for (let WinCell = 0; WinCell < Size; WinCell++) {
							document.querySelector(".field").childNodes[WinCell].childNodes[i].classList.add("win");
							document.querySelector(".field").childNodes[WinCell].childNodes[i].classList.add("vertical");
						}
						document.querySelector(".undo-btn").disabled = true;
						canMove = false;
					}
				}
			}
		}
	}
	for (let i = 0; i < Size; i++) {
		if (!document.querySelector(".field").childNodes[i].childNodes[i].firstChild) {
			break;
		}
		if (i === Size - 1) {
			let FirstElement = document.querySelector(".field").firstChild.firstChild.firstChild.className;
			for (let el = 1; el < Size; el++) {
				if (FirstElement !== document.querySelector(".field").childNodes[el].childNodes[el].firstChild.className) {
					break;
				}
				if (el === Size - 1) {
					document.querySelector(".won-title").classList.remove("hidden");
					if (document.querySelector(".field").childNodes[el].childNodes[el].firstChild.className === "ch") {
						document.querySelector(".won-message").textContent = "Crosses won!";
					} else {
						document.querySelector(".won-message").textContent = "Toes won!";
					}
					for (let WinCell = 0; WinCell < Size; WinCell++) {
						document.querySelector(".field").childNodes[WinCell].childNodes[WinCell].classList.add("win");
						document.querySelector(".field").childNodes[WinCell].childNodes[WinCell].classList.add("diagonal-right");
					}
					document.querySelector(".undo-btn").disabled = true;
					canMove = false;
				}
			}
		}
	}
	for (let i = 0; i < Size; i++) {
		if (!document.querySelector(".field").childNodes[i].childNodes[Size - 1 - i].firstChild) {
			break;
		}
		if (i === Size - 1) {
			let FirstElement = document.querySelector(".field").firstChild.lastChild.firstChild.className;
			for (let el = 1; el < Size; el++) {
				if (
					FirstElement !==
					document.querySelector(".field").childNodes[el].childNodes[Size - 1 - el].firstChild.className
				) {
					break;
				}
				if (el === Size - 1) {
					document.querySelector(".won-title").classList.remove("hidden");
					if (document.querySelector(".field").childNodes[el].childNodes[Size - 1 - el].firstChild.className === "ch") {
						document.querySelector(".won-message").textContent = "Crosses won!";
					} else {
						document.querySelector(".won-message").textContent = "Toes won!";
					}
					for (let WinCell = 0; WinCell < Size; WinCell++) {
						document.querySelector(".field").childNodes[WinCell].childNodes[Size - 1 - WinCell].classList.add("win");
						document
							.querySelector(".field")
							.childNodes[WinCell].childNodes[Size - 1 - WinCell].classList.add("diagonal-left");
					}
					document.querySelector(".undo-btn").disabled = true;
					canMove = false;
				}
			}
		}
	}
	if (document.querySelector(".won-title").classList.contains("hidden")) {
		if (Size * Size === MarkedCells) {
			document.querySelector(".won-title").classList.remove("hidden");
			document.querySelector(".won-message").textContent = "It's a draw!";
			document.querySelector(".undo-btn").disabled = true;
		}
	}
}
function RemoveMarkedCells() {
	let Size = document.querySelector(".field").childNodes.length;
	for (let row = 0; row < Size; row++) {
		for (let column = 0; column < Size; column++) {
			if (document.querySelector(".field").childNodes[row].childNodes[column].firstChild) {
				document.querySelector(".field").childNodes[row].childNodes[column].firstChild.remove();
				document.querySelector(".field").childNodes[row].childNodes[column].classList.toggle("win", false);
				document.querySelector(".field").childNodes[row].childNodes[column].classList.toggle("horizontal", false);
				document.querySelector(".field").childNodes[row].childNodes[column].classList.toggle("vertical", false);
				document.querySelector(".field").childNodes[row].childNodes[column].classList.toggle("diagonal-right", false);
				document.querySelector(".field").childNodes[row].childNodes[column].classList.toggle("diagonal-left", false);
			}
		}
	}
}

function Recover() {
	let Size = document.querySelector(".field").childNodes.length;
	let information = JSON.parse(this.localStorage.getItem("data"));
	step = information.Step;
	counter = information.Counter;
	history = information.History;
	canMove = information.CanMove;
	if (information.UndoButton !== document.querySelector(".undo-btn").disabled) {
		document.querySelector(".undo-btn").disabled = !document.querySelector(".undo-btn").disabled;
	}
	if (information.RedoButton !== document.querySelector(".redo-btn").disabled) {
		document.querySelector(".redo-btn").disabled = !document.querySelector(".redo-btn").disabled;
	}
	if (information.State !== document.querySelector(".won-title").classList.contains("hidden")) {
		document.querySelector(".won-title").classList.toggle("hidden");
	}
	document.querySelector(".won-message").textContent = information.WinMessage;
	for (let row = 0; row < Size; row++) {
		for (let column = 0; column < Size; column++) {
			if (information.Cells[row][column] === 0) {
				if (document.querySelector(".field").childNodes[row].childNodes[column].firstChild) {
					RemoveMarkedCells();
				}
			} else {
				if (!document.querySelector(".field").childNodes[row].childNodes[column].firstChild) {
					let cell = document.createElement("div");
					cell.className = information.Cells[row][column];
					document.querySelector(".field").childNodes[row].childNodes[column].appendChild(cell);
				}
			}
		}
	}
	Check();
}

window.addEventListener("storage", function() {
	Recover();
});
window.addEventListener("click", function() {
	let cells = [];
	let Size = document.querySelector(".field").childNodes.length;
	for (let row = 0; row < Size; row++) {
		cells.push([]);
		for (let column = 0; column < Size; column++) {
			if (document.querySelector(".field").childNodes[row].childNodes[column].firstChild) {
				if (document.querySelector(".field").childNodes[row].childNodes[column].firstChild.className === "ch") {
					cells[row].push("ch");
				} else {
					cells[row].push("r");
				}
			} else {
				cells[row].push(0);
			}
		}
	}

	let inform = {
		Step: step,
		Counter: counter,
		History: history,
		CanMove: canMove,
		UndoButton: document.querySelector(".undo-btn").disabled,
		RedoButton: document.querySelector(".redo-btn").disabled,
		State: document.querySelector(".won-title").classList.contains("hidden"),
		WinMessage: document.querySelector(".won-message").textContent,
		Cells: cells
	};
	let StrInf = JSON.stringify(inform);
	this.localStorage.setItem("data", StrInf);
});
