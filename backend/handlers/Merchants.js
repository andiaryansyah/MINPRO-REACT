import Merchants from "../models/MerchantModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getMerchants = async (req, res) => {
    try {
        const merchants = await Merchants.findAll({
            attributes:['id','name','address','phone_number']
        });
        res.status(200).json(merchants);
    } catch (error) {
        console.log(error.message);
    }
}

export const getMerchantId = async (req, res) => {
    try {
        const merchantId = await Merchants.findAll({
            where:{
                id:req.params.id
            },
            attributes:['id','name','address','phone_number']
        });
        res.status(200).json(merchantId);
    } catch (error) {
        console.log(error.message);
    }
}

export const Register = async (req, res) => {
    const dt = new Date();
    const {name, password, confPassword, address, phone_number} = req.body;
    if (password !== confPassword) return res.status(400).json ({msg: "Password dan Confirm Password tidak cocok"})
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Merchants.create({
            //yang merah name dari database - yang kuning name dari variabel register
            name:name,
            password:hashPassword,
            address:address,
            join_date:dt,
            phone_number:phone_number
        });
        res.json({msg: "Register Berhasil"})
    } catch (error) {
        console.log(error);
    }
}

export const deleteMerchant = async (req, res) => {
    try {
        await Merchants.destroy( {
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg: "Account telah terhapus"})
    } catch (error) {
        console.log(error);
    }
}

export const Login = async (req,res) => {
    try {
        const merchants = await Merchants.findAll({
            where:{
                name:req.body.name
            }
        });
        const match = await bcrypt.compare(req.body.password, merchants[0].password);
        if(!match) return res.status(400).json({msg:"Password Salah"});
        const merchantId = merchants[0].id;
        const name = merchants[0].name;
        const accessToken = jwt.sign({merchantId, name}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn:'20s'
        });
        const refreshToken = jwt.sign({merchantId, name}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn:'1d'
        });
        await Merchants.update({refresh_token:refreshToken},{
            where:{
                id:merchantId
            }
        });
        res.cookie('refreshToken',refreshToken, { 
            httpOnly:false,
            maxAge: 24 * 60 * 60 * 1000
            //secure untuk access https
            // secure:true
        });
        res.json({accessToken});

    } catch (error) {
        res.status(404).json({msg:"Username tidak ditemukan"})
    }
}

export const Logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(204);
        const merchants = await Merchants.findAll({ 
            where: {
                refresh_token: refreshToken 
            }
        });
        if(!merchants[0]) return res.sendStatus(204);
        const merchantId = merchants[0].id;
        await Merchants.update({refresh_token: null},{
            where: {
                id:merchantId
            }
        });
        res.clearCookie('refreshToken');
        return res.sendStatus(200);
}
