<<<<<<< HEAD
🚗 Alerta Carro Seguro
📌 Problema

Todos os anos, infelizmente, diversos casos de bebês, crianças e animais esquecidos dentro de veículos resultam em tragédias por causa do superaquecimento interno do carro.
Mesmo em paradas rápidas, alguns minutos são suficientes para a temperatura interna atingir níveis fatais.

Essa é a dor que este projeto busca resolver: como evitar que vidas sejam perdidas por esquecimento.

💡 Solução Proposta
O Alerta Carro Seguro é um protótipo de sistema IoT (Internet das Coisas) que utiliza um ESP32 com sensores para detectar presença e temperatura dentro do veículo.
Quando uma situação de risco é identificada, o sistema envia notificações em tempo real via Firebase Cloud Messaging (FCM) para alertar o responsável, mesmo que ele esteja distante do carro.
Dessa forma, oferecemos uma camada extra de segurança para pais, responsáveis e donos de pets.

⚙️ Tecnologias Utilizadas
Hardware: ESP32, sensores ultrassônicos (HC-SR04), sensor de movimento PIR, sensor de temperatura/humidade (DHT11/DHT22).
Software:
Arduino IDE
    para programação do ESP32.
Firebase Realtime Database
    para integração em tempo real.
Firebase Cloud Messaging (FCM)
    para envio de notificações push.

Linguagens: C/C++ (Arduino) e JavaScript (para integração futura em app ou web).

🔍 Como Funciona
O ESP32 conecta-se ao Wi-Fi configurado.
Os sensores monitoram:
    Distância → detecta se há presença no banco traseiro.
    Movimento → identifica atividade dentro do veículo.
    Temperatura → dispara alerta se o calor ultrapassar limites seguros.
Caso seja detectada presença em risco, o ESP32 envia dados ao Firebase.
O Firebase dispara uma notificação push em tempo real para o celular cadastrado.

🛠️ Como Executar o Projeto
1. Pré-requisitos

Ter instalado:
    Arduino IDE
    Biblioteca Firebase ESP32 Client (Mobizt)
    Biblioteca DHT Sensor
Conta configurada no Firebase Console com:
    Realtime Database criado
    Cloud Messaging habilitado
    Chave de servidor (FCM) obtida
=======
# alerta_carro_seguro
>>>>>>> 6220d15b6d9847ff26e7c015683fb469a6509dc0
