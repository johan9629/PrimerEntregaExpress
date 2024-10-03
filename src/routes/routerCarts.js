import { Router } from "express";

const router = Router();

const carts = [
    {
        id: 1,
        products: [
            {
                id: 1,
                title: "shampoo",
                descripcion: "shampoo cabello ondulado",
                codigo: "10001",
                precio: 100,
                status: true,
                stock: 13,
                categoria: "aseo",
                thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
                estatus: true,
            }
        ]
        
    }
];

router.get('/' , (req, res) => {
    res.status(200).send({ data: carts, error: null });
});

router.post('/' , (req, res) => {
    const { body } = req;

    if (body.hasOwnProperty('products')) {
        const cart = {
            id: carts.length + 1,
            ...body
        };
        console.log(cart);
        carts.push(cart);
        res.status(201).send({ data: cart, error: null });
    }
});

router.get('/:cid' , (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(cart => cart.id === parseInt(cid));
    if (cart) {
        res.status(200).send({ data: cart, error: null });
    } else {
        res.status(404).send({ data: null, error: "carrito no encontrado" });
    }
});

router.post('/:cid/product/:pid' , (req, res) => {
    const { pid , cid } = req.params;
    const { body } = req;
    const cart = carts.find((elem) => elem.id === parseInt(cid));
    if (cart) {
        const indexCart = carts.indexOf(cart);
        const producto = carts[indexCart].products.find((element) => element.id === parseInt(pid));
        if(producto){
            const indexProduct = carts[indexCart].products.indexOf(producto);
            carts[indexCart].products[indexProduct].stock += body.stock;
            res.status(200).send({ data: carts[indexCart].products, error: null });
        } else {
            const product = {
                id: parseInt(pid),
                ...body
            };

            carts[indexCart].products.push(product);

            res.status(201).send({ data: carts[indexCart], error: null });
        }
    } else {
        res.status(404).send({ data: null, error: "carrito no encontrado" });
    }
    
});


export default router;