import { CreateBusinessStore, BusinessStore } from "./storeTypes"
import db from '../../models'

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
        is_primary: store.is_primary,
    })
}

const updateStore = async (store : BusinessStore) => {
    return await db.BusinessStore.update({
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
    })
}

// const deleteStore = async (storeId : number) => {
//     await db.BusinessStore.delete()
// }


export const StoreRepo = {
    addStore,
    updateStore
}