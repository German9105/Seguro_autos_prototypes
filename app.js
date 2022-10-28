// todo 1: CONSTRUCTORES
function Seguro (marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
};
//TODO 6A: Realizar el proto de Seguro con las cotizaciones
Seguro.prototype.cotizarSeguro = function (){
    /*
    Si es americano es value "1" y su valor será de 1.15 sobre la base del seguro
    Si es asiatico es value "2" y su valor será de 1.05 sobre la base del seguro
    Si es europeo es value "3" y su valor será de 1.35 sobre la base del seguro
    */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case "1":
            cantidad = base * 1.15;
            break;
        case "2":
            cantidad = base * 1.05;
            break;
        case "3":
            cantidad = base * 1.35;
            break;      
        default:
            break;
    }
    // Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    // Cada año la diferencia disminuira 3%
    cantidad -= ((diferencia * 3) * cantidad) /100;
   

    // Si la cobertura es basica multiplicar por 30% 
    // Si la cobertura es completa multiplicar por 50%
    if(this.tipo === "basico"){ 
        cantidad *= 1.30;
    } else {
        cantidad *= 1.50;
    }
    return cantidad;
}



function UI (){};

//todo 2: CREAR EL PROTOTYPE DE UI PARA MOSTRAR EL SELECT LLENO
UI.prototype.llenarOpciones = () => {
    const max = new Date().getFullYear();
          min = max - 20;

    const selecYear = document.querySelector("#year");

    for(i=max; i >= min; i--){
    const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          selecYear.appendChild(option);
    }
};

//todo 5A: CREAR PROTOTYPE QUE MUESTRE ALERTAS EN PANTALLA
UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    
    const div = document.createElement("div");
    if(tipo === "error"){
        div.classList.add("mensaje","error","mt-10");
    } else {
        div.classList.add("mensaje","correcto","mt-10");
    }
        div.textContent = mensaje;

    //? INSERTAR EN EL HTML
    const formulario = document.querySelector("#cotizar-seguro");
    formulario.insertBefore(div, document.querySelector("#resultado"))
    setTimeout(() => {
        div.remove();
    }, 2500);
}

UI.prototype.mostrarResultado = (total,seguro) => {
    const {marca,year,tipo} = seguro
    let textoMarca;
    switch (marca) {
        case "1":
            textoMarca = "Americano"
            break;
        case "2":
            textoMarca= "Asiatico"
            break;
        case "3":
            textoMarca= "Europeo"
            break;
        default:
            break;
    }

    //Crear el resultado
    const div = document.createElement("div");
    div.classList.add("mt-10");
    div.innerHTML = `
        <p class="header"> Tu resumen </p>
        <p class="font-bold">Marca: <span class ="font-normal"> ${textoMarca} </span> </p>
        <p class="font-bold">Total: <span class ="font-normal"> $${total} </span> </p>
        <p class="font-bold">Año: <span class ="font-normal"> ${year} </span> </p>
        <p class="font-bold">Tipo: <span class ="font-normal capitalize"> ${tipo} </span> </p>
        `;
    
    const resultadoDiv = document.querySelector("#resultado");
    

    //Mostrar spinner
    const spinner = document.querySelector("#cargando");
    spinner.style.display = "block";
    setTimeout(() => {
        spinner.style.display = "none"; // Se borra el spinner
        resultadoDiv.appendChild(div); // Se muestra la cotizacion
    }, 2500);
}
    

//todo 3: CREAR INSTANCIA DE UI ANTES DEL EVENTLISTENER PORQUE SERA USADO EN VARIAS FUNCIONES
const ui = new UI();
console.log(ui);    

//todo 4: AQUI SE LLENA EL SELECT CON TODOS LOS AÑOS DESPUES DE QUE SE CARGA TODO EL DOCUMENTO
document.addEventListener("DOMContentLoaded", () =>{
    ui.llenarOpciones();
})

addEventListener();
function addEventListener () {
    const formulario = document.querySelector("#cotizar-seguro");
          formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro (e){
    e.preventDefault();
    //Trae la marca
        const marca = document.querySelector("#marca").value;
    //Traer el año
        const year = document.querySelector("#year").value;
    //Traer el tipo de cobertura
         const tipo = document.querySelector(`input[name="tipo"]:checked`).value
    
    //TODO 5: VALIDACION
        if(marca === "" || year === "" || tipo === ""){
           ui.mostrarMensaje("Todos los campos son obligatorios", "error");
           return;
        } 
           ui.mostrarMensaje("Cotizando seguro...", "correcto");

           // Ocultar cotizaciones previas
           const resultados = document.querySelector("#resultado div");
           if(resultados != null){
            resultados.remove();
           };

        //TODO 6: Instanciar seguro
        const seguro = new Seguro (marca,year,tipo);
        const total = seguro.cotizarSeguro();
        
        // Utilizar prototype que va a cotizar el seguro
        ui.mostrarResultado(total,seguro);
    }   







