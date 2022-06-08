import db from '../../../models'
import { StoreContact } from './storeContactType';

const createStoreContactInfo = async (contactInfo : StoreContact) => {
    return await db.StoreContacts.create({
        business_store_id: contactInfo.business_store_id,
        email: contactInfo.email,
        phone: contactInfo.phone,
        phone_2: contactInfo.phone_2,
        phone_3: contactInfo.phone_3,
        facebook_url: contactInfo.facebook_url,
        twitter_url: contactInfo.twitter_url,
        instagram_url: contactInfo.instagram_url,
        business_website: contactInfo.business_website,
    }).catch(e => {
        throw Error(e.message)
    })
}

const updateStoreContactInfo = async (contactInfo : StoreContact) => {
    return await db.StoreContacts.update({
        email: contactInfo.email,
        phone: contactInfo.phone,
        phone_2: contactInfo.phone_2,
        phone_3: contactInfo.phone_3,
        facebook_url: contactInfo.facebook_url,
        twitter_url: contactInfo.twitter_url,
        instagram_url: contactInfo.instagram_url,
        business_website: contactInfo.business_website,
    }, {
        where: {
            business_store_id: contactInfo.business_store_id
        }
    }).catch(e => {
        throw Error(e.message)
    })
}


export const StoreContactRepo = {
    createStoreContactInfo,
    updateStoreContactInfo

}