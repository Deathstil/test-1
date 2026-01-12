// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

// Cloudinary configuration
const cloudinaryPreset = 'frizux';
const cloudinaryFolder = 'marketplace_uploads';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzPa671GH71UvTcZ3dECFPrW4xe1vS9ds",
  authDomain: "marketplace-e0bff.firebaseapp.com",
  projectId: "marketplace-e0bff",
  storageBucket: "marketplace-e0bff.appspot.com",
  messagingSenderId: "892936444768",
  appId: "1:892936444768:web:f595b3a3e5d697988e1c05",
  databaseURL: "https://marketplace-e0bff-default-rtdb.europe-west1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Elements
const profilePic = document.getElementById("profilePic");
const logoutBtn = document.getElementById("logoutBtn");
const profilePicUpload = document.getElementById("profilePicUpload");

// Get and display user data
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    alert("You need to be logged in to view your profile.");
    return window.location.href = "/home/login.html";
  }

  const username = new URLSearchParams(window.location.search).get('user');
  if (user.email.split('@')[0] !== username) {
    return alert("The username does not match the logged-in user.");
  }

  try {
    const snapshot = await get(ref(database, `users/${username}`));
    if (!snapshot.exists()) return alert("No user data found.");

    const data = snapshot.val();
    document.getElementById("fullname").textContent = data.name || "N/A";
    document.getElementById("email").textContent = user.email || "N/A";
    document.getElementById("index").textContent = data.index || "N/A";
    document.getElementById("program").textContent = data.program || "N/A";
    document.getElementById("phone").textContent = data.phone || "N/A";
    document.getElementById("room").textContent = data.roomnumber || "N/A";
    profilePic.src = data.profilePictureUrl || "/images/profile pic.jpg";

  } catch (error) {
    console.error("Error loading profile:", error);
    alert("An error occurred while loading your profile.");
  }
});

// Handle profile picture upload
profilePicUpload.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return alert("Please select an image.");

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', cloudinaryPreset);
  formData.append('folder', cloudinaryFolder);

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/dsj9imkpp/image/upload', {
      method: 'POST',
      body: formData
    });

    const data = await response.json();
    const profilePicUrl = data.secure_url;
    const username = new URLSearchParams(window.location.search).get('user');

    await update(ref(database, `users/${username}`), {
      profilePictureUrl: profilePicUrl
    });

    profilePic.src = profilePicUrl;
    alert("Profile picture updated successfully!");
  } catch (error) {
    console.error("Upload error:", error);
    alert("Failed to upload image.");
  }
});

// Logout functionality
logoutBtn?.addEventListener('click', async () => {
  try {
    await signOut(auth);
    alert("You have been logged out.");
    window.location.href = "/home/home.html";
  } catch (error) {
    console.error("Logout error:", error);
    alert("An error occurred while logging out.");
  }
});
