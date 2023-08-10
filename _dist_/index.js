import { registerImage } from "./lazy.js";
import { incrementAdded, updateCount } from "./count.js";

const allImgContainer = document.querySelector("#images");
const buttonAddImg = document.querySelector(".buttonAdd");
const buttonRemoveAllImg = document.querySelector(".buttonRemoveAll");


//Detectamos el Click del Boton de Añadir imagen
buttonAddImg.addEventListener("click", addImagen);
//Detectamos el Click del Boton de borrar todas las imagenes
buttonRemoveAllImg.addEventListener("click", removeAllImg);

//Numero aleatorio entre 123 a 1 para hacer el llamado al src de la imagen
const numeroAleatorio = () => {
  const result = Math.floor(Math.random() * 123) + 1;
  return result;
};

//Creamos la estructura  html de card con imagenes
const createImageNode = async () => {
  const container = document.createElement("div");
  container.className = "contain-image";
  const span = document.createElement("span");
  const imagen = document.createElement("img");
  imagen.dataset.src =
    await `https://randomfox.ca/images/${numeroAleatorio()}.jpg`;

  container.append(span, imagen);
  allImgContainer.appendChild(container);

  //Usamos observe para agregar el src de la imagen si es visible
  registerImage(imagen);

  //Si la imagen Cargo La mostramos y quitamos el estado de carga del contenedor
  //quitando su backgroud y animacion
  imagen.onload = () => {
    imagen.style.opacity = "1";
    container.style.background = "none";
    container.style.animation = "none";
  };

  //borrar Nodo
  span.addEventListener("click", () => {
    allImgContainer.removeChild(container);
    updateCount(allImgContainer);
  });

  //Evento para el contenedor de la imagen para mostrar imagen en grande
  container.addEventListener("click", showBigImg);

  //
  span.addEventListener("mouseover", () => {
    container.classList.add("overlay");
  });

  span.addEventListener("mouseout", () => {
    container.classList.remove("overlay");
  });
};

//funcion asincrona que espera que agregue la imagen
async function addImagen() {
  await createImageNode();

  //obtengo la cantidad de imagenes pintada en el nodo

  const allImgAdd = allImgContainer.querySelectorAll(".contain-image").length;

  //Actualizo el objecto count en su propiedad cantidad
  //con la cantidad de imagenes pintada en el nodo
  incrementAdded(allImgAdd);
}

//Funcion que Borrar Todas la imagenes
function removeAllImg() {
  const allImgAdd = allImgContainer.querySelectorAll(".contain-image").length;

  //Actualizar a 0 la cantidad mostrada en html
  const nodeCountAdded = document.querySelector("#added");
  const nodeCountLoads = document.querySelector("#loads");

  if (allImgAdd > 0) {
    allImgContainer.innerHTML = "";
    nodeCountAdded.textContent = "0";
    nodeCountLoads.textContent = "0";
  } else {
    alert("Nada que Remover");
  }
}

//Funcion que muestra El Nodal de la imagen En Grande

function showBigImg(event) {
  //si hacemos click al Div donde esta contenida la imagen
  if (event.target.nodeName === "DIV") {
    //Obtenemos la Url de la imagen a mostrar
    const urlImg = event.target.querySelector("img").src;
    document.body.style.overflow = "hidden"; //*No scroll al abrir el nodal*
    // *estructura Html del nodal* =>
    const templateBigImg = `
   <div class="show-big-img">
     <figure>
       <span class="closeBigImg"></span>
       <img src="${urlImg}" alt="" id= "bigImg">
     </figure>
   </div>`;

    const modalContainer = document.createElement("div");
    modalContainer.innerHTML = templateBigImg;
    document.body.appendChild(modalContainer);
    //  <= **

    //Funcion que Cierra el Nodal
    const closeNodal = () => {
      document.body.removeChild(modalContainer);
      document.body.style.overflow = "";
    };

    //Escuchamos si la imagen del noda ya Cargo para hacerla  visible
    const bigImg = document.querySelector("#bigImg");
    bigImg.onload = () => {
      bigImg.style.opacity = "1";
    };

    const closeBigImg = modalContainer.querySelector(".closeBigImg");
    closeBigImg.addEventListener("click", closeNodal);
  }
}
