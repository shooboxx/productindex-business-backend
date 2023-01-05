import { Business, CreateBusiness } from "./businessType"
import { BusinessRepo } from "./businessRepo"
import AppError from '../../../utils/AppError'
import { BusinessErrors } from './businessConts';
import { EmployeeService } from "../employee/employeeService";
import { AccessLevel } from "../employee/enums/employeeAccessLevelEnum";

const createBusiness = async (business : CreateBusiness) => {
    try {
        const isExistingBusiness = await _validateBusinessExist(business.name, business.registered_country)
        if (isExistingBusiness) throw new AppError(BusinessErrors.BusinessExist, 400)
        
        _validateBusinessCompleteness(business)

        const newBusiness = await BusinessRepo.addBusiness(business)
        await EmployeeService.createEmployee(newBusiness.id, business.created_by, AccessLevel.Owner)
        return newBusiness

    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
    
}

const updateBusiness = async (business : Business) : Promise<Business> => {
    try {
        const isExistingBusiness = await _validateBusinessExist(business.name, business.registered_country)
        if (!isExistingBusiness) throw new AppError(BusinessErrors.BusinessDoesNotExist)
        
        const businessToValidate = convertBusinessToCreateBusinessType(business)

        _validateBusinessCompleteness(businessToValidate)
        return await BusinessRepo.updateBusiness(business)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
}

const deleteBusiness = async (businessId : number) => {
    try {
        return await BusinessRepo.deleteBusiness(businessId)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
}

const getUserBusinesses = async (userId : number) : Promise<Business[]> => {
    try {
        return await BusinessRepo.findUserBusinesses(userId)
    } 
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const getBusinessById = async (businessId : number) : Promise<Business> =>  {
    try {
        return await BusinessRepo.findBusnesssById(businessId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

const convertBusinessToCreateBusinessType = (business : Business) : CreateBusiness=> {
    return {
        name: business.name,
        description: business.description,
        category : business.category,
        profile_picture_url: business.profile_pic_url,
        active: business.active,
        created_by: business.created_by || 0,
        registered_country: business.registered_country

    }
}

// Validations
const _validateBusinessCompleteness = (business : CreateBusiness) : Boolean=> {
    if (!business.category) throw new AppError(BusinessErrors.BusinessCategoryRequired, 400)
    if (!business.created_by) throw new AppError(BusinessErrors.BusinessOwnerRequired, 400)
    if (!business.name) throw new AppError(BusinessErrors.BusinessNameRequired, 400)
    if (!business.registered_country) throw new AppError(BusinessErrors.BusinessCountryRequired, 400)
    return true

}
const _validateBusinessExist = async (businessName : string, businessCountry : string) : Promise<Boolean> => {
    if (!businessName) throw new AppError(BusinessErrors.BusinessNameRequired, 400)
    if (!businessCountry) throw new AppError(BusinessErrors.BusinessCountryRequired, 400)
    const foundBusiness = await BusinessRepo.lookupBusiness(businessName, businessCountry)
    return !!foundBusiness.length
}

export const BusinessService = {
    createBusiness,
    updateBusiness,
    deleteBusiness,
    getUserBusinesses,
    getBusinessById,
}