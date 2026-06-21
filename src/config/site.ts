export const siteConfig = {
  name: "CabEase",
  tagline: "Next-Generation Fleet Management",
  description: "The ultimate enterprise SaaS platform for employee transportation. Optimize routes, ensure compliance, and track your fleet in real-time.",
  mission: "To revolutionize enterprise transportation by providing an intelligent, safe, and efficient platform that empowers organizations to manage their fleets seamlessly.",
  company: {
    name: "CabEase Technologies",
    adminEmail: "admin@cabease.com",
    supportEmail: "support@cabease.com",
    salesEmail: "sales@cabease.com",
    phone: "+1 (800) 123-4567",
    address: "123 Fleet Street, Logistics City, 90210",
  },
  links: {
    website: "https://cabease.com",
    support: "https://support.cabease.com",
    twitter: "https://twitter.com/cabease",
    linkedin: "https://linkedin.com/company/cabease",
    facebook: "https://facebook.com/cabease",
    instagram: "https://instagram.com/cabease",
  },
  seo: {
    titleTemplate: "%s | CabEase",
    defaultTitle: "CabEase | Enterprise Fleet Management",
  }
};

export type SiteConfig = typeof siteConfig;
