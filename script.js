// Declaracion de variables productos
let productos = [
    { id: 1, nombre: "Pan Rallado Chico", peso: 500, stock: 100, precio: 390, imgUrl: "./img/pan-rallado2.jpeg" },
    { id: 2, nombre: "Pan Rallado Grande", peso: 3000, stock: 50, precio: 3250, imgUrl: "./img/pan-rallado2.jpeg" },
    { id: 3, nombre: "Tostadas", peso: 150, stock: 100, precio: 205, imgUrl: "./img/tostadas2.jpeg" },
    { id: 4, nombre: "Tostadas con semillas", peso: 150, stock: 100, precio: 220, imgUrl: "./img/tostadas-semillas2.jpeg" },
]

let productosString = JSON.stringify(productos)
localStorage.setItem("productos", productosString)

let contenedorCarrito = document.getElementById("contenedorCarrito")

let contenedor = document.getElementById("contenedorProductos")
renderizarProductos(productos)
let carrito = []
//Renderiza productos del carrito 

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"))
}
renderizarCarrito(carrito)

let buscador = document.getElementById("buscador")
buscador.addEventListener("input", renderizarProductosFiltrados)

function renderizarProductosFiltrados(e) {
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    renderizarProductos(productosFiltrados)

}
function renderizarProductos(arrayDeProductos) {
    contenedor.innerHTML = ""

    // Tarjetas de productos en la web desde js 
    for (const producto of arrayDeProductos) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.id = producto.id

        tarjetaProducto.innerHTML = `
    <h3>${producto.nombre}</h3>
    <p>Peso neto${producto.peso} gr.</p>
    <p>Quedan${producto.stock} u.</p>
    <p>Cuesta$${producto.precio}</p>
    <img src=${producto.imgUrl}>
    <button class="boton" id=${producto.id}>Añadir al carrito</button>
    `
        contenedor.appendChild(tarjetaProducto)
    }

    let botones = document.getElementsByClassName("boton")
    for (const boton of botones) {
        boton.addEventListener("click", agragarAlCarrito)
    }
}

// Tarjeta del carrito en la web desde js
function agragarAlCarrito(e) {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let posicionDeProductoBuscado = carrito.findIndex(producto => producto.id ==
        productoBuscado.id)
    if (posicionDeProductoBuscado != -1) {
        carrito[posicionDeProductoBuscado].unidades++
        carrito[posicionDeProductoBuscado].subtotal = carrito[posicionDeProductoBuscado].
            unidades * carrito[posicionDeProductoBuscado].precioUnitario
    }
    else {
        carrito.push({
            id: productoBuscado.id, nombre: productoBuscado.nombre,
            precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.
                precio
        })
    }
    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
}

function renderizarCarrito(arrayDeProductos) {
    contenedorCarrito.innerHTML = ""
    for (const producto of arrayDeProductos) {
        contenedorCarrito.innerHTML += `
        <div class="flex">
        <p>${producto.nombre}</p>
        <p>$${producto.precioUnitario}</p>
        <p>${producto.unidades}u.</p>
        <p>${producto.subtotal}</p>
        </div>
        `
    }

    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h3> Total $${total}</h3>
    `
}

// funciones del boton Vaciar carrito

let botonComprar = document.getElementById("vaciarCarrito")
botonComprar.addEventListener("click", () => {
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
})

