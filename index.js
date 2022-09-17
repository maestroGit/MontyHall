// Dom elements
const main = document.getElementById("main");
const doors = document.getElementsByClassName("door");
const btnshow = document.getElementById("btn-show");
const btnswitch = document.getElementById("btn-switch");
const grid = document.querySelector(".grid");
const btns = document.getElementById("grid");

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
  indexa = goat_a-1;
  console.log({goat_a})
  console.log({indexa});

  if(opcionespuertasnumeros.length > 1){
    let goat_b = opcionespuertasnumeros[1];
    console.log(goat_a + "- goats opciones -" + goat_b);
  }
  console.log(goat_a + "--");
  //doors[a].appendChild(goatfoto);
  doors[indexa].innerHTML = `<img src=./img/goat.png>`;
  doors[indexa].classList.add("open");
  // elimnar class frame
  // recorrer todos los elementos frame y eliminar los del div del goat
  // let idframe = document.getElementById("goat");
  // console.log(idframe);
  // //idframe.visibility = "hidden";
  // let frame = document.getElementsByClassName("frame");
  // console.log(frame);
  //}
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
  puertaselcionada.classList.add("doorselec");
  btnswitch.style.visibility= "visible";
  // si array vaciando
  if (doorchoosed.length <= 0) {
    doorchoosed.push(seleccion);
    console.log(doorchoosed[0]);// puerta selecciona añadida a la array en la primera posicion
    //puertas no seleccionadas
    let indice = opcionespuertasnumeros.indexOf(seleccion);
    console.log({ indice });
    let indxoption = opcionespuertasnumeros.find((element) => element === indice);
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
  if(doorchoosed[0] == doorprize[0]){
    console.log("lost");
    document.getElementById("tit").innerHTML= `<h1>Sorry you Lost</h1>`;
    showcar();
    btns.remove();

    //drawcar(doorprize[0]);
  }else{
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
  console.log("coche: ",doorprize[0]);
  console.log(typeof doorprize[0]);
  console.log("puertas no seleciondas");
  console.log(opcionespuertasnumeros);
  btnswitch.removeEventListener("click", openOnedoor);
  btnswitch.style.visibility= "hidden";
  console.log("puertas no selecionadas : " + opcionespuertasnumeros);
  // Tengo las opciones no seleccionas en opcionespuertasnumeros
  // si opcionespuertasnumeros contiene el mismo valor de puerta que prize,
  // lo eliminamos del aray opcionespuertasnumeros quedando solo el valor de la puerta q hay q abrir
  //  si no lo contiene abrimos uno u otro de manera aleatoria
  opcionespuertasnumeros.filter((items, index) => {
    console.log({items});
    if (items == doorprize[0]){
      console.log('item === doorprize')
      console.log(index);
      opcionespuertasnumeros.splice(index, 1);
      console.log({opcionespuertasnumeros})
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
    showcar();
  } else {
    console.log(
      "Sorry, YOU LOST, ",
      selectdoor + "is diferent than " + prizedoor
    );
    // I could show the goat  
    document.getElementById("tit").innerHTML = `<h1>Sorry, YOU LOST</h1>`;
    showcar();
  }
  btns.remove();
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

