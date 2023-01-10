import { BusinessStore, CreateBusinessStore } from "./storeTypes"
import { StoreRepo  } from "./storeRepo"
import AppError from '../../../utils/AppError.js'
import makeRandomId from '../../../utils/MakeRandomId.js'
import { StoreErrors } from "./storeConst"
import { StoreContactService } from './contact/storeContactService';
import {StoreHoursService} from './hours/storeHoursService'
import { EmployeeService } from "../employee/employeeService"
import { Employee } from "../employee/employeeType"
import { AccessLevel } from '../employee/enums/employeeAccessLevelEnum';

const getBusinessStores = async (businessId) : Promise<BusinessStore[]> => {
    return await StoreRepo.findBusinessStores(businessId)
}

const getUserBusinessStores = async (userId : number, businessId : number) : Promise<BusinessStore[]> => {
    const employee : Employee = await EmployeeService.getUserEmployeeInfo(userId, businessId)
    const adminRoles = [AccessLevel.Owner, AccessLevel.Administrator]
    if (!employee) return []
    if (adminRoles.includes(AccessLevel[employee.business_access_level])) return await getBusinessStores(businessId)
    return StoreRepo.findEmployeeBusinessStores(employee.id)
}

const getStore = async (businessId : number, storeId : number, storeName : string) : Promise<BusinessStore> => {
    return await StoreRepo.findStore(businessId, storeId, storeName)
}

const _getStoreById = async (storeId : number) : Promise<BusinessStore> => {
    if (!storeId) throw new AppError(StoreErrors.storeIdIsRequired, 400)
    return await StoreRepo._findStoreById(storeId)
}

const createStore = async (store : CreateBusinessStore) : Promise<BusinessStore> => {
    try {   
        _validateStoreCompleteness(store)
        if (!store.unique_name) throw new AppError(StoreErrors.uniqueNameIsRequired, 400)
        store.unique_name = store.unique_name.split(' ').join('')
        if (await _checkIfStoreExist(store.unique_name)) throw new AppError(StoreErrors.storeExists, 400)
        if (!store.public) store.private_key = store.unique_name + '-'+ makeRandomId(5)
        let newStore : BusinessStore = await StoreRepo.addStore(store)
        const newStoreHours = await StoreHoursService.addStoreHours(newStore.id)
        const newStoreContact = await StoreContactService.addStoreContact(newStore.id)
        newStore['StoreContact'] = newStoreContact
        newStore['StoreHours'] = newStoreHours
        return newStore
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

const updateStore = async (store : BusinessStore) => {
    try {    
        _validateStoreCompleteness(store)
        if (!await _checkIfStoreExist(store.unique_name)) throw new AppError(StoreErrors.storeNotFound, 404)
        await StoreContactService.manageStoreContact(store.id, store.StoreContact)
        await StoreHoursService.manageStoreHours(store.id, store.StoreHours)
        return await StoreRepo.updateStore(store)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}
const deleteStore = (storeId : number) => {
    try {
        StoreRepo.deleteStore(storeId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
} 

const updateStoreUniqueName = async (storeId : number, storeUniqueName : string) => {
    try {    
        const storeExist = await _checkIfStoreExist(storeUniqueName)
        if (storeExist) throw new AppError(StoreErrors.storeExists, 400)
        return StoreRepo.updateStoreUniqueName(storeId, storeUniqueName.split(' ').join(''))
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
    
}

const _validateStoreCompleteness = (store : CreateBusinessStore) : Boolean => {
    if (!store.unique_name) throw new AppError(StoreErrors.uniqueNameIsRequired, 400)
    if (!store.business_id) throw new AppError(StoreErrors.businessIdRequired, 400)
    if (!store.city) throw new AppError(StoreErrors.cityRequired, 400)
    if (!store.state) throw new AppError(StoreErrors.stateRequired, 400)
    return true
}

const _checkIfStoreExist = async (storeUniqeName : string) : Promise<Boolean> => {
    if (!storeUniqeName) throw new AppError(StoreErrors.uniqueNameIsRequired, 400)
    const foundStores = await StoreRepo.lookUpStore(storeUniqeName)
    return !!foundStores.length
}

export const StoreService = {
    getBusinessStores,
    _getStoreById,
    getStore,
    createStore,
    updateStore,
    deleteStore,
    getUserBusinessStores,
}