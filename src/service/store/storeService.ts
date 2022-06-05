import { BusinessStore, CreateBusinessStore } from "./storeTypes"
import { StoreRepo  } from "./storeRepo"
import AppError from '../../../utils/AppError.js'
import { StoreErrors } from "./storeConst"
import { BusinessService } from "service/business/businessService"

const getBusinessStores = () => {

}

const getStore = (storeId : number, storeName : string) => {

}
const createStore = async (user : number, store : CreateBusinessStore) : Promise<BusinessStore> => {
    try {    
        _validateCreateStoreCompleteness(store)
        BusinessService.checkUserHasRightsToBusiness(user, store.business_id)
        return await StoreRepo.addStore(store)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }

}
const updateStore = (userId, storeId : number) => {

}

const deleteStore = (userId : number, storeId : number) => {

} 

const _validateCreateStoreCompleteness = (store : CreateBusinessStore) => {
    if (!store.unique_name) throw new AppError(StoreErrors.uniqueNameIsRequired, 400)
    if (!store.business_id) throw new AppError(StoreErrors.businessIdRequired, 400)
    if (!store.city) throw new AppError(StoreErrors.cityRequired, 400)
    if (!store.state) throw new AppError(StoreErrors.stateRequired, 400)
    if (!store.country) throw new AppError(StoreErrors.countryRequired, 400) // Change
}

export const StoreService = {
    getBusinessStores,
    getStore,
    updateStore,
    deleteStore
}