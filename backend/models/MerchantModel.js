import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize;

const Merchants = db.define('merchants', {
    name:DataTypes.STRING,
    password:DataTypes.STRING,
    address:DataTypes.STRING,
    join_date:DataTypes.DATE,
    phone_number:DataTypes.STRING,
    refresh_token: DataTypes.TEXT
}, {
    underscored:true
});

export default Merchants;