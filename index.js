// Dom elements
const main = document.getElementById("main");
const doors = document.getElementsByClassName("door");
const btnshow = document.getElementById("btn-show");
const btnswitch = document.getElementById("btn-switch");
const btns = document.getElementById("grid");
const btnplay = document.getElementById("play");
let btnyes;
let btnno;

// Variables
let cont = 0;
const opcionespuertasnumeros = ["1", "2", "3"];
let doorchoosed = [];
let doorprize = [];
let doorgoats = [];

//numero aleatorio del 0 al 2
// Math.random() returns a Number between 0 (inclusive) and 1 (exclusive). So we have an interval like this: 1 -> Tamaño img
// const numRandom = (size) => {
//   return Math.floor(Math.random() * size);
// };
const aleatorio = () => {
  //doorchoosed=[];
  let randxdos = Math.random() * 3 + 1;
  //console.log(randxdos);
  let num = Math.floor(randxdos);
  console.log({ num });
  doorprize.push(num);
  console.log("doorprize");
  console.log(doorprize);
  return num;
};

// ... para parametros indeterminados
const drawgoats = () => {
  console.log("opcionespuertasnumeros");
  console.log(opcionespuertasnumeros);
  let goatfoto = document.createElement("img");
  goatfoto.setAttribute("src", "./img/goat.png");
  goatfoto.setAttribute("id", "goat");
  console.log("opcionespuertasnumeros");
  console.log(opcionespuertasnumeros);
  // ramdom para elegir posicion [0] o [1] del array para pintar cabra aleatoriamenete en una de las dos puertas porque no contienen prize
  let goat_a = opcionespuertasnumeros[0];
  indexa = goat_a - 1;
  console.log({ goat_a });
  console.log({ indexa });
  if (opcionespuertasnumeros.length > 1) {
    let goat_b = opcionespuertasnumeros[1];
    console.log(goat_a + "- goats opciones -" + goat_b);
  }
  console.log(goat_a + "--");
  //doors[a].appendChild(goatfoto);
  doors[indexa].innerHTML = `<img src=./img/goat.png>`;
  doors[indexa].classList.add("open");
};

const drawcar = (doornumber) => {
  let indexdoornumber = doornumber - 1;
  doors[indexdoornumber].classList.add("open");
  doors[indexdoornumber].innerHTML = `<img id='carprize' src=./img/car.png>`;
  const carimg = document.getElementById("carprize");
  carimg.style.visibility = "visible";
};

// Show the car prize
const showcar = () => {
  if (cont > 0) {
    return;
  } else {
    if (doorchoosed.length <= 0) {
      console.log("selecciona una puerta");
      document.getElementById(
        "tit"
      ).innerHTML = `<h1>Please, you must choose a door</h1>`;
    } else {
      if (doorchoosed[0] == doorprize[0]) {
        drawcar(doorprize[0]);
        //console.log("seleccion ganadora");
        cont++;
        console.log({ cont });
      } else {
        //console.log("seleccion no ganadora");
        drawcar(doorprize[0]);
      }
    }
  }
};

// Register event with the the id of the door selected
const selectdoor = (e) => {
  seleccion = e.target.id;
  console.log({ seleccion });
  let puertaselcionada = document.getElementById(seleccion);
  puertaselcionada.classList.add("doorselec");
  btnswitch.style.visibility = "visible";
  // si array vaciando
  if (doorchoosed.length <= 0) {
    doorchoosed.push(seleccion);
    //console.log(doorchoosed[0]); // puerta selecciona añadida a la array en la primera posicion
    //puertas no seleccionadas
    let indice = opcionespuertasnumeros.indexOf(seleccion);
    //console.log({ indice });
    let indxoption = opcionespuertasnumeros.find(
      (element) => element === indice
    );
    console.log(indxoption);
    opcionespuertasnumeros.splice(indice, 1);
    console.log("opcionespuertasnumeros door changes");
    console.log(opcionespuertasnumeros);
    document.getElementById(
      "tit"
    ).innerHTML = `<h1>Select ${doorchoosed}. Open one door</h1>`;
  } else {
    alldoors = document.getElementsByClassName("door");
    console.log(alldoors);
    for (let item of alldoors) {
      console.log(item.id);
      item.classList.remove("doorselec");
    }
    //puertaselcionada.classList.add('door');
    doorchoosed.pop();
    console.log("pop remove");
    puertaselcionada.classList.add("doorselec");
    doorchoosed.push(seleccion);
    console.log(doorchoosed);
    document.getElementById(
      "tit"
    ).innerHTML = `<h1>Do you want checked door: ${doorchoosed}</h1>`;
  }
};

const manteinselection = () => {
  // quitar lisener
  btnswitch.removeEventListener("click", manteinselection);
  // eleminar visibility grid o btn
  console.log("mantein selection");
  // checked to see if he wants o lost
  let doorsel = doorchoosed[0];
  let doorwin = doorprize[0];
  win(doorsel, doorwin);
};

