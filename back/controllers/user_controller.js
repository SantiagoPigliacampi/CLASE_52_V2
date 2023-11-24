// userController.js

import { pool } from '../index.js';

// Create a new user
const createUser = async (req, res) => {
  const { name, age, email, is_premium, birthdate } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO users (name, age, email, is_premium, birthdate) VALUES (?, ?, ?, ?, ?)',
      [name, age, email, is_premium, birthdate]
    );
    res.status(201).json({ id: result.insertId, name, age, email, is_premium, birthdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating the user' });
  }
};


// Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving users' });
  }
};

// Retrieve a single user by ID
const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM users WHERE id_user = ?', [userId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      res.status(200).json(rows[0]);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error retrieving the user' });
  }
};

// Update a user by ID using PUT
const updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { name, age, email, is_premium, birthdate } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE users SET name = ?, age = ?, email = ?, is_premium = ?, birthdate = ? WHERE id_user = ?',
      [name, age, email, is_premium, birthdate, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ id: userId, name, age, email, is_premium, birthdate });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating the user' });
  }
};
const deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const [result] = await pool.query('DELETE FROM users WHERE id_user = ?', [userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end(); // Respond with a 204 No Content status
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error deleting the user' });
  }
};

export { createUser, getAllUsers, getUserById, updateUserById, deleteUserById };
