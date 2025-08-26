import * as functions from "firebase-functions";
import admin from "firebase-admin";
import cors from "cors";

if (!admin.apps.length) admin.initializeApp();

const TOPIC = "alerts";
const corsHandler = cors({ origin: true }); // permite qualquer origem

// Envia push quando cria um item em /alerts/{id}
export const onAlertCreate = functions.database
  .ref("/alerts/{id}")
  .onCreate(async (snap) => {
    const data = snap.val() || {};
    const title = "🚨 Alerta no veículo!";
    const parts = [
      data.motion ? "movimento" : null,
      data.distance != null ? `dist=${data.distance}cm` : null,
      data.temp != null ? `temp=${data.temp}°C` : null
    ].filter(Boolean);

    const message = {
      notification: { title, body: parts.join(" | ") || "Novo evento" },
      data: { deviceId: data.deviceId || "", timestamp: String(data.ts || Date.now()) },
      topic: TOPIC
    };

    // Garantir que a função espere o envio da mensagem antes de finalizar
    return await admin.messaging().send(message); // O "return" foi adicionado aqui
  });

// Inscreve um token FCM no tópico 'alerts' (com CORS)
export const registerToken = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    // pré-flight
    if (req.method === "OPTIONS") {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Headers", "Content-Type");
      res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      return res.status(204).send("");
    }

    try {
      if (req.method !== "POST") return res.status(405).send("Use POST");
      const { token } = req.body || {};
      if (!token) return res.status(400).send("token obrigatório");

      // Inscrição do token no tópico
      await admin.messaging().subscribeToTopic([token], TOPIC);

      res.set("Access-Control-Allow-Origin", "*");
      return res.status(200).json({ ok: true, topic: TOPIC });
    } catch (e) {
      console.error("Erro ao registrar token:", e); // Log mais detalhado
      res.set("Access-Control-Allow-Origin", "*");
      return res.status(500).json({ ok: false, error: String(e) });
    }
  });
});
