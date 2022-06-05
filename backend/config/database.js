import {Sequelize} from "sequelize";

const db = new Sequelize('react_db','root','Ary12345',{
    host:"localhost",
    dialect:"mysql"
});

export default db;