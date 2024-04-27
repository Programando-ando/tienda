var productos = ["Cafe","Cereal","Leche","Cheetos","Pepsi","Sopa","Chips","Amper"];
var precios = [40, 30, 25, 16, 20, 8, 17, 19];

var selectProductos = document.getElementById("productos");
var imgProductos = document.getElementById("imgProducto");
var precioProductos = document.getElementById("precioProducto");
var inputCantidad=document.getElementById("inputCantidad");
var agregarCrrito = document.getElementById("agregarCarrito");

let total = 0;

var carrito = new Array();

var posProducto = -1;
var cantidadProducto=0;

const cargarProductos = () =>{
    let optionProductos="";
    productos.forEach((producto)=>{
        optionProductos+= `<option value="${producto}">${producto.toUpperCase()}</option>`
    })
    selectProductos.innerHTML=optionProductos;
    cargarPrecio();
}

selectProductos.onchange=()=>{
    cargarPrecio();

}

const cargarPrecio=()=>{
    imgProductos.src=`${selectProductos.value.toLowerCase()}.jpg`;
    precioProductos.innerHTML=`$ ${precios[selectProductos.selectedIndex]}`
    posProducto=selectProductos.selectedIndex;
}

inputCantidad.oninput=()=>{
    document.getElementById("vcantidad").innerHTML=inputCantidad.value;
    cantidadProducto = parseInt(inputCantidad.value);
}

agregarCarrito.onclick = () => {
  cantidadProducto=parseInt(inputCantidad.value);
  let divCarrito = document.getElementById("carrito");
  posProducto = selectProductos.selectedIndex;
  
  if (checarItem(posProducto,cantidadProducto)) {
    imprimirTabla();
  }else{
  
  let item = new Array();
  item.push(posProducto);
  item.push(cantidadProducto);
    carrito.push(item);
    imprimirTabla();
  }
    
}



const imprimirTabla = () => {
    let divCarrito = document.getElementById("carrito");
    let tablaHTML = `<table class="table w-100 m-auto">
                        <tr>
                            <td>PRODUCTO</td>
                            <td>PRECIO</td>
                            <td>CANTIDAD</td>
                            <td>IMPORTE</td>
                            <td>*</td>
                        </tr>`;
    let index = 0;
    total = 0;
    carrito.forEach(item => {
        let productoIndex = item[0];
        let cantidad = item[1];
        let precio = precios[productoIndex];
        
        tablaHTML += `<tr>
                        <td><img src="${productos[productoIndex].toLowerCase()}.jpg" alt="${productos[productoIndex]}" height="50px"></td>
                        <td>$${precio}.00</td>
                        <td>${cantidad}</td>
                        <td>$${precio * cantidad}.00</td>
                        <td><button class="btn btn-danger" onclick="eliminarProducto(${index})"><i class="bi bi-trash-fill"></i></button></td>
                    </tr>`;
        index++;
        total += precio * cantidad;
    });
    let cambio = 0;
    tablaHTML += `<tr>
                    <td></td>
                    <td></td>
                    <td><h3>TOTAL</h3></td>
                    <td><h3>$ ${total}.00</h3></td>
                    <td><button class="btn btn-success" onclick="pagarProducto(${total})">Pagar</button></td>
                </tr>
            </table>`;
   
    divCarrito.innerHTML = tablaHTML;
}


const checarItem=(pos,cant)=>{
  let x=false;
  carrito.forEach(item=>{
    if (item[0]==pos) {
      item[1]=item[1]+=cant;
      x=true;
    }
  });
  return x;
}



const eliminarProducto= (index) =>{
  Swal.fire({
  title: "Deseas eliminar el producto?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "Si",
  denyButtonText: "No"
}).then((result) => {

  if (result.isConfirmed) {
    Swal.fire("Se elimino el producto exitosamente ✨", "", "success");
    carrito.splice(index,1);
    imprimirTabla();
  }
});
}


const pagarProducto = (total) => {
  Swal.fire({
    title: `Total a pagar es: $${total}.00`,
    input: 'number',
    inputPlaceholder: `La cantidad a pagar es: ${total}`,
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      let pago = result.value;
      let cambio = pago - total;

      if (cambio >= 0) {
        Swal.fire({
          
          title: "Pago completado",
      text: 'Tu cambio es: $'+cambio.toFixed(2),
          icon: "success"
        });
        limpiarTabla();
      } else {
        Swal.fire({
        title: "No se completo el pago",
        text:  'Ingresa una cantidad mayor con la que vas a pagar',
        icon: "error"
          
        });
      }
    }
  });
}

const verProductos =()=>{
  let divListaProductos = document.getElementById("listaProductos");
    let tablaHTML = `<table class="table w-100 m-auto">
                        <tr>
                            <td>PRODUCTO</td>
                            <td>PRECIO</td>
                            <td>DEL</td>

                        </tr>`;
    let index = 0;
    productos.forEach(item => {
        tablaHTML += `<tr>
                        <td>${item}</td>
                        <td>$${precios[index]}.00</td>
                        <td><button class="btn btn-danger" onclick="eliminarProducto2(${index})"><i class="bi bi-trash-fill"></i></button></td>
                    </tr>`;
        index++;
    });   
    divListaProductos.innerHTML = tablaHTML;
}


const addProductos =()=>{
  let nombre = document.getElementById("nombre").value;
  let precio = document.getElementById("precioP").value;
  productos.push(nombre);
  precios.push(precio);
  verProductos();
  cargarProductos();

  document.getElementById("nombre").value="";
  document.getElementById("precioP").value="";
}


const eliminarProducto2= (index) =>{
  let divListaProductos = document.getElementById("listaProductos");
  Swal.fire({
  title: "Deseas eliminar este producto?",
  showDenyButton: true,
  showCancelButton: false,
  confirmButtonText: "Si",
  denyButtonText: "No"
}).then((result) => {

  if (result.isConfirmed) {
    Swal.fire("Se elimino el producto exitosamente", "", "success");
    productos.splice(index,1);
    precios.splice(index,1);
    verProductos();
    cargarProductos();
  }
});
}

const limpiarTabla=()=>{
  carrito=[];
  document.getElementById("carrito").innerHTML="";
  
}