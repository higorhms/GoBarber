import Sequelize, { Model } from 'sequelize';

/**
 * Model of Appointment
 */
class Appointment extends Model {
    static init(sequelize) {
        super.init(
            {
                date: Sequelize.DATE,
                canceled_at: Sequelize.DATE,
            },
            { sequelize }
        );
        return this;
    }

    /**
     * Method associate all the models in src/database/INDEX.Js with others models in database
     */
    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.User, {
            foreignKey: 'provider_id',
            as: 'provider',
        });
    }
}

export default Appointment;
