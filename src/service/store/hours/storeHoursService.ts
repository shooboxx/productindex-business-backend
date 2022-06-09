import { StoreHours } from './storeHoursType';
import { StoreHoursRepo } from './storeHoursRepo';
import AppError from '../../../../utils/AppError.js'

const addStoreHours = async (storeId : number) => {
    try {
        const defaultStoreHours : StoreHours= {
            business_store_id : storeId,
            monday_open: '12:00:00 AM',
            monday_closed: '11:59:59 PM',
            tuesday_open: '12:00:00 AM',
            tuesday_closed: '11:59:59 PM',
            wednesday_open: '12:00:00 AM',
            wednesday_closed: '11:59:59 PM',
            thursday_open: '12:00:00 AM',
            thursday_closed: '11:59:59 PM',
            friday_open: '12:00:00 AM',
            friday_closed: '11:59:59 PM',
            saturday_open: '12:00:00 AM',
            saturday_closed: '11:59:59 PM',
            sunday_open: '12:00:00 AM',
            sunday_closed: '11:59:59 PM',
        }
        return await StoreHoursRepo.addStoreHours(storeId, defaultStoreHours)

    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }
}

const manageStoreHours = async (storeId, storeHours) => {
    try {
        const updatedStoreHours : StoreHours= {
            business_store_id : parseInt(storeId),
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
        }
        
        return await StoreHoursRepo.updateStoreHours(updatedStoreHours)

    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }
}

export const StoreHoursService = {
    addStoreHours,
    manageStoreHours
}