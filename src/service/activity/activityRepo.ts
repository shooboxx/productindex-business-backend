import db from '../../models'

const logActivity = (userId: number, businessId: number, activity: string) => {
    return db.BusinessActivity.create({
        business_id: businessId,
        user_id: userId,
        activity: activity
    })
}

const findBusinessActivity = (businessId: number, page: number = 0, pageSize: number = 0) => {
    console.log('Business Id', businessId)
    let clause = {
        where: {
            business_id: businessId
        }, 
        attributes: {
            exclude: ['update_date']
        }
    }
    if (page >= 0 && pageSize)  {
        clause['limit'] = pageSize 
        clause['offset'] = page * pageSize
    }
    return db.BusinessActivity.findAndCountAll({
        clause,
        include: [{model: db.Users, where: {deleted_date: null}, attributes:  ["first_name", "last_name"]}],
        order: [['insert_date', 'DESC']]
    })
}

export const ActivityRepo = {
    logActivity,
    findBusinessActivity
}