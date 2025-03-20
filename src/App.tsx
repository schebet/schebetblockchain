import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DeviceList } from './components/DeviceList';
import { BlockchainViewer } from './components/BlockchainViewer';
import { Documentation } from './components/Documentation';
import { Device, Block } from './types';
import { DatabaseIcon, LayersIcon, BookOpen, Menu, X } from 'lucide-react';
import { calculatePipeTemperature, calculateDaylightLevel } from './utils/sensorSimulation';

// Симулирани подаци
const mockDevices: Device[] = [
  {
    id: 'device-1',
    name: 'Сензор температуре куће бабе и деде',
    status: 'online',
    type: 'sensor',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    temperature: 13,
    humidity: 45,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'device-2',
    name: 'Грејалица',
    status: 'online',
    type: 'switch',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    temperature: 0,
    humidity: 0,
    lastUpdate: new Date().toISOString(),
    isActive: false,
    linkedDeviceId: 'device-1',
    triggerCondition: {
      type: 'temperature',
      threshold: 15,
      action: 'activate'
    }
  },
  {
    id: 'device-3',
    name: 'Сензор температуре цеви',
    status: 'online',
    type: 'sensor',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    temperature: 5,
    humidity: 0,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'device-4',
    name: 'Електровентил',
    status: 'online',
    type: 'switch',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    temperature: 0,
    humidity: 0,
    lastUpdate: new Date().toISOString(),
    isActive: false,
    linkedDeviceId: 'device-3',
    triggerCondition: {
      type: 'temperature',
      threshold: 1,
      action: 'activate'
    }
  },
  {
    id: 'device-5',
    name: 'Детектор дима',
    status: 'online',
    type: 'sensor',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    smokeLevel: 0,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'device-6',
    name: 'Сирена',
    status: 'online',
    type: 'switch',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    isActive: false,
    linkedDeviceId: 'device-5',
    lastUpdate: new Date().toISOString(),
    triggerCondition: {
      type: 'smoke',
      threshold: 1,
      action: 'activate'
    }
  },
  {
    id: 'device-7',
    name: 'Сензор осветљења',
    status: 'online',
    type: 'sensor',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    lightLevel: 100,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'device-8',
    name: 'Спољна расвета',
    status: 'online',
    type: 'switch',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    isActive: false,
    linkedDeviceId: 'device-7',
    lastUpdate: new Date().toISOString(),
    triggerCondition: {
      type: 'light',
      threshold: 20,
      action: 'activate'
    }
  },
  {
    id: 'device-9',
    name: 'Сензор напона',
    status: 'online',
    type: 'sensor',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    voltageLevel: 220,
    lastUpdate: new Date().toISOString()
  },
  {
    id: 'device-10',
    name: 'Аларм напона',
    status: 'online',
    type: 'switch',
    lastBlock: '0x' + Math.random().toString(16).slice(2),
    isActive: false,
    linkedDeviceId: 'device-9',
    lastUpdate: new Date().toISOString(),
    triggerCondition: {
      type: 'voltage',
      threshold: 150,
      action: 'activate'
    }
  }
];

const mockBlocks: Block[] = Array.from({ length: 5 }, (_, i) => ({
  hash: '0x' + Math.random().toString(16).slice(2),
  previousHash: i === 0 ? '0x0000000000000000' : '0x' + Math.random().toString(16).slice(2),
  timestamp: Date.now() - i * 60000,
  data: {
    deviceId: `device-${Math.floor(Math.random() * 10) + 1}`,
    temperature: 20 + Math.random() * 10,
    humidity: 40 + Math.random() * 20
  }
}));

