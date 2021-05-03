/// <reference types='jquery' />
import $ from "jquery";

let $table = $('table');
const $inputFecha = document.querySelector('#fecha');

document.querySelector('button').onclick = function (){
  eliminarBordeRojo()
  resetearTabla()
  const $moneda = document.querySelector('#bases').value;
  const $fecha = document.querySelector('#fecha').value;
  if ($fecha == ""){
    $inputFecha.classList.add('borde-rojo')
    return ''
  }
  fetch(`https://api.ratesapi.io/api/${$fecha}?base=${$moneda}`)
    .then(response => response.json())
    .then(data =>{
      Object.keys(data.rates).forEach(function(key){
        $table.append(`<tr><td>${key}</td><td>${data.rates[key]}</td></tr>`)
      })
    })
    .catch(error => console.error("FALLO", error))
}

function resetearTabla(){
  $table.find("tr:gt(0)").remove();
}

function eliminarBordeRojo(){
  $inputFecha.classList.remove("borde-rojo");
}
