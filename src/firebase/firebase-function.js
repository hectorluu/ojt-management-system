import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./firebase-config";

firebase.initializeApp(firebaseConfig);

// Create a reference to the Firestore database
const db = firebase.firestore();

// Create a reference to the Firebase Storage
const storage = firebase.storage();

// Function to upload an image to Firestore
export const uploadImageToFirestore = async (file) => {
  try {
    // Create a reference to the image in Firestore
    const imageRef = db.collection("images").doc();

    // Upload the file to Firebase Storage
    const storageRef = storage.ref(`images/${imageRef.id}`);
    await storageRef.put(file);

    // Get the download URL of the uploaded image
    const downloadURL = await storageRef.getDownloadURL();

    // Save the download URL and other image details to Firestore
    await imageRef.set({
      url: downloadURL,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    return imageRef.id;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
