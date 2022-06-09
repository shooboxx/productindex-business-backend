import db from '../../../models'
import { StoreHours } from './storeHoursType'

const updateStoreHours = async (storeHours) => {
    return await db.StoreHours.update({
        monday_open: storeHours.monday_open,
        monday_closed: storeHours.monday_closed,
        tuesday_open: storeHours.tuesday_open,
        tuesday_closed: storeHours.thursday_closed,
        wednesday_open: storeHours.wednesday_open,
        wednesday_closed: storeHours.wednesday_closed,
        thursday_open: storeHours.thursday_open,
        thursday_closed: storeHours.thursday_closed,
        friday_open: storeHours.friday_open,
        friday_closed: storeHours.friday_closed,
        saturday_open: storeHours.saturday_open,
        saturday_closed: storeHours.saturday_closed,
        sunday_open: storeHours.sunday_open,
        sunday_closed: storeHours.sunday_closed,
    },
    {        
        where: {
            business_store_id: storeHours.business_store_id
        }
    }).catch(e => {throw new Error(e.message)})
}

const addStoreHours = async (storeId : number, storeHours: StoreHours) => {
    return await db.StoreHours.create({
        business_store_id : storeId,
        monday_open: storeHours.monday_open,
        monday_closed: storeHours.monday_closed,
        tuesday_open: storeHours.tuesday_open,
        tuesday_closed: storeHours.thursday_closed,
        wednesday_open: storeHours.wednesday_open,
        wednesday_closed: storeHours.wednesday_closed,
        thursday_open: storeHours.thursday_open,
        thursday_closed: storeHours.thursday_closed,
        friday_open: storeHours.friday_open,
        friday_closed: storeHours.friday_closed,
        saturday_open: storeHours.saturday_open,
        saturday_closed: storeHours.saturday_closed,
        sunday_open: storeHours.sunday_open,
        sunday_closed: storeHours.sunday_closed,
    }).catch(e => {throw new Error(e.message)})
}


export const StoreHoursRepo = {
    addStoreHours,
    updateStoreHours
}