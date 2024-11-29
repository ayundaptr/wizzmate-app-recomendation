// model/userModel.js
const { admin } = require("../firebase-config");

// Fungsi untuk menyimpan data profil pengguna ke Firestore (misalnya, setelah registrasi)
const saveUserProfile = async (uid, userProfile) => {
  try {
    const db = admin.firestore();
    await db.collection("users").doc(uid).set(userProfile);
    return { message: "Profil pengguna berhasil disimpan" };
  } catch (error) {
    throw new Error("Gagal menyimpan profil pengguna: " + error.message);
  }
};

module.exports = { saveUserProfile };
