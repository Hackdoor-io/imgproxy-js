const createHmac = require('create-hmac')

module.exports = class ImgProxy {

  constructor({ key, salt, url }) {
    this.options = { 
      config: { key, salt, url },
      settings: {
        enlarge: 1,
        width: 1000,
        height: 1000,
        gravity: "ce",
        resizeType: "fill",
        extension: undefined,
        originalImage: undefined
      }
     };
  }

  setOption(option, value) {
    this.options.settings[option] = value
  }

  image(val) {
    this.setOption("originalImage", val);
    return this;
  }

  width(val) {
    this.setOption("width", val);
    return this;
  }
  
  height(val) {
    this.setOption("height", val);
    return this;
  }

  gravity(val) {
    this.setOption("gravity", val);
    return this;
  }

  enlarge(val) {
    this.setOption("enlarge", val);
    return this;
  }

  resizeType(val) {
    this.setOption("resizeType", val);
    return this;
  }

  extension(val) {
    this.setOption("extension", val);
    return this;
  }

  sign(target) {
    const hexKey = this.hexDecode(this.options.config.key)
    const hexSalt = this.hexDecode(this.options.config.salt)

    const hmac = createHmac('sha256', hexKey)
    hmac.update(hexSalt)
    hmac.update(target)
    return this.urlSafeBase64(hmac.digest())
  }

  hexDecode(hex) {
    return Buffer.from(hex, 'hex')
  }

  urlSafeBase64 (string) {
    return Buffer.from(string)
      .toString('base64')
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
  }

  get() {

    const settings = this.options.settings;
    const config   = this.options.config;

    if (!settings.originalImage) {
      throw `Missing required param: image`
    } 

    const encoded_url = this.urlSafeBase64(settings.originalImage)
    const path = `/${settings.resizeType}/${settings.width}/${settings.height}/${settings.gravity}/${settings.enlarge}/${encoded_url}`
    return `${config.url}/${this.sign(path)}${path}`
  }

}