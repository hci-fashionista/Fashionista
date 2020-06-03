import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB-5VFYc50HeSc6X64XzfxyEzxpXqe3Nog",
	authDomain: "fashionista-cb19d.firebaseapp.com",
	databaseURL: "https://fashionista-cb19d.firebaseio.com",
	projectId: "fashionista-cb19d",
	storageBucket: "fashionista-cb19d.appspot.com",
	messagingSenderId: "389979579690",
	appId: "1:389979579690:web:08af5fe4b9d0f56c85aa53",
	measurementId: "G-KGNY0T9YEV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;

