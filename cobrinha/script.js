const canvas = document.getElementById("jogo");
const ctx = canvas.getContext("2d");
const T = 20;   
const N = 20;   

let cobra = [{ x: 10, y: 10 }];
let dx = 1, dy = 0;            
let comida = { x: 5, y: 5 };
let pontos = 0;

document.addEventListener("keydown", e => {
  if (e.key == "ArrowUp"    && dy != 1)  { dx = 0;  dy = -1; }
  if (e.key == "ArrowDown"  && dy != -1) { dx = 0;  dy = 1; }
  if (e.key == "ArrowLeft"  && dx != 1)  { dx = -1; dy = 0; }
  if (e.key == "ArrowRight" && dx != -1) { dx = 1;  dy = 0; }
});

function jogar() {
  let cabeca = { x: (cobra[0].x + dx + N) % N, y: (cobra[0].y + dy + N) % N };

  // bateu no próprio rabo
  if (cobra.some(p => p.x == cabeca.x && p.y == cabeca.y)) {
    clearInterval(timer);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("GAMEOVER - Pontos: " + pontos, 40, 200);
    return;
  }

  cobra.unshift(cabeca);          

  if (cabeca.x == comida.x && cabeca.y == comida.y) {
    pontos++;                    
    comida = { x: Math.floor(Math.random() * N), y: Math.floor(Math.random() * N) };
  } else {
    cobra.pop();                  
  }

  ctx.clearRect(0, 0, 400, 400);
  ctx.fillStyle = "red";
  ctx.fillRect(comida.x * T, comida.y * T, T, T);
  ctx.fillStyle = "blue";
  cobra.forEach(p => ctx.fillRect(p.x * T, p.y * T, T, T));
}

let timer = setInterval(jogar, 120);