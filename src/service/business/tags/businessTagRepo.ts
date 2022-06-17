import db from '../../../models'
import { BusinessTag } from './businessTagTypes';

const findBusinessTags = async (businessId : number) => {
    return await db.BusinessTags.findAll({
        where: {
            business_id: businessId
        }, 
        include: [{model: db.Business, attributes: {exclude: ['Business.*']}, where: {deleted_date: null}}],
        attributes: {
            exclude: ['insert_date', 'update_date']
        }
    }).catch(e => {throw e})
}


const addBusinessTag = async (businessId, tag) : Promise<BusinessTag> => {
    const {dataValues} =  await db.BusinessTags.create({
        tag: tag,
        business_id: businessId
    }).catch(e => {throw e})

    return dataValues
}

const deleteBusinessTag = async (businessId: number, tagId : number) => {
    return await db.BusinessTags.destroy({
        where: {
            business_id: businessId,
            id: tagId
        }
    })
}

export const TagsRepo = {
    findBusinessTags,
    addBusinessTag,
    deleteBusinessTag
}