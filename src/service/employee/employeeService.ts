import { BusinessErrors } from '../business/businessConts';
import { UserErrors } from '../user/userConst';
import AppError from './../../../utils/AppError.js'
import {AccessLevel} from './enums/employeeAccessLevelEnum'
import { EmployeeRepo } from './employeeRepo';
import { EmployeeSearch, Employee } from './employeeType';
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
//Implemented and tested
const updateEmployeeAccessLevel = async (employeeId : number, accessLevel : AccessLevel) => {
    if (!employeeId) throw new AppError(EmployeeErrors.EmployeeIdRequired, 400)
    if (!accessLevel) throw new AppError(EmployeeErrors.AccessLevelRequired, 400)
    return EmployeeRepo.updateEmployeeAccessLevel(employeeId, accessLevel)
}
//Implemented and tested
const deleteEmployee = async (employeeId : number) => {
    try {
        if (!employeeId) throw new AppError(EmployeeErrors.EmployeeIdRequired, 400)
        return EmployeeRepo.deleteEmployee(employeeId)
    }
    catch (e) {
        throw new AppError(e.message, e.status)
    }

}
//Implemented and tested
const getBusinessEmployees = async (businessId : number, userInfo : EmployeeSearch)  => {
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
        const employee =  await EmployeeRepo._findEmployeeExist(businessId, userId)
        if (employee) return true
        return false
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}
//Implemented and tested
const verifyEmployee = async (verificationCode : string) => {
    const employee : Employee = await _getUserByEmployeeVerificationCode(verificationCode)
    if (employee) {
        employee.employee_verify_code = ''
        employee.verified_date = new Date()
        return await _updateEmployee(employee)        
    }
    throw new AppError(EmployeeErrors.InvalidVerificationCode, 400)
}
//Implemented and tested
const _getUserByEmployeeVerificationCode = async (verificiationCode : string) : Promise<Employee>=> {
    if (!verificiationCode) throw new AppError(EmployeeErrors.VerificationCodeRequired, 400)
    try {
        return EmployeeRepo.findEmployeeByVerificationCode(verificiationCode)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}
//Implemented and tested
const _updateEmployee = async (employee : Employee) => {
    return await EmployeeRepo._updateEmployee(employee)
}

const _findEmployeeById = async (employeeId : number) => {
    if (!employeeId) throw new AppError(EmployeeErrors.EmployeeIdRequired, 400)
    return await EmployeeRepo._findEmployeeById(employeeId)
}
export const EmployeeService = { 
    createEmployee,
    updateEmployeeAccessLevel,
    deleteEmployee,
    getBusinessEmployees,
    verifyEmployee,
    _findEmployeeById
}