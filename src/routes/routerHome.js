import { Router} from 'express';

const router = Router();

const products = [
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
    },
    {
        id: 2,
        title: "crema",
        descripcion: "crema para la cara",
        codigo: "10002",
        precio: 200,
        status: true,
        stock: 20,
        categoria: "cuidado personal",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        estatus: true,
    },
    {
        id: 3,
        title: "cepillo",
        descripcion: "cepillo de dientes",
        codigo: "10003",
        precio: 50,
        status: true,
        stock: 30,
        categoria: "aseo",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        estatus: true,
    },
    {
        id: 4,
        title: "pasta de dientes",
        descripcion: "pasta de dientes",
        codigo: "10004",
        precio: 80,
        status: true,
        stock: 40,
        categoria: "aseo",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        estatus: true,
    },
    {
        id: 5,
        title: "jabon",
        descripcion: "jabon de baño",
        codigo: "10005",
        precio: 70,
        status: true,
        stock: 50,
        categoria: "aseo",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        estatus: true,
    },
    {
        id: 6,
        title: "desodorante",
        descripcion: "desodorante en barra",
        codigo: "10006",
        precio: 90,
        status: true,
        stock: 60,
        categoria: "aseo",
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        estatus: true,
    }
];

router.get("/", (req, res) => {
    let consultas = req.query;
    let respuesta = [];

    if (Object.keys(consultas).length > 0 && parseInt(consultas) !== NaN && Object.values(consultas) < products.length) {
        for (let i = 0; i < Object.values(consultas); i++) {
            respuesta.push(products[i]);
        }
        res.status(200).render('home', { respuesta });
    } else {
        res.status(200).render('home', { products });
    }
});

router.post("/", (req, res) => {
    const { body } = req;

    if (
        body.hasOwnProperty('title') &&
        body.hasOwnProperty('descripcion') &&
        body.hasOwnProperty('codigo') &&
        body.hasOwnProperty('precio') &&
        body.hasOwnProperty('status') &&
        body.hasOwnProperty('stock') &&
        body.hasOwnProperty('categoria') &&
        body.hasOwnProperty('estatus')
    ) {
        const producto = {
            id: products.length + 1,
            ...body
        };
        products.push(producto);
        res.status(201).send({ data: producto, error: null });
    } else {
        res.status(400).send({ error: "debe enviarse todos los campos", data: [] })
    }
});


export default router;