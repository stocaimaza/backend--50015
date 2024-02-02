const CartModel = require("../models/cart.model.js");

class CartManager {
    async crearCarrito() {
        try {
            const nuevoCarrito = new CartModel({products: []});
            await nuevoCarrito.save(); 
            return nuevoCarrito; 
        } catch (error) {
            console.log("Error al crear el nuevo carrinho de compriñas");
        }
    }

    async getCarritoById(cartId) {
        try {
            const carrito = await CartModel.findById(cartId);
                if(!carrito) {
                    console.log("No existe ese carrito con el id");
                    return null;
                }

            return carrito;
        } catch (error) {
            console.log("Error al traer el carrito, fijate bien lo que haces", error);
        }
    }

    async agregarProductoAlCarrito(cartId, productId, quantity = 1) {
        try {
            const carrito = await this.getCarritoById(cartId); 
            const existeProducto = carrito.products.find(item => item.product.toString() === productId);

            if(existeProducto) {
                existeProducto.quantity += quantity;
            } else {
                carrito.products.push({product: productId, quantity});
            }

            //Vamos a marcar la propiedad "products" como modificada antes de guardar: 
            carrito.markModified("products");

            await carrito.save();
            return carrito;
            
        } catch (error) {
            console.log("error al agregar un producto", error);
        }
    }

}

module.exports = CartManager; 