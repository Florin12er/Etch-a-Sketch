const elements = {
  Black: document.getElementById("Black"),
  Rainbow: document.getElementById("Rainbow"),
  Clear: document.getElementById("Clear"),
  Eraser: document.getElementById("Eraser"),
  ChangeSize: document.getElementById("Change"),
  Div: document.querySelector(".Div"),
};

let size = localStorage.getItem("gridSize") || 32;
let lastColor = localStorage.getItem("lastColor") || "#000";

createGrid(size);
setColor(lastColor);

function createDiv(gridSize) {
  const color = document.createElement("div");
  color.classList.add("color");
  color.style.width = `${elements.Div.clientWidth / gridSize}px`;
  color.style.height = `${elements.Div.clientHeight / gridSize}px`;

  return color;
}

function createGrid(gridSize) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < gridSize * gridSize; i++) {
    fragment.appendChild(createDiv(gridSize));
  }

  elements.Div.appendChild(fragment);
}

function setColor(color) {
  elements.Div.addEventListener("mouseover", function (e) {
    if (e.target.matches(".color")) {
      e.target.style.backgroundColor = color;
    }
  });
}

function colorRainbow() {
  elements.Div.addEventListener("mouseover", function (e) {
    if (e.target.matches(".color")) {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      e.target.style.backgroundColor = "#" + randomColor;
    }
  });
}

function clearDiv() {
  elements.Div.innerHTML = "";
  createGrid(size);
}

function eraseColor() {
  elements.Div.addEventListener("mouseover", function (e) {
    if (e.target.matches(".color")) {
      e.target.style.backgroundColor = "#fff";
    }
  });
}

function changeSize(gridSize) {
  do {
    gridSize = prompt("Enter a value (maximum 100):");
    if (gridSize === null) {
      return;
    }
    gridSize = Number(gridSize);
    if (!isNaN(gridSize) && gridSize > 0 && gridSize <= 100) {
      size = gridSize;
      localStorage.setItem("gridSize", size);
      elements.Div.innerHTML = "";
      createGrid(size);
      return;
    } else {
      alert("Please enter a valid numeric value between 1 and 100.");
    }
  } while (true);
}
function colorBlack() {
  elements.Div.addEventListener("mouseover", function (e) {
    if (e.target.matches(".color")) {
      e.target.style.backgroundColor = "#000";
    }
  });
}
elements.Black.addEventListener("click", function () {
  colorBlack();
  localStorage.setItem("lastColor", "black");
});
elements.Rainbow.addEventListener("click", function () {
  colorRainbow();
  localStorage.setItem("lastColor", "rainbow");
});

elements.Clear.addEventListener("click", clearDiv);
elements.Eraser.addEventListener("click", function () {
  eraseColor();
  localStorage.setItem("lastColor", "eraser");
});

elements.ChangeSize.addEventListener("click", changeSize);

const storedColor = localStorage.getItem("lastColor");

if (storedColor === "black") {
  colorBlack();
} else if (storedColor === "rainbow") {
  colorRainbow();
} else if (storedColor === "eraser") {
  eraseColor();
} else {
  colorBlack();
}
