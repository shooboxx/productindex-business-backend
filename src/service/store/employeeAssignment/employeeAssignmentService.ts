import { EmployeeRepo } from "../../employee/employeeRepo"
import { StoreService } from '../storeService';
import { EmployeeAssignmentRepo } from "./employeeAssignmentRepo";
import { EmployeeAssignmentErrors } from "./employeeAssignmentConst";
import { EmployeeErrors } from "../../employee/employeeConst";
import { StoreErrors } from "../storeConst";
import AppError from './../../../../utils/AppError.js'

const getStoreEmployees = async (storeId: number) => {
    try {
        if (!storeId) return null
        return await EmployeeAssignmentRepo.findStoreEmployees(storeId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const assignEmployeeToStore = async (employeeId: number, storeId: number) => {
    try {
        const employee = await EmployeeRepo._findEmployeeById(employeeId)
        const store = await StoreService._getStoreById(storeId)
        if (employee?.business_id !== store?.business_id) throw new AppError(EmployeeAssignmentErrors.NotBusinessEmployee, 400)
        return await EmployeeAssignmentRepo.assignEmployeeToStore(employeeId, storeId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

const removeEmployeeFromStore = async (employeeId: number, storeId: number) => {
    try {
        if (!employeeId) throw new AppError(EmployeeErrors.EmployeeIdRequired, 400)
        if (!storeId) throw new AppError(StoreErrors.storeIdIsRequired, 400)
        return await EmployeeAssignmentRepo.removeEmployeeFromStore(employeeId, storeId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

export const EmployeeAssignmentService = {
    getStoreEmployees,
    assignEmployeeToStore,
    removeEmployeeFromStore
}