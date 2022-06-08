const AppError  = require('./AppError')

const urlValidator = (website) => {
    website = website.toUpperCase()
    if (website.startsWith('WWW.')) website = 'HTTP://' + website
    try {
        const validated = new URL(website)
        if (validated) return true
    }
    catch (e) {
        throw new AppError('This link is not for a website', 400)
    }
}

module.exports = urlValidator