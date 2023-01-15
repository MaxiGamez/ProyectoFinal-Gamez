// Declaracion de variables productos
let productos = [
    { id: 1, nombre: "Pan Rallado Chico", peso: 500, stock: 100, precio: 390, imgUrl: "./img/pan-rallado2.jpeg" },
    { id: 2, nombre: "Pan Rallado Grande", peso: 3000, stock: 50, precio: 3250, imgUrl: "./img/pan-rallado2.jpeg" },
    { id: 3, nombre: "Tostadas", peso: 150, stock: 100, precio: 205, imgUrl: "./img/tostadas2.jpeg" },
    { id: 4, nombre: "Tostadas con semillas", peso: 150, stock: 100, precio: 220, imgUrl: "./img/tostadas-semillas2.jpeg" },
]

let contenedorCarrito = document.getElementById("contenedorCarrito")
let contenedorTotal = document.getElementById("contenedor-total")
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
    contenedorProductos.className = "container"
    contenedorTotal.className = "hidden"
    contenedor.innerHTML = ""


    for (const producto of arrayDeProductos) {
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.id = producto.id
        tarjetaProducto.innerHTML = `
        <div class="card" style="width: 15rem;">
            <img src="${producto.imgUrl}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Peso neto${producto.peso} gr.</p>
                    <p class="card-text">Quedan${producto.stock} u.</p>
                    <p class="card-text">Cuesta <strong>$${producto.precio}</strong></p>
                    <p class="card-text"></p>
                    <a id=${producto.id} href="#" type="button" class= "boton btn btn-primary" >Agregar al Carrito</a>
                </div>
        </div>
            
    `
        contenedor.appendChild(tarjetaProducto)
    }

    let botones = document.getElementsByClassName("boton btn btn-primary")
    for (const boton of botones) {
        boton.addEventListener("click", agragarAlCarrito)
    }
}

// Funcion agregar al carrito

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
    tostada("Producto agregado al carrito", {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
    })
}

// funciones de renderizar array de productos

function renderizarCarrito(arrayDeProductos) {
    contenedorCarrito.innerHTML = ""
    for (const producto of arrayDeProductos) {
        contenedorCarrito.innerHTML += `
        <div class="contenedor-carrito">
            <div class="flex">
                <p>${producto.nombre}</p>
                <p>$${producto.precioUnitario}</p>
                <p>${producto.unidades}u.</p>
                <p>${producto.subtotal}</p>
            </div>
            <div class="boton-carrito">
                <div class="img-carrito">
                <img id="${producto.id}" class="chg-quantity update-cart " src="img/ap.png">
                </div>
                <div class="img-carrito">
                <img id="${producto.id}" class="chg-quantity-2 update-cart" src="img/down.png">
                </div>
                <div class="img-carrito">
                <img id="${producto.id}" class="chg-quantity-3 update-cart" src="img/trash.png">
                </div>
            </div>
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
    tostada("Producto eliminado del carrito", {
        background: "linear-gradient(to right,  #e92424,  #da5353)",
    })

}
// funciones del boton Vaciar carrito

let botonComprar = document.getElementById("vaciarCarrito")
botonComprar.addEventListener("click", () => {
    localStorage.removeItem("Carrito")
    carrito = []

    Swal.fire({
        title: '<strong>Gracias por su compra!</strong>',
        imageHeight: 100,
        imageAlt: 'logo',
        icon: "success",
        showConfirmButton: false,
        backdrop: `rgba(193, 188, 190, 0.65)`,
        timer: 2500,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    })

    renderizarCarrito([])
})

/*                 Alerts                      */

function tostada(text, style) {
    Toastify({
        text: text,
        style: style,
        duration: 1000,
        gravity: "bottom",
        position: "right",
    }).showToast();
}

/*  ocultar mostrar       */

function esconder(e) {
    contenedorProductos.className = "hidden"
    contenedorTotal.className = "container"
}
function mostrarRender() {
    renderizar(productos)
    contenedorTotal.className = "hidden"
}