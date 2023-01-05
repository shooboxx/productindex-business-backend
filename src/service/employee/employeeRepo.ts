import db from '../../models'
import { EmployeeSearch } from './employeeType';
import { AccessLevel } from './enums/employeeAccessLevelEnum';
const { Op } = require("sequelize");

const findUserEmployeeInfo = (businessId : number, userId : number) => {
    return db.Employee.findOne({
        where: {
            user_id: userId,
            business_id: businessId,
            deleted_date: null
        }
    })
}
const _findEmployeeById = (employeeId : number) => {
    return db.Employee.findOne({
        where: {
            id: employeeId,
            deleted_date: null
        }
    })
}
const findBusinessEmployees = (businessId : number, userInfo : EmployeeSearch) => {
    let employeeWhereClause = {business_id: businessId, verified_date: {[Op.ne]: null}}
    let userWhereClause = {deleted_date: null}

    if (userInfo.firstName) userWhereClause['first_name'] = {[Op.like]: '%' + userInfo.firstName + '%'}
    if (userInfo.lastName) userWhereClause['last_name'] = {[Op.like]: '%' + userInfo.lastName + '%'}
    if (userInfo.accessLevel) employeeWhereClause['business_access_level'] = userInfo.accessLevel

    return db.Employee.findAll({
        where: employeeWhereClause,
        attributes: ["id", "business_access_level", "verified_date"],
        include: [{model: db.Users, where: userWhereClause, attributes:  ["first_name", "last_name"]}]
    })
}

const findEmployeeByVerificationCode = (verificationCode : string) => {
    return db.Employee.findOne({
        where: {
            employee_verify_code: verificationCode,
        }
    })
}

const createEmployee = (businessId: number, userId: number, accessLevel : AccessLevel, verificationCode : string) => {
    return db.Employee.create({
        business_id : businessId,
        user_id : userId,
        business_access_level: accessLevel,
        employee_verification_code : verificationCode,
        verified_date: accessLevel == AccessLevel.Owner &&  new Date()
    })
}

const deleteEmployee = (employeeId : number) => {
    db.Employee.destroy({
        where: {
            id: employeeId,
            verified_date: null
        }
    })
    db.Employee.update({
        deleted_date: new Date()
    }, {
        where: {
            id: employeeId,
            verified_date: {[Op.ne]: null}
        }
    })
    return true
}

const updateEmployeeAccessLevel = (employeeId : number, accessLevel : AccessLevel) => {
    return db.Employee.update({
        business_access_level: accessLevel
    }, {
        where: {
            id: employeeId
        }
    })
}

const _updateEmployee = (employee) => {
    return db.Employee.update({
        business_access_level: employee.accessLevel,
        employee_verify_code: employee.employee_verify_code,
        verified_date: employee.verified_date,
        deleted_date : employee.deleted_date,
    }, {
        where: {
            id: employee.id
        }
    })
}

export const EmployeeRepo = {
    findUserEmployeeInfo,
    findBusinessEmployees,
    findEmployeeByVerificationCode,
    createEmployee,
    deleteEmployee,
    updateEmployeeAccessLevel,
    _updateEmployee,
    _findEmployeeById
    
}