const { ResponseUtil } = require('../utils/ResponseUtil');

class BaseApiController {
  constructor() {}

  sendResponse(res, result, message) {
    return res.status(200).json(ResponseUtil.makeResponse(message, result));
  }

  sendError(res, error, code = 500) {
    return res.status(code).json(ResponseUtil.makeError(error));
  }

  filterCollection(request, collection) {
    const only = this.getOnlyArray(request);
    collection.forEach(item => {
      item.setVisible(Object.keys(only));
      Object.entries(only).forEach(([key, filter]) => {
        if (Array.isArray(filter) && filter.length > 0) {
          filter.forEach(filter1 => {
            if (Array.isArray(filter1) && filter1.length > 0) {
              item.getRelations()[key].forEach(subItem => {
                subItem.getRelations()[filter1[0]].forEach(subSubItem => {
                  subSubItem.setVisible(Object.keys(filter1[1]));
                });
              });
            }
          });
          if (item.getRelations()[key] instanceof Collection) {
            item.getRelations()[key].forEach(subItem => {
              subItem.setVisible(Object.keys(filter));
            });
          } else if (item.getRelations()[key]) {
            item.getRelations()[key].setVisible(Object.keys(filter));
          } else if (item[key] instanceof Model) {
            item[key].setVisible(Object.keys(filter));
          }
        }
      });
    });
  }

  getOnlyArray(request) {
    let only = [];
    if (request.query.only) {
      only = request.query.only.split(';');
      only = this.buildOnlyTree(only, '.');
    }
    return only;
  }

  buildOnlyTree(categoryLines, separator) {
    const catTree = {};
    categoryLines.forEach(catLine => {
      const path = catLine.split(separator).map(cat => cat.trim());
      let node = catTree;
      path.forEach(cat => {
        if (!node[cat]) {
          node[cat] = {};
        }
        node = node[cat];
      });
    });
    return catTree;
  }

  filterModel(request, model) {
    const only = this.getOnlyArray(request);
    model.setVisible(Object.keys(only));
    Object.entries(only).forEach(([key, filter]) => {
      if (Array.isArray(filter) && filter.length > 0) {
        filter.forEach(filter1 => {
          if (Array.isArray(filter1) && filter1.length > 0) {
            model.getRelations()[key].forEach(subItem => {
              subItem.getRelations()[filter1[0]].forEach(subSubItem => {
                subSubItem.setVisible(Object.keys(filter1[1]));
              });
            });
          }
        });
        model.getRelations()[key].forEach(subItem => {
          subItem.setVisible(Object.keys(filter));
        });
      }
    });
  }

  limitOffset(request, collection) {
    const limit = parseInt(request.query.limit);
    const offset = parseInt(request.query.offset);
    if (!isNaN(limit) && !isNaN(offset)) {
      collection = collection.slice(offset).slice(0, limit);
    } else if (!isNaN(limit)) {
      collection = collection.slice(0, limit);
    }
    return collection;
  }
}

module.exports = BaseApiController;
