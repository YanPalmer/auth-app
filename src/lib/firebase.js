import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase
// IMPORTANTE: Substitua estas credenciais pelas suas próprias do Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCri0o08Oitmt2DSCW_RDaSTVsSMhmv6S0",
  authDomain: "auth-app-5311b.firebaseapp.com",
  projectId: "auth-app-5311b",
  storageBucket: "auth-app-5311b.firebasestorage.app",
  messagingSenderId: "517013508135",
  appId: "1:517013508135:web:2ecbeddd00349f182a7e02"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar serviços
export const auth = getAuth(app);
export const db = getFirestore(app);
