import { Sequelize } from "sequelize";
import db from "../config/database.js"

const {DataTypes} = Sequelize;

const Products = db.define('products', {
    name:DataTypes.STRING,
    quantity:DataTypes.INTEGER,
    price:DataTypes.BIGINT,
    image:DataTypes.STRING,
    url:DataTypes.STRING
}, {
    underscored:true
});

export default Products;