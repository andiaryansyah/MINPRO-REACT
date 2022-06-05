import Merchants from "../models/MerchantModel.js"
import jwt from 'jsonwebtoken';

export const refreshToken = async (req , res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);
        const merchant = await Merchants.findAll({ 
            where: {
                refresh_token: refreshToken 
            }
        });
        if(!merchant[0]) return res.sendStatus(403);
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const merchantId = merchant[0].id;
            const name = merchant[0].name;
            const email = merchant[0].email;
            const accessToken = jwt.sign({merchantId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn:'15s'
            });
            res.json({accessToken});
        });
    } catch (error) {
        console.log(error);
    }
}