import { Business, CreateBusiness } from "./businessType";
import db from '../../models'

const addBusiness = async (business : CreateBusiness) : Promise<Business> => {
    const { dataValues } = await db.Business.create({
        business_name: business.name,
        description: business.description,
        category: business.category,
        active: true,
        email_address: business,
        created_by: business.created_by,
      }).catch(e => {throw new Error(e.message)})

      return dataValues
}


const updateBusinessPicture = async (businessId: number, pictureUrl: string)  => {    
    await db.Business.update({
        profile_pic_url: pictureUrl,
    }, {
        where: {
            id: businessId,
            deleted_date: null
        }
    }).catch(e => {throw new Error(e.message)})
    return 
}

const updateBusiness = async (business : Business) : Promise<Business> => {    
    await db.Business.update({
        business_name: business.name,
        description: business.description,
        category: business.category,
        profile_picture_url: business.profile_pic_url,
        active: business.active,
        
    }, {
        where: {
            id: business.id,
            deleted_date: null
            
        }
    }).catch(e => {throw new Error(e.message)})
    return business
}

const findUserBusinesses = async (userId : number) : Promise<Business[]> => {
    const businesses = await db.Business.findAll({
        where: {
            created_by: userId,
            deleted_date: null
        },
        include: [{model: db.BusinessTags, attributes: {exclude: ['insert_date', 'update_date', 'business_id']}}]
        
    }).catch(e => {throw new Error(e.message)})
    return businesses
}

const deleteBusiness = async (businessId : number) => {
    await db.Business.update({
        deleted_date: new Date()
    }, {
        where: {
            id: businessId,
            deleted_date: null
        }
    }).catch(e => {throw new Error(e.message)})
    return
}
const findBusnesssById = async (businessId : number) => {
    const business = await db.Business.findOne({
        where: {
            id: businessId,
            deleted_date: null
        },
        include: [{model: db.BusinessTags, attributes: {exclude: ['insert_date', 'update_date', 'business_id']}}]
        
    }).catch(e => {throw new Error(e.message)})
    return business
}


export const BusinessRepo = {
    addBusiness,
    updateBusiness, 
    deleteBusiness,
    findUserBusinesses,
    findBusnesssById,
    updateBusinessPicture
}