function MainDashboard({ devices, blocks }: { devices: Device[], blocks: Block[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center mb-6">
            <DatabaseIcon className="mr-2" />
            <h2 className="text-2xl font-bold">Уређаји</h2>
          </div>
          <DeviceList devices={devices} />
        </div>
      </div>
      
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <LayersIcon className="mr-2" />
            <h2 className="text-2xl font-bold">Блокчејн</h2>
          </div>
          <BlockchainViewer blocks={blocks} />
        </div>
      </div>
    </div>
  );
}

function App() {
  const [devices, setDevices] = useState<Device[]>(mockDevices);
  const [blocks, setBlocks] = useState<Block[]>(mockBlocks);
  const [lastBlockTime, setLastBlockTime] = useState<number>(Date.now());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const checkAndUpdateDevices = () => {
    const currentTime = Date.now();
    
    devices.forEach(device => {
      if (device.type === 'sensor') {
        const linkedDevice = devices.find(d => d.linkedDeviceId === device.id);
        if (!linkedDevice || !linkedDevice.triggerCondition) return;

        let shouldActivate = false;
        let sensorValue = 0;

        switch (device.id) {
          case 'device-1':
            sensorValue = device.temperature || 0;
            shouldActivate = sensorValue <= linkedDevice.triggerCondition.threshold;
            break;
          case 'device-3':
            sensorValue = device.temperature || 0;
            shouldActivate = sensorValue <= linkedDevice.triggerCondition.threshold;
            break;
          case 'device-5':
            sensorValue = device.smokeLevel || 0;
            shouldActivate = sensorValue >= linkedDevice.triggerCondition.threshold;
            break;
          case 'device-7':
            sensorValue = device.lightLevel || 0;
            shouldActivate = sensorValue <= linkedDevice.triggerCondition.threshold;
            break;
          case 'device-9':
            sensorValue = device.voltageLevel || 0;
            shouldActivate = sensorValue <= linkedDevice.triggerCondition.threshold;
            break;
        }

        if (shouldActivate !== linkedDevice.isActive) {
          const newBlock: Block = {
            hash: '0x' + Math.random().toString(16).slice(2),
            previousHash: blocks[0].hash,
            timestamp: currentTime,
            data: {
              deviceId: linkedDevice.id,
              actionType: 'SWITCH_ACTIVATION',
              isActive: shouldActivate,
              triggeredBy: device.id,
              sensorValue: sensorValue
            }
          };

          setBlocks(prevBlocks => [newBlock, ...prevBlocks]);
          setLastBlockTime(currentTime);
          
          setDevices(prevDevices => 
            prevDevices.map(d => 
              d.id === linkedDevice.id 
                ? { ...d, isActive: shouldActivate, lastBlock: newBlock.hash, lastUpdate: new Date().toISOString() }
                : d
            )
          );
        }
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentHour = new Date().getHours();
      
      setDevices(prevDevices => 
        prevDevices.map(device => {
          if (device.type !== 'sensor') return device;

          let updates: Partial<Device> = {
            lastUpdate: new Date().toISOString()
          };

          switch (device.id) {
            case 'device-1':
              updates.temperature = 10 + Math.random() * 10;
              break;
            case 'device-3':
              updates.temperature = calculatePipeTemperature(currentHour);
              break;
            case 'device-5':
              updates.smokeLevel = Math.random() > 0.95 ? 1 : 0;
              break;
            case 'device-7':
              updates.lightLevel = calculateDaylightLevel(currentHour);
              break;
            case 'device-9':
              updates.voltageLevel = 220 + (Math.random() > 0.9 ? -80 : 0);
              break;
          }

          return { ...device, ...updates };
        })
      );

      checkAndUpdateDevices();
    }, 5000);

    return () => clearInterval(interval);
  }, [devices, blocks]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-md relative">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Блокчејн мрежа - Шебет село</h1>
              
              {/* Hamburger menu button for mobile */}
              <button 
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop navigation */}
              <nav className="hidden lg:block">
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="text-gray-600 hover:text-gray-900">Контролна табла</Link>
                  </li>
                  <li>
                    <Link to="/docs" className="flex items-center text-gray-600 hover:text-gray-900">
                      <BookOpen className="w-4 h-4 mr-1" />
                      Документација
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Mobile navigation */}
            {isMenuOpen && (
              <nav className="lg:hidden mt-4 border-t pt-4">
                <ul className="space-y-4">
                  <li>
                    <Link 
                      to="/" 
                      className="block text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Контролна табла
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/docs" 
                      className="flex items-center text-gray-600 hover:text-gray-900"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <BookOpen className="w-4 h-4 mr-1" />
                      Документација
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<MainDashboard devices={devices} blocks={blocks} />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;