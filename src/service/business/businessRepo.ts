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


export const BusinessRepo = {
    addBusiness
}