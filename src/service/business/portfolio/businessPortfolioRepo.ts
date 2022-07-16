import db from '../../../models'

const updatePortfolioPicture = async (portfolioId: number, pictureUrl: string)  => {    
    await db.BusinessPortfolio.update({
        media_url: pictureUrl
    }, {
        where: {
            id: portfolioId,
        }
    }).catch(e => {throw new Error(e.message)})
    return 
}

export const PortfolioRepo = {
    updatePortfolioPicture
}