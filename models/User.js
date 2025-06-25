const { adminDB, adminAuth } = require('../config/firebase');

class User {
  static async create(userData) {
    const userId = `user_${Date.now()}`;
    const userRef = adminDB.ref(`users/${userId}`);
    
    const newUser = {
      ...userData,
      created_at: new Date().toISOString()
    };
    
    await userRef.set(newUser);
    return { id: userId, ...newUser };
  }

  static async findById(userId) {
    const userRef = adminDB.ref(`users/${userId}`);
    const snapshot = await userRef.once('value');
    const userData = snapshot.val();
    
    if (!userData) {
      return null;
    }
    
    return { id: userId, ...userData };
  }

  static async findByEmail(email) {
    const usersRef = adminDB.ref('users');
    const snapshot = await usersRef.orderByChild('email').equalTo(email).once('value');
    const users = snapshot.val();
    
    if (!users) {
      return null;
    }
    
    const userId = Object.keys(users)[0];
    return { id: userId, ...users[userId] };
  }

  static async update(userId, updateData) {
    const userRef = adminDB.ref(`users/${userId}`);
    await userRef.update(updateData);
    return this.findById(userId);
  }

  static async delete(userId) {
    const userRef = adminDB.ref(`users/${userId}`);
    await userRef.remove();
    return true;
  }

  static async getAll() {
    const usersRef = adminDB.ref('users');
    const snapshot = await usersRef.once('value');
    const users = snapshot.val() || {};
    
    return Object.keys(users).map(id => ({
      id,
      ...users[id]
    }));
  }
}

module.exports = User;