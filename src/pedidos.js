async function calcularPopularidad(pedidos, productos) {
    let ret = [];

    for (let i = 0; i < pedidos.length; i++) {
        let obj = pedidos[i];
        let productoExistente = ret.find(item => item.idproducto === obj.idproducto);

        if (!productoExistente) {
            let producto = productos.find(p => p.idproducto === obj.idproducto);
            ret.push({
                "nombre": producto.nombreProducto,
                "idproducto": obj.idproducto,
                "cantidad": parseInt(obj.cantidad)
            });
        } else {
            productoExistente.cantidad += parseInt(obj.cantidad);
        }
    }

    // Ordenar los productos por cantidad en orden descendente
    ret.sort((a, b) => b.cantidad - a.cantidad);
    return ret;
}

async function pedidosNecesarios() {
    const pedidos = await fetch('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json')
        .then(response => response.json());

    const productos = await fetch('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json')
        .then(response => response.json());

    const popularidad = await calcularPopularidad(pedidos, productos);
    renderTable(popularidad);
}

function renderTable(popularidad) {
    const tableBody = document.getElementById('productos-body');

    popularidad.forEach((producto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
        `;

        tableBody.appendChild(row);
    });
}

pedidosNecesarios();
