// models/User.js
import { FIREBASE_AUTH, FIREBASE_DB } from "../firebaseConfig";

class User {
  constructor(data) {
    this.id = data.id; // Firebase UID
    this.email = data.email;
    this.username = data.username || "";
    this.role = data.role || "customer";
    this.created_at = data.created_at || new Date().toISOString();
  }

  static async create(authUser, extraData) {
    const user = new User({
      id: authUser.uid,
      email: authUser.email,
      username: extraData.username,
      role: extraData.role,
      created_at: new Date().toISOString(),
    });

    const db = FIREBASE_DB;
    await db.ref(`users/${user.id}`).set(user);

    // Optionally add custom claims (e.g., role-based access)
    await FIREBASE_AUTH.setCustomUserClaims(user.id, { role: user.role });

    return user;
  }

  static async findById(uid) {
    const db = FIREBASE_DB;
    const snapshot = await db.ref(`users/${uid}`).once("value");
    return snapshot.exists() ? new User(snapshot.val()) : null;
  }

  static async update(uid, data) {
    const db = FIREBASE_DB;
    await db.ref(`users/${uid}`).update(data);
    return this.findById(uid);
  }

  static async delete(uid) {
    const db = FIREBASE_DB;
    await db.ref(`users/${uid}`).remove();
    await FIREBASE_AUTH.deleteUser(uid);
  }
}

module.exports = User;
