// Dom elements
const main = document.getElementById("main");
const doors = document.getElementsByClassName("door");
const btnshow = document.getElementById("btn-show");
const btnswitch = document.getElementById("btn-switch");
const grid = document.querySelector(".grid");

// Variables
let cont = 0;
const options = ["1", "2", "3"];
let doorchoosed = [];
let doorprize = [];
let doorgoats = [];

//numero aleatorio del 0 al 2
// Math.random() returns a Number between 0 (inclusive) and 1 (exclusive). So we have an interval like this: 1 -> Tamaño img
// const numRandom = (size) => {
//   return Math.floor(Math.random() * size);
// };
const aleatorio = () => {
  let randxdos = Math.random() * 3 + 1;
  //console.log(randxdos);
  let num = Math.floor(randxdos);
  console.log({ num });
  doorprize.push(num);
  console.log("doorprize");
  console.log(doorprize[0]);
  return num;
};

// ... para parametros indeterminados
const drawgoats = (items) => {
  console.log("puertas con goat");
  console.log(items);
  console.log("options");
  console.log(options);
  let goatfoto = document.createElement("img");
  goatfoto.setAttribute("src", "./img/goat.png");
  goatfoto.setAttribute("id", "goat");
  console.log("options");
  console.log(options);
  let a = options[0];
  let b = options[1];
  console.log(a + "--" + b);
  //doors[a].appendChild(goatfoto);
  doors[a].innerHTML = `<img id='carprize' src=./img/goat.png>`;
  doors[a].classList.add("open");
  // elimnar class frame
  // recorrer todos los elementos frame y eliminar los del div del goat
  let idframe = document.getElementById("goat");
  console.log(idframe);
  //idframe.visibility = "hidden";
  let frame = document.getElementsByClassName("frame");
  console.log(frame);
  //}
};

const drawcar = (doornumber) => {
  //doorprize.push(doornumber);
  //console.log(doorprize);
  let indexdoornumber = doornumber - 1;
  doors[indexdoornumber].classList.add("open");
  doors[indexdoornumber].innerHTML = `<img id='carprize' src=./img/car.png>`;
  const carimg = document.getElementById("carprize");
  carimg.style.visibility = "visible";
};

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
      //let numdrawale = aleatorio();
      //console.log({ numdrawale });
      if (doorchoosed[0] == doorprize[0]) {
        drawcar(doorprize[0]);
        cont++;
        console.log({ cont });
      } else {
        console.log("seleccion no ganadora");
        drawcar(doorprize[0]);
      }
    }
  }
};

const selectdoor = (e) => {
  seleccion = e.target.id;
  console.log({ seleccion });
  let puertaselcionada = document.getElementById(seleccion);
  //console.log(puertaselcionada);
  puertaselcionada.classList.add("doorselec");
  // si array vaciando
  if (doorchoosed.length <= 0) {
    doorchoosed.push(seleccion);
    console.log(doorchoosed[0]);
    //puertas no seleccionadas
    let indice = options.indexOf(seleccion);
    console.log({ indice });
    let indxoption = options.find((element) => element === seleccion);
    console.log(indxoption);
    options.splice(indice, 1);
    console.log("options door changes");
    console.log(options);
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
  console.log("change selection");
};

// bug al ejecutar opendoor abre la puerta seleccionada cuando debe abrir la no seleciona
// si la seleccion es una de las dos opciones de puertas disponibles

const openOnedoor = () => {
  console.log("open door");
  console.log("seleción : ", doorchoosed[0]);
  console.log(typeof doorchoosed[0]);
  console.log("coche: ",doorprize[0]);
  console.log(typeof doorprize[0]);
  console.log("optiones no seleciondas");
  console.log(options);
  /*
  const twodoors = 
   */
  btnswitch.removeEventListener("click", openOnedoor);
  console.log("puertas no selecionadas : " + options);
  // si options contiene las misma puerta q prize abrimos la otra
  let goat = options.filter((items) => {
    let item = Number(items);
    console.log(items);
    console.log(item);
    console.log(doorprize[0]);
    if (item !== doorprize[0]) {
      console.log("Añadimos a goat las puertas q no contienen prize");
      console.log(item);
      return item;
    }
  });
  console.log("goat");
  console.log(goat); //false
  // busca cual de las dos puertas no selecionadas es una goat y
  // y pasa por parametro a drawgoats. Si son las dos goats haz random y pasa una de ellas
  drawgoats(goat);
  //btnyes.addEventListener("click", drawgoats);
  console.log(
    "de las dos, abrimos la q contenga una cabra si en la otra está el premio"
  );
  console.log(
    "si las dos son cabras, seleccion y premio son la misma puerta, abrimos random una de las dos"
  );
  console.log("mostramos la cabra");
  console.log("¿Switch de door?");
  document.getElementById(
    "tit"
  ).innerHTML = `<h1>Do you want to switch your door?</h1>`;
  const btns = document.getElementById("grid");
  const btnyes = document.createElement("button");
  btnyes.classList.add("btn-yes");
  btnyes.textContent = "YES";
  btns.appendChild(btnyes);
  btnyes.addEventListener("click", changeselection);
  const btnno = document.createElement("button");
  btnno.classList.add("btn-no");
  btnno.textContent = "NO";
  btns.appendChild(btnno);
  btnno.addEventListener("click", manteinselection);
};

const win = (selectdoor, prizedoor) => {
  if (selectdoor == prizedoor) {
    console.log("YOU WIN, CONGRATULATIONS");
    document.getElementById(
      "tit"
    ).innerHTML = `<h1>YOU WIN, CONGRATULATIONS</h1>`;
    showcar();
  } else {
    console.log(
      "Sorry, YOU LOST, ",
      selectdoor + "is diferent than " + prizedoor
    );
    document.getElementById("tit").innerHTML = `<h1>Sorry, YOU LOST</h1>`;
    showcar();
  }
};

// Start to define prize position
aleatorio();

// Events
for (let i = 0; i < doors.length; i++) {
  doors[i].setAttribute("door-id", i);
  //console.log(doors[i]);
  doors[i].addEventListener("click", selectdoor);
}

btnswitch.addEventListener("click", openOnedoor);
btnshow.addEventListener("click", showcar);

// https://es.stackoverflow.com/questions/216169/recorrer-elementos-html-con-la-misma-clase-con-javascript
// function asignar(){
//   var asientos = [];
//   for(i=0;i<doors.length;i++)
//       if(doors[i].checked)
//           asientos.push(doors[i].value);
//   //divAsientos.innerHTML = "<b>Tus asientos:</b> "+asientos.join(',');
//   console.log(asientos)
// }
