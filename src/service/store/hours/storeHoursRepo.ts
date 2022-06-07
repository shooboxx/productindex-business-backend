import db from '../../../models'

const getStoreHours = async (storeId : number) => {
    await db.StoreHours.findOne({
        where: {
            business_store_id: storeId
        }
    }).catch(e => {throw new Error(e.message)})
}
const updateStoreHours = async (storeHours ) => {
    await db.StoreHours.update({
        where: {
            business_store_id: storeHours.store_id
        }
    }).catch(e => {throw new Error(e.message)})
}