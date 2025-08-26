#include <SoftwareSerial.h>
#include <TinyGsmClient.h>
#include <DHT.h>
#include <FirebaseESP32.h>

// Definir pino do sensor
#define DHTPIN 4
#define DHTTYPE DHT22  // Ou DHT11

// Configuração Wi-Fi temporária
const char* ssid = "SeuSSID";  // Se for necessário usar Wi-Fi por algum motivo (conexão temporária)
const char* password = "SuaSenha";  

// Definições do Firebase
#define FIREBASE_HOST "carropttp-default-rtdb.firebaseio.com"  // URL do Firebase Realtime Database
#define FIREBASE_AUTH "SuaFirebaseAuthKey"  // Token de autenticação do Firebase

// Definir limite de temperatura
const float LIMITE_TEMPERATURA = 30.0;  // Temperatura máxima segura

// Definir pinos para o módulo SIM7000
#define TINY_GSM_MODEM_SIM7000
#define SerialMon Serial
#define SerialAT Serial1  // Porta serial para o módulo SIM7000

SoftwareSerial SerialMon(7, 8);  // Definindo RX e TX para comunicação com o SIM7000
TinyGsm modem(SerialAT);  // Instancia o modem
TinyGsmClient client(modem);

// Inicializando o sensor DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  SerialMon.begin(9600);
  dht.begin();

  // Conectando-se à rede Wi-Fi (se necessário)
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao Wi-Fi...");
  }
  Serial.println("Conectado ao Wi-Fi!");

  // Conectando o módulo GSM SIM7000
  modem.begin();
  modem.sendAT("+CSQ");  // Verificando o sinal GSM
  modem.waitForResponse();
  modem.restart();

  modem.gprsConnect("internet", "", "");  // Conectando ao GPRS
  delay(10000);  // Aguardar a conexão ser estabelecida

  // Conectar ao Firebase
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

void loop() {
  // Leitura da temperatura
  float temperatura = dht.readTemperature();  // Temperatura em Celsius

  if (isnan(temperatura)) {
    Serial.println("Falha ao ler a temperatura.");
    return;
  }

  Serial.print("Temperatura: ");
  Serial.println(temperatura);

  // Se a temperatura ultrapassar o limite, envia para o Firebase
  if (temperatura > LIMITE_TEMPERATURA) {
    Serial.println("Temperatura alta detectada! Enviando alerta...");
    enviarAlerta(temperatura);  // Envia o alerta para o Firebase
  }

  delay(5000);  // Aguarda 5 segundos antes de verificar novamente
}

void enviarAlerta(float temperatura) {
  String path = "/alerts";  // Caminho no Firebase (chave 'alerts')
  String message = "Temperatura perigosa detectada no carro: " + String(temperatura) + "°C";

  // Envia o alerta para o Firebase Realtime Database
  Firebase.pushString(firebaseData, path, message);  // Envia a mensagem para /alerts
}
