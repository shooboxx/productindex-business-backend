import { BusinessStore, CreateBusinessStore } from "./storeTypes"
import { StoreRepo  } from "./storeRepo"
import AppError from '../../../utils/AppError.js'
import { StoreErrors } from "./storeConst"
import { BusinessService } from "../business/businessService"
import { StoreContactRepo } from "./contact/storeContactRepo"
import { StoreContactService } from './contact/storeContactService';

const getBusinessStores = async (businessId) : Promise<BusinessStore[]>=> {
    return await StoreRepo.findBusinessStores(businessId)
}

const getStore = async (businessId : number, storeId : number, storeName : string) : Promise<BusinessStore> => {
    return await StoreRepo.findStore(businessId, storeId, storeName)
}

const createStore = async (userId : number, store : CreateBusinessStore) : Promise<BusinessStore> => {
    try {   
        BusinessService.checkUserHasRightsToBusiness(userId, store.business_id) 
        _validateCreateStoreCompleteness(store)
        store.unique_name = store.unique_name.replace(/\s/g, '')
        if (_checkIfStoreExist(store)) throw new AppError(StoreErrors.storeExists, 400)
        
        let newStore : BusinessStore = await StoreRepo.addStore(store)
        const newStoreContact = await StoreContactService.addStoreContact(newStore.id)
        newStore['StoreContact'] = newStoreContact
        return newStore
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }

}
const updateStore = async (userId, store : BusinessStore) => {
    try{    
        BusinessService.checkUserHasRightsToBusiness(userId, store.business_id) 
        _validateCreateStoreCompleteness(store)
        store.unique_name = store.unique_name.replace(/\s/g, '')
        if (!_checkIfStoreExist(store)) throw new AppError(StoreErrors.storeNotFound, 404)
        await StoreContactService.manageStoreContact(store.id, store.StoreContact)
        return await StoreRepo.updateStore(store)
    }
    catch (e) {
        return new AppError(e.message, e.statusCode || 400)
    }
}
const deleteStore = (userId : number, businessId : number, storeId : number) => {
    try {
        BusinessService.checkUserHasRightsToBusiness(userId, businessId) 
        StoreRepo.deleteStore(storeId)
    }
    catch (e) {
        return new AppError(e.message, e.statusCode || 400)
    }
} 

// TODO: Implement check to see if user has rights to manage store
const checkUserHasRightsToStore = (userId : number, storeId : number) => {

}
const _validateCreateStoreCompleteness = (store : CreateBusinessStore) => {
    if (!store.unique_name) throw new AppError(StoreErrors.uniqueNameIsRequired, 400)
    if (!store.business_id) throw new AppError(StoreErrors.businessIdRequired, 400)
    if (!store.city) throw new AppError(StoreErrors.cityRequired, 400)
    if (!store.state) throw new AppError(StoreErrors.stateRequired, 400)
    if (!store.country) throw new AppError(StoreErrors.countryRequired, 400)
}

// TODO: Implement check to see if store exist
const _checkIfStoreExist = (store) : Boolean => {
    // getStore(0, store).then((data)=> {if (data) return true})
    return false
}

export const StoreService = {
    getBusinessStores,
    getStore,
    createStore,
    updateStore,
    deleteStore,
    checkUserHasRightsToStore
}