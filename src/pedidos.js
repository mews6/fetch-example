function calcularPopularidad(pedidos, productos) {
    let ret = [];

    for (let i = 0; i < pedidos.length; i++) {
        let obj = pedidos[i];
        if (ret.includes(obj.idproducto) == false) {
            let producto = productos.idproducto[obj.idproducto];
            ret.push(
                {
                    "nombre": producto.nombreProducto,
                    "idproducto": obj.idproducto,
                    "cantidad": int(obj.cantidad)
                }
            )
        } else {
            ret.idproducto[obj.idproducto] += int(obj.cantidad);
        }
    } return ret;

}

function pedidosNecesarios( ){
    const pedidos = fetch('https://gist.githubusercontent.com/josejbocanegra/7b6febf87e9d986048a648487b35e693/raw/576531a2d0e601838fc3de997e021816a4b730f8/detallePedido.json')
    .then(response => response.json());

    const productos = fetch('https://gist.githubusercontent.com/josejbocanegra/be0461060d1c2d899740b8247089ba22/raw/916d2141e32e04031bda79c8886e8e4df0ae7f24/productos.json')
    .then(response => response.json());

    const popularidad = calcularPopularidad(pedidos, productos);
    console.log(popularidad)
}



pedidosNecesarios();