// UserController.js
const BaseApiController = require('../../Controller');
const { v4: uuidv4 } = require('uuid');
const User = require('../../../models/user');
class UserController extends BaseApiController {
  constructor() {
    super(); // Call the constructor of the parent class (BaseApiController)
  }

  // Example method using sendResponse
  getUser(req, res) {
    const userData = { id: 1, name: 'John Doe' };
    this.sendResponse(res, userData, 'User retrieved successfully');
  }

  // Example method using sendError
  deleteUser(req, res) {
    const error = new Error('User not found');
    this.sendError(res, error.message, 404);
  }

  // Example method using filterCollection
  async listUsers(req, res) {
    const usersCollection = await User.findAll();
    // this.filterCollection(req, usersCollection);
    res.json(usersCollection);
  }

  // Example method using getOnlyArray
  getUsersWithFields(req, res) {
    const onlyFields = this.getOnlyArray(req);
    res.json({ fields: onlyFields });
  }

  // Example method using buildOnlyTree
  buildTree(req, res) {
    const categoryLines = ['category1.subcategory1', 'category1.subcategory2', 'category2'];
    const onlyTree = this.buildOnlyTree(categoryLines, '.');
    res.json({ tree: onlyTree });
  }

  // Example method using filterModel
  filterUser(req, res) {
    const userModel = [
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_number: '0987654321',
        password: 'securepass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone_number: '1112223333',
        password: 'alicepass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    this.filterModel(req, userModel);
    res.json(userModel);
  }

  // Example method using limitOffset
  getUsersWithLimit(req, res) {
    const usersCollection = [
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_number: '0987654321',
        password: 'securepass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        phone_number: '1112223333',
        password: 'alicepass',
        api_token: uuidv4(), 
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    this.limitOffset(req, usersCollection);
    res.json(usersCollection);
  }
}

module.exports = new UserController();
