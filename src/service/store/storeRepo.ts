import { CreateBusinessStore, BusinessStore } from "./storeTypes"
import db from '../../models'
const { Op } = require("sequelize");

const _findStoreById = async (storeId: number) : Promise<BusinessStore> => {
    return await db.BusinessStore.findOne({
        where: {
            id: storeId,  deleted_date: null
        },
        include: [{model: db.StoreContacts, attributes: {exclude: ['insert_date', 'update_date', 'id']}}, {model: db.StoreHours, attributes: {exclude: ['id', 'business_store_id','insert_date', 'update_date']}}],
        attributes: {
            exclude: ['insert_date', 'update_date', 'deleted_date']
        }
    }).catch(e => {throw new Error(e.message)})
}
const findBusinessStores = async (businessId : number ) : Promise<BusinessStore[]> => {
    return await db.BusinessStore.findAll({
        where: {
            business_id: businessId,
            deleted_date: null
        },
        include: [{model: db.StoreContacts, attributes: {exclude: ['insert_date', 'update_date', 'id']}}, {model: db.StoreHours, attributes: {exclude: ['id', 'business_store_id', 'insert_date', 'update_date']}}],
        attributes: {
            exclude: ['insert_date', 'update_date', 'deleted_date']
        }
    }).catch(e => {throw new Error(e.message)})
} 

const findEmployeeBusinessStores = async (employeeId : number) : Promise<BusinessStore[]> => {
    return await db.BusinessStore.findAll({
        where: {
            deleted_date: null
        },
        include: [{
            model: db.EmployeeAssignment, where: {employee_id: employeeId}, exclude: ['update_date'],
        }],
        attributes: {
            exclude: ['insert_date', 'update_date', 'deleted_date']
        }
    }).catch(e => {throw new Error(e.message)})
}

const findStore = async (businessId : number, storeId : number, storeName : string ) : Promise<BusinessStore> => {
    return await db.BusinessStore.findOne({
        where: {
            [Op.or]: [{id: storeId, business_id: businessId, deleted_date: null}, {unique_name: storeName, business_id: businessId, deleted_date: null}]
        },
        include: [{model: db.StoreContacts, attributes: {exclude: ['insert_date', 'update_date', 'id']}}, {model: db.StoreHours, attributes: {exclude: ['id', 'business_store_id','insert_date', 'update_date']}}],
        attributes: {
            exclude: ['insert_date', 'update_date', 'deleted_date']
        }
    }).catch(e => {throw new Error(e.message)})
} 

const addStore = async (store : CreateBusinessStore) => {
    const newStore = await db.BusinessStore.create({
        business_id: store.business_id,
        unique_name: store.unique_name,
        address_line_1: store.address_line_1,
        address_line_2: store.address_line_2,
        latitude: store.latitude,
        longitude: store.longitude,
        city: store.city,
        state: store.state,
        postal_code: store.postal_code,
        public: store.public,
        private_key: store.private_key
    }).catch(e => {throw new Error(e.message)})
    
    newStore.update_date = undefined
    newStore.insert_date = undefined
    newStore.deleted_date = undefined
    return newStore
}

const updateStoreUniqueName = async (storeId, uniqueName) => {
    await db.BusinessStore.update({
        unique_name: uniqueName
    }, 
    {
        where: {
            id: storeId,
            deleted_date: null
        }
    })
}

const updateStore = async (store : BusinessStore) => {
    await db.BusinessStore.update({
        address_line_1: store.address_line_1,
        address_line_2: store.address_line_2,
        latitude: store.latitude,
        longitude: store.longitude,
        city: store.city,
        state: store.state,
        postal_code: store.postal_code,
        is_primary: store.is_primary,
    }, {
        where: {
            id: store.id
        }
    }).catch(e => {throw new Error(e.message)})

    return store
}

const deleteStore = async (storeId : number) => {
    await db.BusinessStore.update({
        deleted_date: new Date()
    }, 
    {
        where: {
            id: storeId
        }
    })
}

const lookUpStore = async (storeUniqueName : string) => {
    const comparableStoreName = storeUniqueName.toLowerCase().split(' ').join('')
    const stores = await db.sequelize.query(`select * from business_store bs where replace(lower(unique_name), ' ', '') = '${comparableStoreName}' and deleted_date is null`).catch(e => null)
    return stores[0]
}



export const StoreRepo = {
    _findStoreById,
    findBusinessStores,
    findStore,
    addStore,
    updateStore,
    deleteStore,
    updateStoreUniqueName,
    lookUpStore,
    findEmployeeBusinessStores
}