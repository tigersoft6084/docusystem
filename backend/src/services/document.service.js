const httpStatus = require('http-status');
const { Document } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a document
 * @param {Object} documentBody
 * @returns {Promise<Document>}
 */
const createDocument = async (documentBody, company) => {
  // if (await Document.isEmailTaken(documentBody.email)) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  // }
  if (documentBody.boxFile) {
    documentBody.boxFile = documentBody.boxFile.id;
  }
  documentBody.company = company;
  return Document.create(documentBody);
};

/**
 * Query for documents
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryDocuments = async (filter, options, company) => {
  options.populate = "boxFile";
  const {q, boxFile} = filter;
  if (q !== undefined) {
    if (q === '') {
      // delete filter.q;
    }
    else {
      const regex = new RegExp(q, 'i');
      filter.$or = [{
        name: {
          $regex: regex
        }
      },
      {
        title: {
          $regex: regex
        }
      },
      ]
    }
    delete filter.q;
  }
  if (boxFile !== undefined) {
    filter.boxFile = boxFile.split(",");
  }
  if (company !== undefined) filter.company = company;
  const documents = await Document.paginate(filter, options);
  return documents;
};

/**
 * Get document by id
 * @param {ObjectId} id
 * @returns {Promise<Document>}
 */
const getDocumentById = async (id) => {
  return Document.findById(id).populate('boxFile');
};

/**
 * Update document by id
 * @param {ObjectId} documentId
 * @param {Object} updateBody
 * @returns {Promise<Document>}
 */
const updateDocumentById = async (documentId, updateBody) => {
  const document = await getDocumentById(documentId);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  if (updateBody.boxFile) {
    updateBody.boxFile = updateBody.boxFile.id;
  }
  Object.assign(document, updateBody);
  await document.save();
  return document;
};

/**
 * Delete document by id
 * @param {ObjectId} documentId
 * @returns {Promise<Document>}
 */
const deleteDocumentById = async (documentId) => {
  const document = await getDocumentById(documentId);
  if (!document) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Document not found');
  }
  await document.remove();
  return document;
};

module.exports = {
  createDocument,
  queryDocuments,
  getDocumentById,
  updateDocumentById,
  deleteDocumentById,
};
