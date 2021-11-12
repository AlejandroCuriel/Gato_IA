var mapa = [0, 0, 0, 0, 0, 0, 0, 0, 0,];
var jugador = 1;
var colors = ["#8b5642", "#6a696b"];
let usados = [];
const spanX = document.getElementById('x')
const spanO = document.getElementById('o')
const spanE = document.getElementById('e')
const textGanador = document.getElementById('ganador')

let [notification] = document.getElementsByClassName('notificacion')
let contX = 0;
let contO = 0;
let contE = 0;
let bandera = true;

function celda(celda){

   if(bandera == true){
      start();
   }
   bandera = false;
   if(notification.classList.contains("showWinner")) {
      notification.classList.remove("showWinner")
   }

   if (mapa[celda]==0) {
      if (jugador==1){
         mapa[celda]=1;
         jugador=2;
      } else {
         mapa[celda]=2;
         jugador=1; 
         }
   } else {
      window.alert("No puedes pulsar sobre una celda marcada");
   }
   dibujar();
   var r = ganador();
   switch(r){
      case 0:
         break;
      case 1:
         ++contX;
         spanX.textContent = contX
         showWinner("X")
         textGanador.textContent = '¡Ganó la equis!'
         limpiar()
         break;
      case 2:
         showWinner("O")
         ++contO
         spanO.textContent = contO
         textGanador.textContent = '¡Ganó el circulo!'

         limpiar()
         break;
      case 3:
         showWinner("Empate")
         ++contE;
         spanE.textContent = contE
         textGanador.textContent = '¡Empate!'

         limpiar()
         break; 
   }
}

function limpiar() {
   usados = [];
   for (let index = 0; index < mapa.length; index++) {
      mapa[index] = 0;
   }
   dibujar();
}

function reiniciar() {
   location.reload();
}


function sleepNow () { 
   return new Promise((resolve) => setTimeout(resolve,1000))
}

async function automatico() {

   start();
   do {
      aleatorio = Math.round(Math.random()*8);
      console.log("Jugador: " + jugador)
      if(usados.length === 0) {
         mapa[aleatorio] = 1;
         usados.push(aleatorio);
         jugador=2;

      }else if(usados.length < 9) {
         if(notification.classList.contains("showWinner")) {
            notification.classList.remove("showWinner")
         }
         if(!usados.includes(aleatorio)){
            if (jugador==1){
               mapa[aleatorio] = 1;
               usados.push(aleatorio);
               jugador=2;

            } else {
               mapa[aleatorio] = 2;
               usados.push(aleatorio);
               jugador=1; 
               }

         }else {
            usados.push(mapa.indexOf(0));
            if(jugador == 1){
               mapa[mapa.indexOf(0)] = 1;
               jugador = 2;
            }else {
               jugador = 1;
               mapa[mapa.indexOf(0)] = 2;
            }
         }
      }
      dibujar();
      await sleepNow();
      var r = ganador();
      switch(r){
         case 0:
            break;
         case 1:
            ++contX;
            spanX.textContent = contX
            showWinner("X")
            textGanador.textContent = '¡Ganó la equis!'
            limpiar()
            break;
         case 2:
            showWinner("O")
            ++contO
            spanO.textContent = contO
            textGanador.textContent = '¡Ganó el circulo!'
   
            limpiar()
            break;
         case 3:
            showWinner("Empate")
            ++contE;
            spanE.textContent = contE
            textGanador.textContent = '¡Empate!'
   
            limpiar()
            break; 
      }
      console.log(usados.length)
   } while (usados.length < 9);
}

function showWinner(name) {
   notification.classList.add("showWinner")
}

function dibujar(){
   for(i=0; i<9; i++){
   if(mapa[i] == 0) document.getElementById("c"+i).className="vacio";
   if(mapa[i] == 1) document.getElementById("c"+i).className="equis";
   if(mapa[i] == 2) document.getElementById("c"+i).className="circulo"; 
   }
}

function ganar() {
   
}

function ganador(){
   var numEspacios=0;
   for(i=0; i<9; i++){
      if(mapa[i] == 0) numEspacios++;
   }
   // Las líneas horizontales
   if(mapa[0] == mapa[1] && mapa[1] == mapa[2] && mapa[0] !=0) return mapa[0];
   if(mapa[3] == mapa[4] && mapa[4] == mapa[5] && mapa[3] !=0) return mapa[3];
   if(mapa[6] == mapa[7] && mapa[7] == mapa[8] && mapa[6] !=0) return mapa[6];
   //Las líneas verticales
   if(mapa[0] == mapa[3] && mapa[3] == mapa[6] && mapa[0] !=0) return mapa[0];
   if(mapa[1] == mapa[4] && mapa[4] == mapa[7] && mapa[1] !=0) return mapa[1];
   if(mapa[2] == mapa[5] && mapa[5] == mapa[8] && mapa[2] !=0) return mapa[2];
   //Las diagonales
   if(mapa[0] == mapa[4] && mapa[4] == mapa[8] && mapa[0] !=0) return mapa[0];
   if(mapa[2] == mapa[4] && mapa[4] == mapa[6] && mapa[2] !=0) return mapa[2];

   if (numEspacios > 0){
      return 0;
   } else {
      return 3;
   }
}

const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');

let stopwatchInterval;
let runningTime = 0;

window.onload = () => {
   
   m = 0;
   s = 0;
   mls = 0;
   timeStarted = 0;
   time = document.getElementById("time");
   btnStart = document.getElementById("btn-start");
   btnStop = document.getElementById("btn-stop");
   btnReset = document.getElementById("btn-reset");
   btnStart.addEventListener("click", start);
   btnStop.addEventListener("click", stop);
   btnReset.addEventListener("click", reset);
};

function write() {
   let ht, mt, st, mlst;
   mls++;

   if (mls > 99) {
      s++;
      mls = 0;
   }
   if (s > 59) {
      m++;
      s = 0;
   }
   if (m > 59) {
      h++;
      m = 0;
   }
   

   mlst = ('0' + mls).slice(-2);
   st = ('0' + s).slice(-2);
   mt = ('0' + m).slice(-2);
   

   time.innerHTML = `${mt}:${st}.${mlst}`;
}

function start() {
   write();
   timeStarted = setInterval(write, 10);
}

function stop() {
   clearInterval(timeStarted);
}
function punto(){
   
}

function frame() {
  confetti({
    particleCount: 2,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors,
  });
  confetti({
    particleCount: 2,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors,
  });

  if (Date.now() < Date.now() + 15000) {
    requestAnimationFrame(frame);
  }
}

window.onload = frame();
