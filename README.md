
# 🚗 **Alerta Carro Seguro**

## 📌 **Problema**
Todos os anos, diversas tragédias acontecem devido a bebês, crianças e animais esquecidos dentro de veículos, levando a óbitos por superaquecimento do carro. Mesmo em paradas rápidas, alguns minutos são suficientes para que a temperatura interna atinja níveis fatais.

**Este projeto visa resolver essa dor**, evitando que vidas sejam perdidas por esquecimento dentro do veículo.

---

## 💡 **Solução Proposta**
**Alerta Carro Seguro** é um sistema inteligente baseado em IoT (Internet das Coisas) que utiliza o ESP32 e uma combinação de sensores para monitorar a temperatura, presença e movimento dentro do carro.

### **Como Funciona**
- O **ESP32** se conecta à internet utilizando um módulo 4G com chip SIM.
- **Sensores de distância (HC-SR04)** são utilizados para detectar presença no banco traseiro.
- **O sensor PIR** detecta movimento dentro do carro.
- **O sensor de temperatura (DHT22)** monitora a temperatura interna e gera alertas caso a temperatura ultrapasse os limites seguros.
  
Quando o sistema identifica uma situação de risco, ele envia uma **notificação push** em tempo real via **Firebase Cloud Messaging (FCM)** para o responsável, mesmo que ele esteja distante do carro.

---

## ⚙️ **Tecnologias Utilizadas**

### **Hardware:**
- **ESP32**: Placa de desenvolvimento com Wi-Fi e 4G integrado, utilizada para se conectar à internet móvel.
- **Módulo SIM7000 (ou SIM800L)**: Módulo 4G com cartão SIM para enviar dados via rede móvel.

### **Sensores:**
- **HC-SR04**: Sensor ultrassônico para detecção de presença no banco traseiro.
- **PIR (Sensor de Movimento)**: Para detectar movimento dentro do veículo.
- **DHT22**: Sensor de temperatura e umidade para monitorar a temperatura dentro do carro.

### **Software:**
- **Arduino IDE**: Ambiente de desenvolvimento para programar o ESP32.
- **Firebase**:
  - **Realtime Database**: Para armazenar os dados e monitorar os alertas de temperatura, presença e movimento.
  - **Cloud Messaging (FCM)**: Para enviar notificações push em tempo real para dispositivos móveis.

### **Linguagens:**
- **C/C++ (Arduino)**: Usado para programar o ESP32.
- **JavaScript**: Utilizado para a integração futura com apps web ou móveis.

---

## 🔍 **Como Funciona o Sistema**

O sistema utiliza uma combinação de sensores para monitorar diferentes aspectos dentro do veículo:

### **Sensores:**
- **Sensor de Distância (HC-SR04)**: Detecta presença no banco traseiro.
- **Sensor PIR (Passivo Infravermelho)**: Monitora o movimento dentro do carro.
- **Sensor DHT22**: Monitora a temperatura no interior do veículo. Se a temperatura ultrapassar o limite seguro, ele dispara um alerta.

### **Fluxo de Ações:**
1. O **ESP32** se conecta à rede 4G via **modem SIM7000**.
2. O **ESP32** utiliza os sensores para monitorar:
   - **Presença no banco traseiro** (via HC-SR04).
   - **Movimento no veículo** (via PIR).
   - **Temperatura dentro do carro** (via DHT22).
3. Se qualquer uma dessas condições atingir um valor crítico, o **ESP32** envia os dados para o **Firebase**.
4. **Firebase Cloud Messaging (FCM)** dispara uma **notificação push** em tempo real para o celular cadastrado, alertando o responsável.

---

## 🛠️ **Como Executar o Projeto**

### **Pré-requisitos**
Antes de começar, você precisará dos seguintes componentes e configurações:

#### **Hardware:**
- **ESP32**
- **Módulo SIM7000 (4G)** com cartão SIM e plano de dados móveis.
- **Sensores**:
  - **HC-SR04 (Ultrassônico)** para detecção de presença.
  - **PIR (Sensor de Movimento)** para detectar atividade dentro do veículo.
  - **DHT22** para medir temperatura e umidade.

#### **Software:**
- **Arduino IDE** instalado.
- **Bibliotecas necessárias**:
  - **Firebase ESP32 Client (Mobizt)**: Para conectar o ESP32 ao Firebase.
  - **DHT Sensor Library**: Para ler dados do sensor DHT22.

#### **Configuração do Firebase:**
- Conta no **Firebase Console** com:
  - **Realtime Database configurado**.
  - **Cloud Messaging habilitado**.
  - **Chave de servidor (FCM) obtida**.

---

### **Passo a Passo**

#### **1. Configurar o Firebase:**
- No **Firebase Console**, crie um projeto e ative o **Realtime Database**.
- Habilite o **Cloud Messaging** e obtenha a **chave do servidor**.

#### **2. Configurar o Código do ESP32:**
- Conecte os sensores ao **ESP32** (HC-SR04, PIR, DHT22).
- Substitua as credenciais de Wi-Fi e Firebase no código do ESP32 (SSID, senha do Wi-Fi, URL do Firebase, chave de autenticação).
- Substitua as configurações do módulo 4G para garantir que o **ESP32** está configurado para conectar à rede 4G.

#### **3. Configuração do Frontend:**
- Crie o arquivo `index.html` com o código para gerar o token **FCM** e ativar as notificações push.
- Registre o token FCM no Firebase.
- Teste o envio de notificações no navegador.

#### **4. Teste o Sistema:**
- Simule o aumento de temperatura para gerar o alerta.
- Observe a notificação recebida no celular ou no navegador.

---

## 🚀 **Futuro do Projeto**

- **Aplicativo Nativo**: O desenvolvimento de um aplicativo móvel (Android/iOS) seria ótimo para integrar o sistema diretamente ao celular do usuário, fornecendo notificações e alertas.
- **Melhorias no Hardware**: Adicionar mais sensores, como umidade do ar e câmeras para monitoramento visual, além de **GPS** para identificar a localização do veículo.
- **Integração com Serviços de Emergência**: Considera-se a integração do sistema com serviços de emergência em caso de temperaturas críticas ou outros alertas.