const changeselection = () => {
  console.log("mantein selection");
  // quitar lisener
  btnswitch.removeEventListener("click", manteinselection);
  // eleminar visibility grid o btn
  // si seleccion doorselecion == prize y cambias entonce lost,
  if (doorchoosed[0] == doorprize[0]) {
    console.log("lost");
    document.getElementById("tit").innerHTML = `<h1>Sorry you Lost</h1>`;
    showcar();
    btns.remove();
    btnplay.innerHTML = `<button id='replay'>PLAY AGAIN</button>`;
    document.getElementById("replay").addEventListener("click", start);
    document.getElementById("replay").style.visibility = "visible";
    //drawcar(doorprize[0]);
  } else {
    //eles{resto codigo}
    // check not necessary because only it was maintained closed door with the prize
    let changedoorsel = doorprize[0];
    let doorwin = doorprize[0];
    win(changedoorsel, doorwin);
    drawcar(doorprize[0]);
  }
};

const openOnedoor = () => {
  console.log("open door");
  console.log("seleción : ", doorchoosed[0]);
  console.log(typeof doorchoosed[0]);
  console.log("coche: ", doorprize[0]);
  console.log(typeof doorprize[0]);
  console.log("puertas no seleciondas");
  console.log(opcionespuertasnumeros);
  btnswitch.removeEventListener("click", openOnedoor);
  btnswitch.style.visibility = "hidden";
  console.log("puertas no selecionadas : " + opcionespuertasnumeros);
  opcionespuertasnumeros.filter((items, index) => {
    console.log({ items });
    if (items == doorprize[0]) {
      console.log("item === doorprize");
      console.log(index);
      opcionespuertasnumeros.splice(index, 1);
      console.log({ opcionespuertasnumeros });
    }
    let item = Number(items);
    console.log(doorprize[0]);
    if (item !== doorprize[0]) {
      console.log("Añadimos a goat las puertas q no contienen prize");
      console.log(item);
      return item;
    }
  });
  drawgoats();
  document.getElementById(
    "tit"
  ).innerHTML = `<h1>Do you want to switch your door?</h1>`;
  //const btns = document.getElementById("grid");
  btns.style.visibility = "visible";
  console.log(typeof btnyes);
  if (btnyes && btnno !== undefined) {
    console.log('inside if')
    btnyes.remove();
    btnno.remove();
  }
  btnyes = document.createElement("button");
  console.log(typeof btnyes);
  btnyes.classList.add("btn-yes");
  btnyes.textContent = "YES";
  btns.appendChild(btnyes);
  btnyes.addEventListener("click", changeselection);
  btnno = document.createElement("button");
  btnno.classList.add("btn-no");
  btnno.textContent = "NO";
  btns.appendChild(btnno);
  btnno.addEventListener("click", manteinselection);

  // Loop through the elements of the doors class by removing an event that active selection door
  for (let i = 0; i < doors.length; i++) {
    doors[i].setAttribute("door-id", i);
    //console.log(doors[i]);
    //doors[i].innerHTML=`<div id="frame">`;
    doors[i].removeEventListener("click", selectdoor);
  }
};

// Check for a match
const win = (selectdoor, prizedoor) => {
  console.log(selectdoor);
  if (selectdoor == prizedoor) {
    console.log("YOU WIN, CONGRATULATIONS");
    document.getElementById(
      "tit"
    ).innerHTML = `<h1>YOU WIN, CONGRATULATIONS</h1>`;
    btnplay.innerHTML = `<button id='replay'>PLAY AGAIN</button>`;
    document.getElementById("replay").addEventListener("click", start);
    showcar();
  } else {
    document.getElementById("tit").innerHTML = `<h1>Sorry, YOU LOST</h1>`;
    btnplay.innerHTML = `<button id='replay'>PLAY AGAIN</button>`;
    document.getElementById("replay").addEventListener("click", start);
    showcar();
  }
  btns.style.visibility = "hidden";
  //start();
};

const start = () => {
  document.getElementById("replay").style.visibility = "hidden";
  console.log("start");
  // Start to define radom number between 0 and 2 that which will be the prize position
  aleatorio();
  // Loop through the elements of the doors class by adding an event that active selection door
  for (let i = 0; i < doors.length; i++) {
    //doors[i].remove("img");
    parent = doors[i];
    parent.innerHTML = "";
    doors[i].classList.remove("open");
    doors[i].classList.remove("doorselec");
    doors[i].addEventListener("click", selectdoor);
    //document.getElementById("replay").style.visibility = "hidden";
    btnswitch.addEventListener("click", openOnedoor);
    // To remove a specified element when knowing its parent node:
    // let d = document.getElementById("top");
    // let d_nested = document.getElementById("nested");
    // let throwawayNode = d.removeChild(d_nested);
  }
  // Added event to buttons
  //btnswitch.style.visibility= "visible";
  //btnswitch.addEventListener("click", openOnedoor);
  //btnshow.addEventListener("click", showcar);
};

// Start to define radom number between 0 and 2 that which will be the prize position
aleatorio();
// Loop through the elements of the doors class by adding an event that active selection door
for (let i = 0; i < doors.length; i++) {
  doors[i].setAttribute("door-id", i);
  //console.log(doors[i]);
  //doors[i].innerHTML=`<div id="frame">`;
  doors[i].addEventListener("click", selectdoor);
}
// Added event to buttons
btnswitch.addEventListener("click", openOnedoor);
//btnshow.addEventListener("click", showcar);

// https://es.stackoverflow.com/questions/216169/recorrer-elementos-html-con-la-misma-clase-con-javascript
// function asignar(){
//   var asientos = [];
//   for(i=0;i<doors.length;i++)
//       if(doors[i].checked)
//           asientos.push(doors[i].value);
//   //divAsientos.innerHTML = "<b>Tus asientos:</b> "+asientos.join(',');
//   console.log(asientos)
// }
