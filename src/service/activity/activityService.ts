import { ActivityRepo } from "./activityRepo"

const logActivity = async (userId : number, businessId : number, activity : string, previousValue : string = '' , currentValue : string = '' ) => {
    if (!userId) return
    if (!businessId) return
    if (!activity) return
    const activityString = _generateActivityString(previousValue, currentValue, activity)
    return await ActivityRepo.logActivity(userId, businessId, activityString)
}

const getBusinessActivities = async (businessId: number) => {
    const activities = await ActivityRepo.findBusinessActivity(businessId)
    return activities.map(activity => `${activity['User']['first_name']} ${activity['User']['last_name']} ${activity['activity'].charAt(0).toLowerCase() + activity['activity'].slice(1)}` )
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