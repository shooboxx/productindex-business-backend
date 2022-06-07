import { CreateBusinessStore, BusinessStore } from "./storeTypes"
import db from '../../models'
const { Op } = require("sequelize");


const findBusinessStores = async (businessId : number ) : Promise<BusinessStore[]> => {
    return await db.BusinessStore.findAll({
        where: {
            business_id: businessId,
            deleted_date: null
        },
        attributes: {
            exclude: ['insert_date', 'update_date', 'deleted_date']
        }
    }).catch(e => {throw new Error(e.message)})
} 

const findStore = async (businessId : number, storeId : number, storeName : string ) : Promise<BusinessStore> => {
    return await db.BusinessStore.findOne({
        where: {
            //TODO: Add a like and compare by case
            [Op.or]: [{id: storeId, business_id: businessId, deleted_date: null}, {unique_name: storeName, business_id: businessId, deleted_date: null}]
        },
        attributes: {
            exclude: ['insert_date', 'update_date', 'deleted_date']
        }
    }).catch(e => {throw new Error(e.message)})
} 
const addStore = async (store : CreateBusinessStore) => {
    const newStore = await db.BusinessStore.create({
        business_id: store.business_id,
        unique_name: store.unique_name,
        // email: store.email,
        // phone: store.phone,
        // phone_2: store.phone_2,
        // phone_3: store.phone_3,
        address_line_1: store.address_line_1,
        address_line_2: store.address_line_2,
        latitude: store.latitude,
        longitude: store.longitude,
        country: store.country,
        city: store.city,
        state: store.state,
        postal_code: store.postal_code,
    }).catch(e => {throw new Error(e.message)})
    
    newStore.update_date = undefined
    newStore.insert_date = undefined
    newStore.deleted_date = undefined
    return newStore
}

const updateStore = async (store : BusinessStore) => {
    await db.BusinessStore.update({
        unique_name: store.unique_name,
        // email: store.email,
        // phone: store.phone,
        // phone_2: store.phone_2,
        // phone_3: store.phone_3,
        address_line_1: store.address_line_1,
        address_line_2: store.address_line_2,
        latitude: store.latitude,
        longitude: store.longitude,
        country: store.country,
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



export const StoreRepo = {
    findBusinessStores,
    findStore,
    addStore,
    updateStore,
    deleteStore
}