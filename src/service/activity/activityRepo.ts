import db from '../../models'

const logActivity = (userId: number, businessId: number, activity: string) => {
    return db.BusinessActivity.create({
        business_id: businessId,
        user_id: userId,
        activity: activity
    })
}

const findBusinessActivity = (businessId: number) => {
    return db.BusinessActivity.findAll({
        where: {
            business_id: businessId
        }, 
        attributes: {
            exclude: ['update_date'],
        },
        include: [{model: db.Users, where: {deleted_date: null}, attributes:  ["first_name", "last_name"]}]
    })
}

export const ActivityRepo = {
    logActivity,
    findBusinessActivity
}