// UserController.js
const BaseApiController = require('../../Controller');
const { v4: uuidv4 } = require('uuid');
const User = require('../../../models/user');
const moment = require('moment');

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

  // Example method for listing users with pagination using Sequelize
  listUsers = async (req, res) => {
    try {
      const page = req.query.page || 1; // Get the page parameter from the request query, default to page 1
      const pageSize = 10; // Number of items per page

      const { count, rows: users } = await User.findAndCountAll({
        offset: (page - 1) * pageSize, // Calculate the offset based on the current page
        limit: pageSize, // Limit the number of results per page
        
      });

      const totalPages = Math.ceil(count / pageSize); // Calculate total pages
      const pages = []; // Array to hold pagination data

      for (let i = 1; i <= totalPages; i++) {
        pages.push({ page: i, active: i === page });
      }
      // this.sendResponse(res, totalPages, 'User retrieved successfully');
      res.render('users', { users, totalPages,pages, currentPage: page });

    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Internal Server Error');
    }
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
