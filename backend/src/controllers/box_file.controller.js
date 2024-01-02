const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { boxFileService } = require('../services');

const createBoxFile = catchAsync(async (req, res) => {
  const boxFile = await boxFileService.createBoxFile(req.body);
  res.status(httpStatus.CREATED).send(boxFile);
});

const getBoxFiles = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await boxFileService.queryBoxFiles(filter, options);
  res.send(result);
});

const getBoxFile = catchAsync(async (req, res) => {
  const boxFile = await boxFileService.getBoxFileById(req.params.boxFileId);
  if (!boxFile) {
    throw new ApiError(httpStatus.NOT_FOUND, 'BoxFile not found');
  }
  res.send(boxFile);
});

const updateBoxFile = catchAsync(async (req, res) => {
  const boxFile = await boxFileService.updateBoxFileById(req.params.boxFileId, req.body);
  res.send(boxFile);
});

const deleteBoxFile = catchAsync(async (req, res) => {
  await boxFileService.deleteBoxFileById(req.params.boxFileId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBoxFile,
  getBoxFiles,
  getBoxFile,
  updateBoxFile,
  deleteBoxFile,
};
