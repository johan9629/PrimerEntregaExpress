import express from 'express';
import routerProducts from './routes/routerProducts.js';

const app = express();

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProducts);
//app.use('/api/carts', routerCarts);

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});