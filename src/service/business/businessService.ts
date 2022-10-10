import { Business, CreateBusiness } from "./businessType"
import { BusinessRepo } from "./businessRepo"
import AppError from '../../../utils/AppError'
import { BusinessErrors } from './businessConts';
import { EmployeeService } from "../employee/employeeService";
import { AccessLevel } from "../employee/enums/employeeAccessLevelEnum";

const createBusiness = async (business : CreateBusiness) => {
    try {
        _validateBusinessCompleteness(business)
        const isExistingBusiness = _validateBusinessExist(business)
        if (isExistingBusiness) throw new AppError(BusinessErrors.BusinessExist, 400)
        const newBusiness = await BusinessRepo.addBusiness(business)
        await EmployeeService.createEmployee(newBusiness.id, business.created_by, AccessLevel.Owner)
        return newBusiness

    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
    
}

const updateBusiness = async (userId : number, business : Business) : Promise<Business> => {
    try {
        checkUserHasRightsToBusiness(userId, business.id)
        const businessToValidate = convertBusinessToCreateBusinessType(business)

        _validateBusinessCompleteness(businessToValidate)
        const isExistingBusiness = _validateBusinessExist(businessToValidate)
        if (!isExistingBusiness) {
            throw new AppError(BusinessErrors.BusinessDoesNotExist)
        }
        return await BusinessRepo.updateBusiness(business)
    }
    catch (e : any) {
        throw new AppError(e.message, e.statusCode)
    }
    
    
}

const deleteBusiness = async (userId : number, businessId : number) => {
    try {
        checkUserHasRightsToBusiness(userId, businessId)
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
    return await BusinessRepo.findBusnesssById(businessId)
}


const checkUserHasRightsToBusiness = (userId : number, businessId : number): Boolean => {
    return true
}

const convertBusinessToCreateBusinessType = (business : Business) : CreateBusiness=> {
    return {
        name: business.name,
        description: business.description,
        category : business.category,
        profile_picture_url: business.profile_pic_url,
        active: business.active,
        created_by: business.created_by || 0,

    }
}

// Validations
const _validateBusinessCompleteness = (business : CreateBusiness) : Boolean=> {

    return true

}
const _validateBusinessExist = (business : CreateBusiness) : Boolean => {

    return false
}

export const BusinessService = {
    createBusiness,
    updateBusiness,
    checkUserHasRightsToBusiness,
    deleteBusiness,
    getUserBusinesses,
    getBusinessById,
}