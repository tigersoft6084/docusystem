const httpStatus = require('http-status');
const { BoxFile } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a boxFile
 * @param {Object} boxFileBody
 * @returns {Promise<BoxFile>}
 */
const createBoxFile = async (boxFileBody) => {
  // if (await BoxFile.isEmailTaken(boxFileBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  return BoxFile.create(boxFileBody);
};

/**
 * Query for boxFiles
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryBoxFiles = async (filter, options) => {
  const boxFiles = await BoxFile.paginate(filter, options);
  return boxFiles;
};

/**
 * Get boxFile by id
 * @param {ObjectId} id
 * @returns {Promise<BoxFile>}
 */
const getBoxFileById = async (id) => {
  return BoxFile.findById(id);
};

/**
 * Update boxFile by id
 * @param {ObjectId} boxFileId
 * @param {Object} updateBody
 * @returns {Promise<BoxFile>}
 */
const updateBoxFileById = async (boxFileId, updateBody) => {
  const boxFile = await getBoxFileById(boxFileId);
  if (!boxFile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BoxFile not found');
  }

  Object.assign(boxFile, updateBody);
  await boxFile.save();
  return boxFile;
};

/**
 * Delete boxFile by id
 * @param {ObjectId} boxFileId
 * @returns {Promise<BoxFile>}
 */
const deleteBoxFileById = async (boxFileId) => {
  const boxFile = await getBoxFileById(boxFileId);
  if (!boxFile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BoxFile not found');
  }
  await boxFile.remove();
  return boxFile;
};

module.exports = {
  createBoxFile,
  queryBoxFiles,
  getBoxFileById,
  updateBoxFileById,
  deleteBoxFileById,
};
