import { CreateBusinessStore, BusinessStore } from "./storeTypes"
import db from '../../models'
const { Op } = require("sequelize");


const findBusinessStores = async (businessId : number ) : Promise<BusinessStore[]> => {
    return await db.BusinessStore.findAll({
        where: {
            business_id: businessId
        }
    })
} 

const findStore = async (storeId : number, storeName : string ) : Promise<BusinessStore> => {
    return await db.BusinessStore.findOne({
        where: {
            //TODO: Add a like and compare by case
            [Op.or]: [{id: storeId}, {unique_name: storeName}]
        }
    })
} 
const addStore = async (store : CreateBusinessStore) => {
    return await db.BusinessStore.create({
        business_id: store.business_id,
        unique_name: store.unique_name,
        email: store.email,
        phone: store.phone,
        phone_2: store.phone_2,
        phone_3: store.phone_3,
        address_line_1: store.address_line_1,
        address_line_2: store.address_line_2,
        latitude: store.latitude,
        longitude: store.longitude,
        country: store.country,
        city: store.city,
        state: store.state,
        postal_code: store.postal_code,
    }).catch(e => {throw Error(e.message)})
}

const updateStore = async (store : BusinessStore) => {
    await db.BusinessStore.update({
        unique_name: store.unique_name,
        email: store.email,
        phone: store.phone,
        phone_2: store.phone_2,
        phone_3: store.phone_3,
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
    }).catch(e => {throw Error(e.message)})

    return store
}

// const deleteStore = async (storeId : number) => {
//     await db.BusinessStore.delete()
// }


export const StoreRepo = {
    findBusinessStores,
    findStore,
    addStore,
    updateStore
}