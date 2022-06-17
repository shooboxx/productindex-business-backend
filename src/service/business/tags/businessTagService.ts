import { TagsRepo } from "./businessTagRepo"
import AppError from '../../../../utils/AppError.js'
import { BusinessTag } from './businessTagTypes';
import { TagErrors } from './businessTagConst';
import { BusinessService } from "../businessService";

const addBusinessTags = async (userId, businessId, tags) => {
    try {    
        BusinessService.checkUserHasRightsToBusiness(userId, businessId)
        const addedTags : Promise<BusinessTag>[] = []
        const failedTags : any = []
        for (let i = 0; i < tags.length; i++) {
            const error = await _validateBusinessTags(businessId, tags[i])
            if (!error) addedTags.push(TagsRepo.addBusinessTag(businessId, tags[i]))
            if (error) failedTags.push({tag: tags[i], error: error})
        }
        const successfulTags =  await Promise.all(addedTags)
        return {success: successfulTags, failed: failedTags}
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }
}

const deleteBusinessTag = async (userId, businessId, tagId) => {
    try {
        BusinessService.checkUserHasRightsToBusiness(userId, businessId)
        return await TagsRepo.deleteBusinessTag(businessId, tagId)
    }
    catch (e) {
        throw new AppError(e.message, e.statusCode || 400)
    }
    
}

const getBusinessTags = async (businessId : number) => {
    try {
        return await TagsRepo.findBusinessTags(businessId)
    }
    catch (e) {
        throw e
    }
}

//TODO: Implement validations for business tags
const _validateBusinessTags = async (businessId, tag) => {
    try {
        const bizTags  = await getBusinessTags(businessId)
        if (bizTags.length >= 3) {
            return TagErrors.MaxAllowedTags
        }
        for (let i = 0; i < bizTags.length; i++) {
            if (bizTags[i].tag.toUpperCase().replace(/\s/g, '') == tag.toUpperCase().replace(/\s/g, '')) {
                return TagErrors.DuplicateTags
            }
        }   
        return ''
    }
    catch (e) {
        throw e
    }
}

export const TagsService = {
    addBusinessTags,
    deleteBusinessTag,
}