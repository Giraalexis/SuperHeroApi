//Variables globales
window.heroes = [];

//al cargar pagina, se realiza peticion de los superheroes
window.addEventListener("DOMContentLoaded",async ()=>{
    const respuesta = await axios.get("http://157.245.138.232:9091/api/v1/test/superheroes");
    
    for (let i = 0; i < respuesta.data.data.length; i++) {
        window.heroes.push(respuesta.data.data[i]);
        if(respuesta.data.data[i].puedeVolar){
            window.mostrar(respuesta.data.data[i]);
            
        }

    }
})


//Mostrar Superhéroes :
window.mostrar = (heroe)=>{
    const molde = document.querySelector("#molde");
    let copia = molde.cloneNode(true);
    const contenedor = document.querySelector("#contenedor");
    console.log(heroe.id);
    copia.querySelector("#nombre-real").innerText = heroe.nombreReal;
    copia.querySelector("#nombre-heroe").innerText = heroe.nombre;
    copia.querySelector("#imagen-heroe").src = heroe.avatarURL;
    copia.querySelector("#btn-detalle").heroeId = heroe.id;
    copia.querySelector("#btn-detalle").addEventListener('click', detalleId);
    contenedor.appendChild(copia);
}

//Pedir datos por ID al seleccionar heroe en la lista
async function detalleId(){
    let id = this.heroeId;
    console.log(id);
    const respuesta = await axios.get("http://157.245.138.232:9091/api/v1/test/superheroes/"+id);
    console.log("entra en detalleId");
    window.mostrarDetalle(respuesta.data.data);
}

//Filtrar por Volador:


//Buscar Héroe por nombre:
const btnBuscar = document.querySelector("#btn-buscar")
btnBuscar.addEventListener('click',()=>{
    let nombreBuscar = document.querySelector("#txt-buscar").value;
    let encontrado = false;
    for (let i = 0; i < window.heroes.length; i++) { //recorrer los heroes, y buscar el nombre ingresado
        if(nombreBuscar == window.heroes[i].nombre){
            window.mostrarDetalle(window.heroes[i]);
            encontrado = true;
            break; //si lo encuentra, rompe ciclo
        }
    }
    if(!encontrado){
        Swal.fire({
            title: "No se ha encontrado: '"+nombreBuscar+"'"
        })
    }

})

//Mostrar Datos Adicionales en Sweet alert
window.mostrarDetalle = (heroe)=>{
    const molde = document.querySelector("#molde-detalle");
    let copia = molde.cloneNode(true);

    copia.querySelector("#nombre-real").innerText = heroe.nombreReal;
    copia.querySelector("#nombre-heroe").innerText = heroe.nombre;
    copia.querySelector("#imagen-heroe").src = heroe.avatarURL;
    copia.querySelector("#descripcion").innerText = heroe.descripcion;
    Swal.fire({
        title: copia.nombre,
        html: copia.innerHTML
    })
}

