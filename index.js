// Dom elements
const main = document.getElementById("main");
const doors = document.getElementsByClassName("door");
const btnshow = document.getElementById("btn-show");
const btnswitch = document.getElementById("btn-switch");
const grid = document.querySelector(".grid");

// Variables
let cont = 0;
const puertasnumeros = ["1", "2", "3"];
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
  console.log(doorprize[0]);
  return num;
};

// ... para parametros indeterminados
const drawgoats = () => {
  console.log("puertas con goat");
  console.log("puertasnumeros");
  console.log(puertasnumeros);
  let goatfoto = document.createElement("img");
  goatfoto.setAttribute("src", "./img/goat.png");
  goatfoto.setAttribute("id", "goat");
  console.log("puertasnumeros");
  console.log(puertasnumeros);
  let a = puertasnumeros[0];
  indexa = a-1;
  console.log({a})
  console.log({indexa});

  if(puertasnumeros.length > 1){
    let b = puertasnumeros[1];
    console.log(a + "--" + b);
  }
  console.log(a + "--");
  //doors[a].appendChild(goatfoto);
  doors[indexa].innerHTML = `<img src=./img/goat.png>`;
  doors[indexa].classList.add("open");
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
      //let numdrawale = aleatorio();
      //console.log({ numdrawale });
      if (doorchoosed[0] == doorprize[0]) {
        drawcar(doorprize[0]);
        console.log("seleccion ganadora");
        cont++;
        console.log({ cont });
      } else {
        console.log("seleccion no ganadora");
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
  //console.log(puertaselcionada);
  puertaselcionada.classList.add("doorselec");
  btnswitch.style.visibility= "visible";

  // visulaizar boton open door en este momento
  // añadir visualizar 
  
  // si array vaciando
  if (doorchoosed.length <= 0) {
    doorchoosed.push(seleccion);
    console.log(doorchoosed[0]);// puerta selecciona añadida a la array en la primera posicion
    //puertas no seleccionadas
    let indice = puertasnumeros.indexOf(seleccion);
    console.log({ indice });
    let indxoption = puertasnumeros.find((element) => element === indice);
    console.log(indxoption);
    puertasnumeros.splice(indice, 1);
    console.log("puertasnumeros door changes");
    console.log(puertasnumeros);
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
  //check win
  win();
  // console.log("Sorry You Lost selection");
  // document.getElementById(
  //   "tit"
  // ).innerHTML = `<h1>YOU LOST, I AM SORRY/h1>`;
  drawcar(doorprize[0]);
};

// bug al ejecutar opendoor abre la puerta seleccionada cuando debe abrir la no seleciona
// si la seleccion es una de las dos opciones de puertas disponibles

const openOnedoor = () => {
  console.log("open door");
  console.log("seleción : ", doorchoosed[0]);
  console.log(typeof doorchoosed[0]);
  console.log("coche: ",doorprize[0]);
  console.log(typeof doorprize[0]);
  console.log("puertas no seleciondas");
  console.log(puertasnumeros);
  /*
  const twodoors = 
   */
  btnswitch.removeEventListener("click", openOnedoor);
  btnswitch.style.visibility= "hidden";
  console.log("puertas no selecionadas : " + puertasnumeros);
  // Tengo las opciones no seleccionas en puertasnumeros
  // si puertasnumeros contiene el mismo valor de puerta que prize,
  // lo eliminamos del aray puertasnumeros quedando solo el valor de la puerta q hay q abrir
  //  si no lo contiene abrimos uno u otro de manera aleatoria

  puertasnumeros.filter((items, index) => {
    console.log({items});
    if (items == doorprize[0]){
      console.log('item === doorprize')
      console.log(index);
      puertasnumeros.splice(index, 1);
      console.log({puertasnumeros})
    };
    let item = Number(items);
    console.log(doorprize[0]);
    if (item !== doorprize[0]) {
      console.log("Añadimos a goat las puertas q no contienen prize");
      console.log(item);
      return item;
    }
  });
  
  // busca cual de las dos puertas no selecionadas es una goat y
  // y pasa por parametro a drawgoats. Si son las dos goats haz random y pasa una de ellas
  drawgoats();
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

// Check for a match
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

// Start to define radom number between 0 and 2 that which will be the prize position
aleatorio();

// Loop through the elements of the doors class by adding an event that active selection door
for (let i = 0; i < doors.length; i++) {
  doors[i].setAttribute("door-id", i);
  //console.log(doors[i]);
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
