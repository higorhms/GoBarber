import * as Yup from 'yup';
import User from '../models/User';

/**
 * Middleware for create a user
 */
class UserController {
    async store(req, res) {
        /**
         * Yup validation, check if the request body has this itens, and require them
         */
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        /**
         * Search by email for check if this user already exist
         */
        const userExist = await User.findOne({
            where: { email: req.body.email },
        });

        if (userExist) {
            return res.status(400).json({ error: 'User already exist' });
        }

        /**
         * Persist User
         */
        const { id, name, email, provider } = await User.create(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }

    /**
     * Middleware for update a user
     */
    async update(req, res) {
        /**
         * Yup validation, check if the request body has this itens, and require them
         */
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
            comfirmPassword: Yup.string().when('password', (password, field) =>
                password ? field.required().oneOf([Yup.ref('password')]) : field
            ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'validation fails' });
        }

        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.userId);

        /**
         * Search by email for check if this user already exist
         */
        if (email && email !== user.email) {
            const userExist = await User.findOne({ where: { email } });

            if (userExist) {
                return res.status(400).json({ error: 'User already exist' });
            }
        }

        /**
         * Check if the password informed if the old password of this user
         */
        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            res.status(401).json({ error: 'Password does not match' });
        }

        /**
         * Update user
         */
        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }
}

export default new UserController();
