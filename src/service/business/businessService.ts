import { Business, CreateBusiness } from "./businessType"
import { BusinessRepo } from "./businessRepo"
import AppError  from '../../../utils/AppError'

const createBusiness = async (business : CreateBusiness) => {
    try {
        _validateBusinessCompleteness(business)
        _validateBusinessExist(business)
        return await BusinessRepo.addBusiness(business)
    }
    catch (e : any) {
        throw new Error(e.message)
    }
    
}

// const updateBusiness = (userId : number, business : CreateBusiness) => {
//     return
// }

// const deleteBusiness = (userId : number, businessId : number) => {
//     return 
// }

// const getUserBusinesses = (userId : number) : Promise<Business[]> => {
//     return 
// }

// const getBusinessById = (userId: number, businessId : number) : Promise<Business> =>  {
//     return
// }

// const setBusinessAvailabilityStatus = (userId : number, businessId : number, status: string) : Business => {
//     return
// }

// const manageBusinessTags = (userId : number, businessId : number, tags : []) : Business => {
//     //Find current business tags, compare it to passed in values.. delete the ones that does not match and add thew new tags (up to 3 tags)
//     return
// }
// const getBusinesstags = (businessId : number) => {
//     return
// }




// Validations
const _validateBusinessCompleteness = (business : CreateBusiness) : Boolean=> {

    return true

}
const _validateBusinessExist = (business : CreateBusiness) : Boolean => {

    return true
}

export const BusinessService = {
    createBusiness,
    // updateBusiness,
    // deleteBusiness,
    // getUserBusinesses,
    // getBusinessById,
    // setBusinessAvailabilityStatus,
    // manageBusinessTags
}