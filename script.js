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

const boton = document.getElementById("botonBuscador")
boton.addEventListener("click", renderizarProductosFiltrados);
let buscador = document.getElementById("buscador")

function renderizarProductosFiltrados(e) {
    let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(buscador.value.toLowerCase()))
    renderizarProductos(productosFiltrados)

}
function renderizarProductos(arrayDeProductos) {
    contenedor.innerHTML = ""


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
// funciones del carrito

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
        
        <div>
        <img id="${producto.id}" class="chg-quantity update-cart " src="img/ap.png">
        </div>
        <div>
        <img id="${producto.id}" class="chg-quantity-2 update-cart" src="img/down.png">
        </div>
        <div>
        <img id="${producto.id}" class="chg-quantity-3 update-cart" src="img/trash.png">
        </div>
        `
    }

    let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
    contenedorCarrito.innerHTML += `
    <h3> Total $${total}</h3>
    `
    let add = document.getElementsByClassName("chg-quantity update-cart")
    for (let a of add) {
        a.addEventListener("click", agragarAlCarrito)
    }
    let remove = document.getElementsByClassName("chg-quantity-2 update-cart")
    for (let b of remove) {
        b.addEventListener("click", removeItem)
    }
    let removee = document.getElementsByClassName("chg-quantity-3 update-cart")
    for (let c of removee) {
        c.addEventListener("click", deleteItem)
    }
}

/*               Eliminar Items del Carrito            */
function deleteItem(e) {
    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let posicionDeProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)

    carrito[posicionDeProductoBuscado].unidades = 0
    carrito[posicionDeProductoBuscado].subtotal = carrito[posicionDeProductoBuscado].
        unidades * carrito[posicionDeProductoBuscado].precioUnitario
    carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("Carrito", carritoJSON)

    carrito.splice(posicionDeProductoBuscado, 1)
    carritoJSON = JSON.stringify(carrito)
    localStorage.setItem("Carrito", carritoJSON)

    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
}

function removeItem(e) {

    let productoBuscado = productos.find(producto => producto.id == e.target.id)
    let posicionDeProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)
    if (posicionDeProductoBuscado != -1) {
        if (carrito[posicionDeProductoBuscado].unidades >= 2) {
            carrito[posicionDeProductoBuscado].unidades--
            carrito[posicionDeProductoBuscado].subtotal = carrito[posicionDeProductoBuscado].
                unidades * carrito[posicionDeProductoBuscado].precioUnitario
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
        else {
            carrito.splice(posicionDeProductoBuscado, 1)
            carritoJSON = JSON.stringify(carrito)
            localStorage.setItem("Carrito", carritoJSON)
        }
    }
    totalFinal = carrito.reduce((a, b) => a + b.subtotal, 0)
    unidades = carrito.reduce((a, b) => a + b.unidades, 0)

    localStorage.setItem("carrito", JSON.stringify(carrito))
    renderizarCarrito(carrito)
}
// funciones del boton Vaciar carrito

let botonComprar = document.getElementById("vaciarCarrito")
botonComprar.addEventListener("click", () => {
    localStorage.removeItem("carrito")
    carrito = []
    renderizarCarrito([])
})

