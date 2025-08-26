/* global importScripts, firebase */

// Carregar as bibliotecas do Firebase
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

// Configuração do Firebase (mesma configuração usada no index.html)
firebase.initializeApp({
  apiKey: "AIzaSyACScCPi0hlnK8SWKEx6DKvObttA1n8I1Q",
  authDomain: "carropttp.firebaseapp.com",
  databaseURL: "https://carropttp-default-rtdb.firebaseio.com",
  projectId: "carropttp",
  storageBucket: "carropttp.appspot.com",
  messagingSenderId: "799744092116",
  appId: "1:799744092116:web:8c8c93e7300c72440b9841",
  measurementId: "G-L70X5SW1LD"
});

// Obter o serviço de mensageria (Firebase Cloud Messaging)
const messaging = firebase.messaging();

// Função para mostrar a notificação no background
messaging.onBackgroundMessage((payload) => {
  const title = payload.notification?.title || "Alerta";
  const options = { body: payload.notification?.body || "" };
  
  // Exibir a notificação
  self.registration.showNotification(title, options);
});
