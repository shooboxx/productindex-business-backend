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
      }).catch(() => null);

      return dataValues
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
    })
    return business
}
const findUserBusinesses = async (userId : number) : Promise<Business[]> => {
    const businesses = await db.Business.findAll({
        where: {
            created_by: userId,
            deleted_date: null
        }
        
    }).catch(()=> null)
    return businesses
}

const deleteBusiness = async (businessId : number) => {
    await db.Business.update({
        deleted_date: new Date
    }, {
        where: {
            id: businessId,
            deleted_date: null
        }
    })
    return
}
const findBusnesssById = async (businessId : number) => {
    const business = await db.Business.findOne({
        where: {
            id: businessId,
            deleted_date: null
        }
        
    }).catch(()=> null)
    return business
}


export const BusinessRepo = {
    addBusiness,
    updateBusiness, 
    deleteBusiness,
    findUserBusinesses,
    findBusnesssById
}