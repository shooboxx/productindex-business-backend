import { ActivityRepo } from "./activityRepo"
import AppError from './../../../utils/AppError.js'
import { UserErrors } from "../user/userConst"
import { BusinessErrors } from "../business/businessConts"
import { ActivityErrors } from "./activityConst"

const logActivity = async (userId : number, businessId : number, activity : string, previousValue : string = '' , currentValue : string = '' ) => {
    if (!userId) throw new AppError(UserErrors.UserIdRequired, 400)
    if (!businessId) throw new AppError(BusinessErrors.BusinessIdRequired, 400)
    if (!activity) throw new AppError(ActivityErrors.ActivityMessageRequired, 400)
    try {
        const activityString = _generateActivityString(previousValue, currentValue, activity)
        return await ActivityRepo.logActivity(userId, businessId, activityString)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

const getBusinessActivities = async (businessId: number, page: number = 0, pageSize: number = 0) => {
    try {
        if (!businessId) throw new AppError(BusinessErrors.BusinessIdRequired, 400)
        const activities = await ActivityRepo.findBusinessActivity(businessId, page, pageSize)
        return _activityResponse(activities)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

const _activityResponse = (activities) => {
    return {count: activities['count'], rows: activities['rows'].map(activity => {return {activity: `${activity['User']['first_name']} ${activity['User']['last_name']} ${activity['activity'].charAt(0).toLowerCase() + activity['activity'].slice(1)}`, insert_date: activity['insert_date']}} )}
}

const _generateActivityString = (previousValue : string, currentValue : string, activity : string) => {
 let activityString = `${activity}`
 if (currentValue && previousValue) activity += ` from ${previousValue} to ${currentValue}`
 return activityString
}

export const ActivityService = {
    getBusinessActivities,
    logActivity
}