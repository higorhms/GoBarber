import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

/**
 * Model of User
 */
class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                provider: Sequelize.BOOLEAN,
            },
            { sequelize }
        );

        this.addHook('beforeSave', async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    /**
     * Method associate all the models in src/database/INDEX.Js with others models in database
     */
    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }

    /**
     * Method check if the request body password is the existing password of this user
     */
    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash);
    }
}

export default User;
