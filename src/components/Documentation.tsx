import React from 'react';
import { BookOpen, Shield, Cpu, Network, Wrench, Zap, Server, Database, GitBranch, Lock } from 'lucide-react';

export function Documentation() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Документација система</h1>
      
      <section className="mb-12">
        <div className="flex items-center mb-4">
          <Database className="mr-2" />
          <h2 className="text-2xl font-semibold">Архитектура блокчејна</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Основни концепти</h3>
            <p className="text-gray-700 mb-4">
              Блокчејн представља дистрибуирану базу података која чува непроменљиву,
              хронолошки уређену листу криптографски потписаних записа груписаних у блокове.
              Сваки блок је повезан са претходним, формирајући ланац који гарантује
              интегритет и непроменљивост података.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <GitBranch className="mr-2 text-blue-600" />
                <h4 className="text-lg font-semibold">Чворови (Nodes)</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Сваки ESP8266 уређај представља чвор у мрежи</li>
                <li>Чворови комуницирају међусобно у P2P мрежи</li>
                <li>Сваки чвор чува копију целог ланца</li>
                <li>Аутоматска синхронизација између чворова</li>
                <li>Верификација нових блокова пре додавања</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Lock className="mr-2 text-green-600" />
                <h4 className="text-lg font-semibold">Блокови (Blocks)</h4>
              </div>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Садрже временску ознаку креирања</li>
                <li>Хеш претходног блока за повезивање</li>
                <li>Подаци о стању сензора и акцијама</li>
                <li>Дигитални потпис за верификацију</li>
                <li>Merkle стабло за ефикасну верификацију</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Консензус механизам</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                Наш систем користи модификовани Proof of Authority (PoA) консензус механизам,
                прилагођен IoT окружењу:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Ауторизовани чворови могу да креирају нове блокове</li>
                <li>Временски печат за синхронизацију догађаја</li>
                <li>Аутоматска резолуција конфликата базирана на временским ознакама</li>
                <li>Оптимизован за IoT уређаје са ограниченим ресурсима</li>
                <li>Брза финализација трансакција</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Дистрибуирана база података</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-4">
                Систем користи дистрибуирану архитектуру за чување података:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Редундантно чување података на свим чворовима</li>
                <li>Аутоматска репликација између чворова</li>
                <li>Отпорност на отказе појединачних чворова</li>
                <li>Криптографска заштита података</li>
                <li>Ефикасно претраживање историје догађаја</li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Процес креирања блока</h3>
            <div className="bg-blue-50 p-4 rounded-lg">
              <ol className="list-decimal pl-5 space-y-3 text-gray-700">
                <li>
                  <strong>Иницијализација:</strong> Чвор детектује значајну промену
                  стања (нпр. температура испод прага)
                </li>
                <li>
                  <strong>Креирање блока:</strong> Формирање новог блока са подацима
                  о догађају и временском ознаком
                </li>
                <li>
                  <strong>Верификација:</strong> Провера исправности података и
                  повезаности са претходним блоком
                </li>
                <li>
                  <strong>Консензус:</strong> Дистрибуција блока осталим чворовима
                  за потврду
                </li>
                <li>
                  <strong>Финализација:</strong> Додавање блока у ланац након
                  постизања консензуса
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-4">
          <Server className="mr-2" />
          <h2 className="text-2xl font-semibold">ESP8266 Хардвер</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold">Спецификације хардвера</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">ESP8266 NodeMCU</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Процесор: L106 32-bit RISC, 80MHz</li>
                <li>RAM: 80KB за корисничке податке</li>
                <li>Flash меморија: 4MB</li>
                <li>Wi-Fi: IEEE 802.11 b/g/n</li>
                <li>GPIO пинови: 11 доступних</li>
                <li>ADC: 1 канал, 10-bit резолуција</li>
                <li>Напајање: 3.3V (регулатор на плочи)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Напајање система</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>Главно напајање: 220V AC</li>
                <li>Конверзија: AC-DC конвертер, 12V 2A</li>
                <li>Стабилизација: LM1117 3.3V регулатор за ESP8266</li>
                <li>Backup: UPS систем са Li-ion батеријом, 2200mAh</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-4">
          <Wrench className="mr-2" />
          <h2 className="text-2xl font-semibold">Сензори и актуатори</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Сензори температуре</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>DS18B20</strong>
                  <ul className="list-circle pl-6">
                    <li>Опсег: -55°C до +125°C</li>
                    <li>Тачност: ±0.5°C</li>
                    <li>Водоотпорна верзија за спољну употребу</li>
                    <li>OneWire интерфејс (D2 пин)</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Детектор дима</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>MQ-2</strong>
                  <ul className="list-circle pl-6">
                    <li>Детекција: дим, LPG, CO</li>
                    <li>Аналогни излаз (A0 пин)</li>
                    <li>Дигитални излаз за праг (D5 пин)</li>
                    <li>Напајање: 5V</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Сензор осветљења</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>BH1750</strong>
                  <ul className="list-circle pl-6">
                    <li>Опсег: 1-65535 lux</li>
                    <li>I2C интерфејс (D1/D2 пинови)</li>
                    <li>Висока прецизност</li>
                    <li>Напајање: 3.3V</li>
                  </ul>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold">Актуатори</h4>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Релеји</strong>
                  <ul className="list-circle pl-6">
                    <li>4-канални релеј модул</li>
                    <li>Оптокаплер изолација</li>
                    <li>Контрола: D5-D8 пинови</li>
                    <li>Максимално оптерећење: 10A/250V AC</li>
                  </ul>
                </li>
                <li>
                  <strong>Електровентил</strong>
                  <ul className="list-circle pl-6">
                    <li>Соленоидни вентил 12V DC</li>
                    <li>Нормално затворен (NC)</li>
                    <li>Контрола преко релеја</li>
                  </ul>
                </li>
                <li>
                  <strong>Сирена</strong>
                  <ul className="list-circle pl-6">
                    <li>12V DC пиезо сирена</li>
                    <li>95dB јачина звука</li>
                    <li>Контрола преко релеја</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-4">
          <Zap className="mr-2" />
          <h2 className="text-2xl font-semibold">ESP8266 Код</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Основни код за ESP8266</h3>
            <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
{`#include <ESP8266WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <BH1750.h>

// Пинови
#define ONE_WIRE_BUS D2     // DS18B20 температурни сензор
#define RELAY_1 D5          // Релеј за грејање
#define RELAY_2 D6          // Релеј за вентил
#define RELAY_3 D7          // Релеј за сирену
#define RELAY_4 D8          // Релеј за осветљење
#define SMOKE_ANALOG A0     // MQ-2 аналогни улаз
#define SMOKE_DIGITAL D4    // MQ-2 дигитални улаз

// Објекти
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);
BH1750 lightMeter;

// WiFi подешавања
const char* ssid = "YourSSID";
const char* password = "YourPassword";

// Blockchain node адреса
const char* nodeAddress = "http://your-node-address";

void setup() {
  Serial.begin(115200);
  
  // Иницијализација пинова
  pinMode(RELAY_1, OUTPUT);
  pinMode(RELAY_2, OUTPUT);
  pinMode(RELAY_3, OUTPUT);
  pinMode(RELAY_4, OUTPUT);
  pinMode(SMOKE_DIGITAL, INPUT);
  
  // Иницијализација сензора
  sensors.begin();
  Wire.begin();
  lightMeter.begin();
  
  // Повезивање на WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\\nWiFi повезан");
}

void loop() {
  // Читање температуре
  sensors.requestTemperatures();
  float tempC = sensors.getTempCByIndex(0);
  
  // Читање осветљења
  float lux = lightMeter.readLightLevel();
  
  // Читање дима
  int smokeLevel = analogRead(SMOKE_ANALOG);
  bool smokeDetected = digitalRead(SMOKE_DIGITAL);
  
  // Слање података на blockchain
  sendToBlockchain(tempC, lux, smokeLevel);
  
  // Провера услова и активација актуатора
  if (tempC < 15) {
    digitalWrite(RELAY_1, HIGH); // Укључи грејање
  } else {
    digitalWrite(RELAY_1, LOW);  // Искључи грејање
  }
  
  if (smokeDetected) {
    digitalWrite(RELAY_3, HIGH); // Укључи сирену
  } else {
    digitalWrite(RELAY_3, LOW);  // Искључи сирену
  }
  
  if (lux < 20) {
    digitalWrite(RELAY_4, HIGH); // Укључи осветљење
  } else {
    digitalWrite(RELAY_4, LOW);  // Искључи осветљење
  }
  
  delay(5000); // Пауза 5 секунди
}`}
            </pre>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-4">
          <Shield className="mr-2" />
          <h2 className="text-2xl font-semibold">Паметни уговори</h2>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-xl font-semibold">Логика паметних уговора</h3>
          <p>Систем користи следеће паметне уговоре за аутоматизацију:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Контрола грејања:</strong> Активира се када температура падне испод 15°C
              код бабе и деде, аутоматски укључујући грејање ради спречавања смрзавања.
            </li>
            <li>
              <strong>Заштита водоводних цеви:</strong> Када температура падне испод 1°C,
              активира електровентил који пушта воду да тече, спречавајући смрзавање цеви.
            </li>
            <li>
              <strong>Противпожарна заштита:</strong> При детекцији дима, моментално активира
              сирену ради упозорења.
            </li>
            <li>
              <strong>Управљање осветљењем:</strong> Аутоматски пали спољно осветљење када
              ниво природног светла падне испод 20%.
            </li>
            <li>
              <strong>Заштита од пада напона:</strong> Активира аларм када напон падне испод
              150V ради заштите уређаја.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}