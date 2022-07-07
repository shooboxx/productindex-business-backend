import db from '../../../models'

const updatePortfolioPicture = async (portfolioId: number, pictureUrl: string)  => {    
    await db.BusinessPortfolio.update({
        image_url: pictureUrl

    }, {
        where: {
            id: portfolioId,
        }
    }).catch(e => {throw new Error(e.message)})
    return product
}

export const PortfolioRepo = {
    updatePortfolioPicture
}