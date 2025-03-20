import React from 'react';
import { Device } from '../types';
import { ThermometerIcon, DropletIcon, CircleDot, ToggleLeft, Link2, Flame, Sun, Zap } from 'lucide-react';

interface DeviceListProps {
  devices: Device[];
}

export function DeviceList({ devices }: DeviceListProps) {
  const getLinkedDeviceName = (deviceId: string | undefined) => {
    if (!deviceId) return null;
    const device = devices.find(d => d.id === deviceId);
    return device ? device.name : null;
  };

  const getSensorValue = (device: Device) => {
    if (device.type !== 'sensor') return null;

    switch (device.id) {
      case 'device-1':
      case 'device-3':
        return (
          <div className="flex items-center">
            <ThermometerIcon className="mr-2" />
            <span>Температура: {device.temperature}°C</span>
          </div>
        );
      case 'device-5':
        return (
          <div className="flex items-center">
            <Flame className={`mr-2 ${device.smokeLevel ? 'text-red-500' : 'text-gray-400'}`} />
            <span>Ниво дима: {device.smokeLevel ? 'Детектован' : 'Нормалан'}</span>
          </div>
        );
      case 'device-7':
        return (
          <div className="flex items-center">
            <Sun className="mr-2" />
            <span>Ниво осветљења: {device.lightLevel}%</span>
          </div>
        );
      case 'device-9':
        return (
          <div className="flex items-center">
            <Zap className={`mr-2 ${(device.voltageLevel || 0) < 150 ? 'text-red-500' : 'text-green-500'}`} />
            <span>Напон: {device.voltageLevel}V</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => (
        <div key={device.id} className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">{device.name}</h3>
            <div className={`flex items-center ${device.status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
              <CircleDot size={16} className="mr-2" />
              <span>{device.status === 'online' ? 'На мрежи' : 'Ван мреже'}</span>
            </div>
          </div>
          
          {device.type === 'sensor' && (
            <div className="space-y-3">
              {getSensorValue(device)}
            </div>
          )}

          {device.type === 'switch' && (
            <div className="space-y-3">
              <div className="flex items-center">
                <ToggleLeft className={`mr-2 ${device.isActive ? 'text-green-500' : 'text-gray-400'}`} />
                <span>Статус: {device.isActive ? 'Активан' : 'Неактиван'}</span>
              </div>
              {device.triggerCondition && (
                <div className="text-sm text-gray-600">
                  <p>Аутоматска контрола:</p>
                  {device.triggerCondition.type === 'temperature' && (
                    <p>Активирај када температура падне испод {device.triggerCondition.threshold}°C</p>
                  )}
                  {device.triggerCondition.type === 'smoke' && (
                    <p>Активирај када се детектује дим</p>
                  )}
                  {device.triggerCondition.type === 'light' && (
                    <p>Активирај када осветљење падне испод {device.triggerCondition.threshold}%</p>
                  )}
                  {device.triggerCondition.type === 'voltage' && (
                    <p>Активирај када напон падне испод {device.triggerCondition.threshold}V</p>
                  )}
                </div>
              )}
            </div>
          )}

          {device.linkedDeviceId && (
            <div className="mt-3 flex items-center text-blue-600">
              <Link2 size={16} className="mr-2" />
              <span>Повезан са: {getLinkedDeviceName(device.linkedDeviceId)}</span>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Последњи блок: {device.lastBlock.slice(0, 8)}...</p>
            <p>Ажурирано: {new Date(device.lastUpdate).toLocaleString('sr-Cyrl')}</p>
          </div>
        </div>
      ))}
    </div>
  );
}