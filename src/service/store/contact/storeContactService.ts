
import { StoreService } from '../storeService';
import { StoreContactRepo } from './storeContactRepo';
import { StoreContact } from './storeContactType';
import  socialMediaLinkValidation  from '../../../../utils/SocialMediaValidator';
import urlValidator from '../../../../utils/UrlValidator';
import AppError from '../../../../utils/AppError.js'
import { StoreErrors } from '../storeConst';

const addStoreContact = async (storeId : number) => {
    try {
        // Want to be able to create a contact record for a newly created business. Business info can be edited after business is created
        const emptyContact : StoreContact= {
            business_store_id: storeId
        }
        return await StoreContactRepo.createStoreContactInfo(emptyContact)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const manageStoreContact = async (storeId : number, contactInfo : StoreContact) => {
    try {
        contactInfo.business_store_id = storeId
        _validateContactCompleteness(contactInfo)
        _validateContactLinks(contactInfo)

        return await StoreContactRepo.createStoreContactInfo(contactInfo)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }
}

const _validateContactLinks = (contactInfo : StoreContact) => {
    try {
        if (contactInfo.facebook_url) socialMediaLinkValidation(contactInfo.facebook_url, 'FB') 
        if (contactInfo.twitter_url) socialMediaLinkValidation(contactInfo.twitter_url, 'TW')
        if (contactInfo.instagram_url) socialMediaLinkValidation(contactInfo.instagram_url, 'IG')
        if (contactInfo.business_website) urlValidator(contactInfo.business_website);
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode)
    }

}

const _validateContactCompleteness = (contactInfo : StoreContact) => {
    if (!contactInfo.business_store_id) throw new AppError(StoreErrors.storeIdIsRequired, 400)
}

export const StoreContactService = {
    addStoreContact,
    manageStoreContact
}