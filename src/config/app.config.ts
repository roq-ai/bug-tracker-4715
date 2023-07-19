interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: [],
  tenantRoles: ['Owner', 'Administrator', 'Project Manager', 'Developer'],
  tenantName: 'Organization',
  applicationName: 'Bug tracker',
  addOns: ['file', 'notifications', 'chat'],
};
