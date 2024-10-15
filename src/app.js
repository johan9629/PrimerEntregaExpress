import express from 'express';
import routerProducts from './routes/routerProducts.js';
import routerCarts from './routes/routerCarts.js';
import routerHome from './routes/routerHome.js';
import routerRealTimeProducts from './routes/routerRealTimeProducts.js';
import config from './config.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const hbs = handlebars.create({
    helpers: {
        json: function(context) {
            return JSON.stringify(context);
        }
    }
});
app.engine('handlebars', hbs.engine);
app.set('views', `${config.DIRNAME}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', routerProducts);
app.use('/api/carts', routerCarts);
app.use('/home' , routerHome);
app.use('/realtime', routerRealTimeProducts);

app.use('/static', express.static(`${config.DIRNAME}/public`));


const httpServer = app.listen(config.PORT, () => { console.log(`Servidor activo en puerto ${config.PORT}`);});
const socketServer = new Server(httpServer);

socketServer.on('connection', socket => {
    console.log(`Usuario conectado ${socket.id}`);



});

