import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

function statsLogger(msg) {
    const statsFile = 'stats.json';
    fs.readFile(statsFile, 'utf-8', (err, data) => {
        const stats = JSON.parse(data);

        const currentDate = new Date();
        const timestamp = currentDate.toLocaleDateString('ru-RU', {hour: "2-digit", minute: "2-digit", second: "2-digit"});

        stats.push(`[${timestamp}]: ${msg}`);

        fs.writeFile(statsFile, JSON.stringify(stats, null, 2), (err) => {
            if (err) console.log(`Error ${err}`);
        });
    });
}

app.listen(3000, () => {
    console.log('Server initialized!')
});

app.get('/catalogData', (req, resp) => {
    fs.readFile('catalog.json', 'utf-8', (err, data) => {
        resp.send(data);
    });
});

app.get('/getCart', (req, resp) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        resp.send(data);
    });
});

app.post('/addToCart', (req, resp) => {
    const cartFile = 'cart.json';
    fs.readFile(cartFile, 'utf-8', (err, data) => {
        const cart = JSON.parse(data);
        cart.push(req.body);
        fs.writeFile(cartFile, JSON.stringify(cart), (err) => {
            if (err) console.log(`Error ${err}`);
            else statsLogger(`Товар '${req.body.title}' был добавлен в корзину`);
            resp.send(JSON.stringify({
                resut: err ? 0 : 1
            }))
        });
    });
});

app.post('/removeFromCart', (req, resp) => {
    const cartFile = 'cart.json';
    fs.readFile(cartFile, 'utf-8', (err, data) => {
        let cart = JSON.parse(data);
        cart = cart.filter(({ id }) => id !== req.body.id);
        fs.writeFile(cartFile, JSON.stringify(cart), (err) => {
            if (err) console.log(`Error ${err}`);
            else statsLogger(`Товар '${req.body.title}' был удален из корзины`);
            resp.send(JSON.stringify({
                result: err ? 0 : 1
            }))
        });
    });
});
