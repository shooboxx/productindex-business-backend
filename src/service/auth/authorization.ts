const jwt = require('jsonwebtoken')
import  AppError  from './../../../utils/AppError'
import { AuthErrors } from './authConsts';

export function authenticateToken (req, res, next) {
    const token = req.cookies.access_token
    if (token == null) throw new AppError(AuthErrors.LoginRequired, 403)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new AppError(AuthErrors.TokenExpiredOrInvalid, 401)
        req.user_id = user.user_id
        return next()
    })
}