const jwt = require('jsonwebtoken')
import  AppError  from './../../../utils/AppError'
import { AuthErrors } from './authConsts';
import { EmployeeService } from '../employee/employeeService';
import { AccessLevel } from '../employee/enums/employeeAccessLevelEnum';

export function authenticateToken (req, res, next) {
    const token = req.cookies.access_token
    if (token == null) throw new AppError(AuthErrors.LoginRequired, 403)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) throw new AppError(AuthErrors.TokenExpiredOrInvalid, 401)
        req.user_id = user.user_id
        return next()
    })
}

export function hasRole (role : AccessLevel[] = []) {
    const allowedRoles = [AccessLevel.Owner, AccessLevel.Administrator, ...role]
    return async (req, res, next) => {
        const businessId = req.params.businessId
        const userId = req.user_id
        EmployeeService.getUserEmployeeInfo(userId, businessId)
            .then(data=> {
                if (!allowedRoles.includes(data.business_access_level)) throw new AppError(AuthErrors.InsufficientPermissions, 400)
                return next()
            }).catch(e => {
                res.status(e.statusCode).json({error: e.message})
            })
    }
}

// TODO: Implement check to see if user has rights to manage store
const checkUserHasRightsToStore = (userId : number, storeId : number) => {

}