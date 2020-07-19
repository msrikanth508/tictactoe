import "./styles.css";

var rows = 3;
var cols = 3;
var scoreboard = [];
var possibilities = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var turn;
var won;

document.querySelector(".restart-btn").addEventListener("click", start);
var appEle = document.getElementById("app");
var msgEle = document.querySelector(".message");

function start() {
  won = false;
  turn = 1;
  scoreboard = new Array(9).fill(null);
  if (appEle.children.length > 1) {
    appEle.removeChild(appEle.lastElementChild);
  }

  msgEle.classList.remove("show");
  var table = document.createElement("table");
  table.classList.add("table");
  var index = 0;

  for (let i = 0; i < rows; i++) {
    var row = document.createElement("tr");

    for (let j = 0; j < cols; j++) {
      var cell = document.createElement("td");
      cell.setAttribute("id", index);
      cell.addEventListener("click", function () {
        const cellId = parseInt(this.getAttribute("id"), 10);
        cellClicked(cellId);
      });
      row.append(cell);
      index++;
    }

    table.append(row);
  }

  appEle.append(table);
}

function cellClicked(cellId) {
  if (scoreboard[cellId] === null && !won) {
    if (cellId !== -1) {
      var cellEle = document.getElementById(cellId);
      // human
      if (turn === 1) {
        cellEle.innerText = "X";
        cellEle.classList.add("animated");
        scoreboard[cellId] = "X";
      } else {
        // robot
        document.getElementById(cellId).innerText = "O";
        scoreboard[cellId] = "O";
      }

      checkWinner();

      if (!won) {
        if (turn === 1) {
          turn = 0;
          robotPlay();
        } else {
          turn = 1;
        }
      }
    }
  }
}

function checkWinner() {
  var winner = turn === 1 ? "X" : "O";

  for (let arr of possibilities) {
    if (arr.every((cellId) => scoreboard[cellId] === winner)) {
      won = true;
      arr.forEach((cellId) => {
        document.getElementById(cellId).classList.add("highlight");
        msgEle.innerText = turn === 1 ? "you won!" : "You loose, try again!";
        msgEle.classList.add("show");
      });
      return;
    }
  }

  if (scoreboard.every((_) => _ !== null)) {
    msgEle.innerText = "Game over!";
    msgEle.classList.add("show");
    return;
  }
}

function robotPlay() {
  var freeCells = scoreboard.reduce((acc, item, index) => {
    if (item === null) {
      acc.push(index);
    }
    return acc;
  }, []);

  cellClicked(getRandomCell(freeCells));
}

function getRandomCell(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

start();
