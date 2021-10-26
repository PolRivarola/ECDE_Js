class Atril {
  constructor(mail, color, vinilo, envio, precio) {
    this.mail = mail;
    this.color = color;
    this.vinilo = vinilo;
    this.envio = envio;
    this.precio = precio;
  }
}

let color;
let vinilo;
URLGET = "../data/compras.json"


$(".colorAt").mouseover(function(){
  let datoDe= $(this).next().prop("innerHTML");
  $.get(URLGET, function(respuesta,estado){
    if(estado === "success"){
        let misDatos = respuesta;
        for(const dato of misDatos){
          if (dato.title == datoDe){ 
            $("#dato").append(`
                <div class="datosDisplay" styile="flex-flow","column">
                <h3 >${dato.title}</h3>
                <p  >${dato.body}</p>
                </div>
                `)
        
        
        }} 
    }
    $("#dato").fadeIn("slow")
})




});

$(".colorAt").mouseout(function(){
  $("#dato").html("")
  $("#dato").css("display","none")

})

$(".colorAt").click(function () {
  color = $(this).next().prop("innerHTML");
  console.log(color);
  $(".primerPaso").fadeOut("fast");
  $(".segundoPaso").fadeIn("slow");
});

$(".viniloAt").click(function () {
  vinilo = $(this).next().prop("innerHTML");
  console.log(vinilo);
  $(".segundoPaso").fadeOut("fast");
  $(".tercerPaso").fadeIn("slow");
});

$("#btnPedir").click(function () {
  let mail = $("#mail")[0].value;
  if(mail == ""){
    alert("Porfavor ingrese un mail!")
  }else{
  guardar();}
  
});

$("#btnSi").click(function () {
  $(".cuartoPaso").fadeOut("fast");
  $(".primerPaso").fadeIn("slow");
});

$("#btnNo").click(function () {
  $(".cuartoPaso").fadeOut("fast");
  $(".quintoPaso").fadeIn("slow");
  mostrarCompras()
});






  


let precio = 0;
let total = 0;
let arrayPedidos = [];

function mostrarCompras(){
  $("#mostarPed").prepend(
    `<div class="mensaje">
    <p class="pedCon"> Estos son tus pedidos...cierto?</p>
    </div>`
  )
  for(let i in arrayPedidos){
    if(i == 0){
      $(".carouselcompras").append(
        `<div class="carousel-item active">
        <div class="displayMad pedFlex">
        <p> Color: ${arrayPedidos[i].color}</p>
        <p> Vinilo: ${arrayPedidos[i].vinilo}</p>
        <p> Anillo?: ${arrayPedidos[i].envio}</p>
        <p> Precio: ${arrayPedidos[i].precio}</p>
          </div>
        </div>`
      )
    }else{
      $(".carouselcompras").append(
      `<div class="carousel-item ">
        <div class="displayMad pedFlex" >
        <p> Color: ${arrayPedidos[i].color}</p>
        <p> Vinilo: ${arrayPedidos[i].vinilo}</p>
        <p> Anillo?: ${arrayPedidos[i].envio}</p>
        <p> Precio: ${arrayPedidos[i].precio}</p>
          </div>
        </div>`
        )
    }
  }
}

function guardar() {

  let anillo = $("#anillo").val();
  let mail = $("#mail").val();

  if (anillo == "Si") {
    precio = 2800;
  } else {
    precio = 2500;
  }

  if (anillo == "Si") {
    total += 2800;
  } else {
    total += 2500;
  }

  let pedido = new Atril(mail, color, vinilo, anillo, precio);
  let numPed = localStorage.length + 1;
  let Numpedido = "pedido" + numPed.toString();
  arrayPedidos.push(pedido)
  localStorage.setItem(Numpedido, JSON.stringify(pedido));

  $("#ready").html("");
  $("#ready").append(`
    <div class="mensaje">
    <p class="pedCon"> Pedido confirmado!</p>
    <p> Color: ${pedido.color}</p>
    <p> Vinilo: ${pedido.vinilo}</p>
    <p> Anillo?: ${pedido.envio}</p>
    <p> Precio: ${pedido.precio}</p>    
    <p> Total: ${total}</p>
    </div>`);

  $(".tercerPaso").fadeOut("fast");
  $(".cuartoPaso").fadeIn("slow");
}
