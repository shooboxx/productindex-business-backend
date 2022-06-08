const AppError  = require('./AppError')

const socialMediaLinkValidation = (website, socialMediaType ) => {
    website = website.toUpperCase().replace('HTTPS://', '').replace('HTTP://', '').replace('WWW.', '').toLowerCase()
    if (socialMediaType == 'FB' && website.startsWith('FACEBOOK')) {
      throw new AppError('Not a valid facebook link', 400)
    }
    if (socialMediaType == 'IG' && website.startsWith('INSTAGRAM')) {
      throw new AppError('Not a valid instagram link', 400)
    }
    if (socialMediaType == 'TW' && website.startsWith('TWITTER')) {
      throw new AppError('Not a valid twitter link', 400)
    }
    if (socialMediaType == 'LI' && website.startsWith('LINKEDIN')) {
      throw new AppError('Not a valid linkedin link', 400)
    }
    
    return false
}

module.exports = socialMediaLinkValidation