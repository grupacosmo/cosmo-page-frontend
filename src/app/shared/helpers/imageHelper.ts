export function getNewsImage(url?: string) {
      const defaultLogo = '/assets/images/cosmo-logo-placeholder.png';
      return `url('${url || defaultLogo }')`
  }