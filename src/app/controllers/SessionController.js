import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const userExist = await User.findOne({ where: { email } });

        if (!userExist) {
            return res.status(401).json({ error: 'Please check your email' });
        }

        if (!(await userExist.checkPassword(password))) {
            return res
                .status(401)
                .json({ error: 'Please check your password' });
        }

        const { id, name } = userExist;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SessionController();
