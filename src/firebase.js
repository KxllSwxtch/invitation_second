import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
	apiKey:
		import.meta.env.VITE_FIREBASE_API_KEY ||
		'AIzaSyDB895lPwsEkryoB9cLGOTjMo-hQk5BNbs',
	authDomain:
		import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
		'invitation-720e0.firebaseapp.com',
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'invitation-720e0',
	storageBucket:
		import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
		'invitation-720e0.appspot.com',
	messagingSenderId:
		import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '399495511665',
	appId:
		import.meta.env.VITE_FIREBASE_APP_ID ||
		'1:399495511665:web:93ed84835c85d4124225d0',
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
