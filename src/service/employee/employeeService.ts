import { BusinessErrors } from '../business/businessConts';
import { UserErrors } from '../user/userConst';
import AppError from './../../../utils/AppError.js'
import {AccessLevel} from './enums/employeeAccessLevelEnum'
import { EmployeeRepo } from './employeeRepo';
import { EmployeeSearch } from './employeeType';
import {EmployeeErrors} from './employeeConst'

//Implemented and tested
const createEmployee = async (businessId : number, userId : number, accessLevel : AccessLevel) => {
    try {
        let verificationCode = ''
        if (!businessId) throw new AppError(BusinessErrors.BusinessIdRequired, 400)
        if (!userId) throw new AppError(UserErrors.UserIdRequired, 400)
        if (!accessLevel || !AccessLevel[accessLevel]) return 
        if (await _doesEmployeeExist(businessId, userId)) throw new AppError(EmployeeErrors.EmployeeExist, 400)
        if (accessLevel !== AccessLevel.Owner) verificationCode = '' //TODO: Generate code
        
        const employee = await EmployeeRepo.createEmployee(businessId, userId, accessLevel, verificationCode)
        if (employee && accessLevel !== AccessLevel.Owner ) console.log('Send email!') //TODO: Send an email to verify access to the business
        
        return employee
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const updateEmployeeAccessLevel = async (employeeId : number, accessLevel : AccessLevel) => {
    if (!employeeId) return
    if (!accessLevel) return
    return
}
//Implemented and tested
const deleteEmployee = async (employeeId : number) => {
    try {
        if (!employeeId) return
        return EmployeeRepo.deleteEmployee(employeeId)
    }
    catch (e) {
        throw new AppError(e.message, e.status)
    }

}
//Implemented and tested
const getBusinessEmployees = async (businessId : number, userInfo : EmployeeSearch) => {
    try {
        if (!businessId) throw new AppError(BusinessErrors.BusinessIdRequired, 400)
        return await EmployeeRepo.findBusinessEmployees(businessId, userInfo)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

//Implemented and tested
const _doesEmployeeExist = async (businessId : number, userId : number) => {
    try {
        const employee =  await EmployeeRepo.findEmployeeExist(businessId, userId)
        if (employee) return true
        return false
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const getUserByEmployeeVerificationCode = async (verificiationCode : string) => {
    if (!verificiationCode) return null

}

const verifyEmployee = async (employeeId : number) => {
    if (!employeeId) return
    //Update employee verification date to current date and remove verification code

}

export const EmloyeeService = { 
    createEmployee,
    updateEmployeeAccessLevel,
    deleteEmployee,
    getBusinessEmployees,
}