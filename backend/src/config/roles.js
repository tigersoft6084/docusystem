const allRoles = {
  user: ['getBoxFiles'],
  admin: ['getUsers', 'manageUsers', 
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
