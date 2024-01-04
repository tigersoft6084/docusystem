const allRoles = {
  user: [
    'getBoxFiles', 'manageBoxFiles',
    'getDocuments', 'manageDocuments'
  ],
  admin: [
    'getUsers', 'manageUsers', 
    'manageCompanies',
    'getBoxFiles', 'manageBoxFiles',
    'getDocuments', 'manageDocuments'
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
