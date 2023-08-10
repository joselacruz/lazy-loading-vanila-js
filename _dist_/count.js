const nodeCountAdded = document.querySelector('#added');
const nodeCountLoads = document.querySelector('#loads');

const count = {
    "agregadas":0,
    "cargadas": 0,
}

// function showResultCount () {
//     nodeCountAdded.textContent = count.agregadas;
//     nodeCountLoads.textContent = count.cargadas;
// }

const incrementAdded =  (newAmout) => {
    count.agregadas = newAmout;
    nodeCountAdded.textContent = count.agregadas;
 
}
const incrementLoads = (newAmout)=> {
    count.cargadas = newAmout;
    nodeCountLoads.textContent = count.cargadas;
}

const updateCount = (node) => {
    const newAmoutImgAdd = node.querySelectorAll(".contain-image").length;
    count.agregadas = newAmoutImgAdd;

    newAmoutImgAdd === count.cargadas ? count.cargadas = count.cargadas : count.cargadas = count.cargadas -1;

    nodeCountAdded.textContent = count.agregadas;
    nodeCountLoads.textContent = count.cargadas;
    
}

export{incrementAdded,incrementLoads,updateCount};
