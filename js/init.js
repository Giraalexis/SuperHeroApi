//Variables globales
window.heroes = [];

//al cargar pagina, se realiza peticion de los superheroes
window.addEventListener("DOMContentLoaded",async ()=>{
    try{
        const respuesta = await axios.get("http://157.245.138.232:9091/api/v1/test/superheroes");
    
        for (let i = 0; i < respuesta.data.data.length; i++) {
            window.heroes.push(respuesta.data.data[i]);
            window.mostrar(respuesta.data.data[i]);
                
    
        }
    }catch(e){
        new Toast({message: 'Error al Cargar Héroe en la lista',type: 'danger'});
    }
    
})

//Mostrar Superhéroes :
window.mostrar = (heroe)=>{
    const molde = document.querySelector("#molde");
    let copia = molde.cloneNode(true);
    const contenedor = document.querySelector("#contenedor");

    copia.querySelector("#nombre-real").innerText = heroe.nombreReal;
    copia.querySelector("#nombre-heroe").innerText = heroe.nombre;
    copia.querySelector("#imagen-heroe").src = heroe.avatarURL;
    copia.querySelector("#imagen-heroe").nombre = heroe.nombre;
    copia.querySelector("#btn-detalle").heroeId = heroe.id;
    copia.querySelector("#btn-detalle").addEventListener('click', detalleId);
    contenedor.appendChild(copia);
}

//Pedir datos por ID al seleccionar heroe en la lista
async function detalleId(){
    let id = this.heroeId;
    try{
        const respuesta = await axios.get("http://157.245.138.232:9091/api/v1/test/superheroes/"+id);
        window.mostrarDetalle(respuesta.data.data);
    }catch(e){
        new Toast({message: 'Error al Cargar detalles del Héroe',type: 'danger'});
    }
 
}


//Filtrar por Volador:
const btnFiltrar = document.querySelector("#btn-filtrar");
btnFiltrar.addEventListener('click',()=>{
    let filtro = document.querySelector("#select-filtrar").value;
    document.querySelector("#contenedor").innerHTML = "";

    if(filtro == "volador"){
        for (let i = 0; i < window.heroes.length; i++) {
            if(window.heroes[i].puedeVolar)  {
                window.mostrar(window.heroes[i]);
            }
        }
    }
    if(filtro =="noVolador"){
        for (let i = 0; i < window.heroes.length; i++) {
            if(!window.heroes[i].puedeVolar)  {
                window.mostrar(window.heroes[i]);
            }
        }
    }
    if(filtro == "todos"){
        for (let i = 0; i < window.heroes.length; i++) {
            window.mostrar(window.heroes[i]); 
        }
    }
})

//Buscar Héroe por nombre:
const btnBuscar = document.querySelector("#btn-buscar")
btnBuscar.addEventListener('click',()=>{
    let nombreBuscar = document.querySelector("#txt-buscar").value.trim();
    let encontrado = false;
    for (let i = 0; i < window.heroes.length; i++) { //recorrer los heroes, y buscar el nombre ingresado
        if(nombreBuscar.capitalize() == window.heroes[i].nombre.capitalize()){
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
    copia.querySelector("#imagen-heroe").nombre = heroe.nombre;
    copia.querySelector("#descripcion").innerText = heroe.descripcion;
    Swal.fire({
        title: copia.nombre,
        html: copia.innerHTML
    })
}

//Verificar si carga correctamente la imagen
function errorLoadedImg(heroe){
    new Toast({message: 'Error al Cargar Imagen del Héroe '+heroe,type: 'danger'});

}
//Capitalizar Texto
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
  }