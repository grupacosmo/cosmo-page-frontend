export function getNewsImage(url?: string, src = false) {
      const defaultLogo = '/assets/images/cosmo-logo-placeholder.png';
      const validUrl =  url || defaultLogo

      return src ? validUrl : `url('${validUrl}')`
  }