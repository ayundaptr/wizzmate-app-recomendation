const { auth, db } = require("../firebase-config");
const {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} = require("firebase/auth");

const { ref, set, get, child } = require("firebase/database");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ message: "Username, email, dan password diperlukan" });
  }

  try {
    // Create user and set database entry in parallel
    // test if user is already registered
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const userId = userCredential.user.uid;

    // Instead of setting the data after user creation, we will do it right away.
    const dbSet = set(ref(db, `users/${userId}`), { username, email });

    // Wait for both the user creation and database set to complete
    await dbSet;

    res.status(201).json({
      message: "Register Berhasil",
      user: { id: userId, username, email },
    });
  } catch (error) {
    console.error("Error creating new user:", error);

    let errorMessage = "Gagal mendaftarkan pengguna";
    if (error.code === "auth/email-already-in-use") {
      errorMessage = "Email sudah digunakan oleh pengguna lain";
    }

    res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  console.log("Login request received");
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password diperlukan" });
  }

  try {
    console.log("Attempting to sign in");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Sign-in successful");

    const userId = userCredential.user.uid;
    console.log(`User ID: ${userId}`);

    console.log("Fetching user data from database");
    const userSnapshot = await get(child(ref(db), `users/${userId}`));

    if (!userSnapshot.exists()) {
      console.error("User not found in database");
      return res
        .status(404)
        .json({ message: "User tidak ditemukan di database" });
    }

    const userData = userSnapshot.val();
    console.log("User data:", userData);

    res.status(200).json({
      message: "Login berhasil",
      user: { id: userId, username: userData.username, email: userData.email },
    });
  } catch (error) {
    console.error("Error during login:", error);

    let errorMessage = "Gagal login";
    if (error.code === "auth/wrong-password") {
      errorMessage = "Password salah";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "User tidak ditemukan";
    }

    res.status(500).json({
      message: errorMessage,
      error: error.message,
    });
  }
};
