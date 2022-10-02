import { BusinessErrors } from '../business/businessConts';
import { UserErrors } from '../user/userConst';
import {AccessLevel} from './enums/employeeAccessLevelEnum'

const createEmployee = (businessId : number, userId : number, accessLevel : AccessLevel) => {
    if (!businessId) throw new AppError(BusinessErrors.BusinessIdRequired, 400)
    if (!userId) throw new AppError(UserErrors.UserIdRequired, 400)
    if (!accessLevel || !AccessLevel[accessLevel]) return 
    //If successful, send verification email
    return
}

const updateEmployeeAccessLevel = async (employeeId : number, accessLevel : AccessLevel) => {
    if (!employeeId) return
    if (!accessLevel) return
    return
}

const deleteEmployee = async (employeeId : number) => {
    if (!employeeId) return
    // if a user isn't verified, do a hard delete
    return
}

const getBusinessEmployees = async (businessId : number, userInfo) => {
    // First name, Last name, Access level, Added date (VerifiedDate)
    if (!businessId) throw new AppError(BusinessErrors.BusinessIdRequired, 400)
    //Only employees that have been verified and not deleted
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