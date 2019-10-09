import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
    const user = await User.create({
        name: 'Higor',
        email: 'higorhmsrock@hotmail.com',
        password_hash: '12312312',
    });
    return res.json({ user });
});

export default routes;
