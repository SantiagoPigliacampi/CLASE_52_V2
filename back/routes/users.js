import express from 'express';
const router = express.Router();
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user_controller.js';

/**
 *  @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *          name:
 *            type: string
 *          age:
 *            type: integer
 *          email:
 *            type: string
 *          is_premium:
 *            type: boolean
 *          birthdate:
 *            type: datetime
 *        example:
 *          name: 'Pepe'
 *          age: 22
 *          email: '0LJtQ@example.com'
 *          is_premium: true
 *          birthdate: '2000-01-01'
 *
 */


/**
* @swagger
* /users:
*  post:
*   summary: create a new user
*   tags: [User]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/User'
*   responses:
*     200:
*       description: new user created
*/
router.post('/', createUser);

/**
* @swagger
* /users:
*  get:
*    summary: return all users
*    tags: [User]
*    responses:
*      200:
*        description: array with all the users
*        content:
*          application/json:
*            schema:
*              type: array
*              items: 
*                $ref: '#/components/schemas/User'
*/
router.get('/', getAllUsers);

/**
* @swagger
* /users/{id}:
*  get:
*   summary: return a unique user
*   tags: [User]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: number
*       required: true
*       description: the user id
*   responses:
*     200:
*       description: user related to the provided id
*       content:
*         application/json:
*           schema:
*             type: object
*             $ref: '#/components/schemas/User'
*     404: 
*       description: user not found
*/
router.get('/:id', getUserById);

/**
* @swagger
* /users/{id}:
*  put:
*   summary: update a user
*   tags: [User]
*   requestBody:
*    required: true
*    content:
*     application/json:
*      schema:
*        type: object
*        $ref: '#/components/schemas/User'
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: number
*       required: true
*       description: the user id
*   responses:
*     200:
*       description: user deleted
*     404: 
*        description: user not found
*/
router.put('/:id', updateUserById);

/**
* @swagger
* /users/{id}:
*  delete:
*   summary: delete a user
*   tags: [User]
*   parameters:
*     - in: path
*       name: id
*       schema:
*         type: number
*       required: true
*       description: the user id
*   responses:
*     204:
*       description: user deleted
*     404:
*        description: user not found
*/
router.delete('/:id', deleteUserById);

export default router;