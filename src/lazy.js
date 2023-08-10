import { incrementLoads } from "./count";
const allImgContainers = document.querySelector("#images");

const isIntersecting = (entry) => {
  return entry.isIntersecting;
};
const loadImage = (entry) => {
  const nodo = entry.target;
  const url = nodo.dataset.src;
  nodo.src = url;

  //obtenemos Todos los div con la clase '.contain-image'  que contiene las img
  const catidadDeImg = allImgContainers.querySelectorAll(".contain-image");
  //pasamos el node list a un array para poder usar todas las propiedades disponible
  //para aaray
  const arrayCatidadDeImg = [...catidadDeImg];
  //filtramos todos los div que ya tenga la propiedad Src
  //la cual me indicara la cantidad de imagenes que se esta mostrando
  const showsImg = arrayCatidadDeImg.filter((item) => {
    const math = item.querySelector("img").src;
    return math;
  });
  observer.unobserve(nodo);
  incrementLoads(showsImg.length);
};

const observer = new IntersectionObserver((entries) => {
  entries.filter(isIntersecting).forEach(loadImage);
});

export const registerImage = (imagen) => {
  observer.observe(imagen);
};
