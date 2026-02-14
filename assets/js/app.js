let carrito = [];

// 1. Cargar los 50 productos del JSON
async function cargarTienda() {
    const res = await fetch('assets/js/productos.json');
    const data = await res.json();
    dibujarProductos(data);
}

// 2. Inyectar los productos en el HTML
function dibujarProductos(productos) {
    const contenedor = document.getElementById('gridProductos');
    contenedor.innerHTML = productos.map(p => `
        <div class="producto-card">
            <img src="${p.img}" alt="${p.nombre}">
            <div>
                <h4>${p.nombre}</h4>
                <p class="precio">$${p.precio}</p>
                <button class="btn-add" onclick="agregar(${p.id}, '${p.nombre}', ${p.precio})">
                    Agregar
                </button>
            </div>
        </div>
    `).join('');
}

// 3. Funciones del Carrito
function agregar(id, nombre, precio) {
    carrito.push({ id, nombre, precio });
    actualizarCarrito();
}

function actualizarCarrito() {
    const cartList = document.getElementById('cartItems');
    const totalElem = document.getElementById('cartTotal');
    const countElem = document.getElementById('cartCount');

    cartList.innerHTML = carrito.map(i => `<p>${i.nombre} - $${i.precio}</p>`).join('');
    
    const total = carrito.reduce((sum, item) => sum + item.precio, 0);
    totalElem.innerText = `$${total}`;
    countElem.innerText = carrito.length;
}

// 4. Abrir/Cerrar Carrito
document.getElementById('cartToggle').onclick = () => {
    document.getElementById('sidebarCart').classList.toggle('active');
};

cargarTienda();