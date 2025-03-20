export interface Device {
  id: string;
  name: string;
  status: 'online' | 'offline';
  type: 'sensor' | 'switch';
  lastBlock: string;
  temperature?: number;
  humidity?: number;
  smokeLevel?: number;
  lightLevel?: number;
  voltageLevel?: number;
  lastUpdate: string;
  isActive?: boolean;
  linkedDeviceId?: string;
  triggerCondition?: {
    type: 'temperature' | 'smoke' | 'light' | 'voltage';
    threshold: number;
    action: 'activate' | 'deactivate';
  };
}

export interface Block {
  hash: string;
  previousHash: string;
  timestamp: number;
  data: {
    deviceId: string;
    temperature?: number;
    humidity?: number;
    smokeLevel?: number;
    lightLevel?: number;
    voltageLevel?: number;
    actionType?: 'SWITCH_ACTIVATION' | 'SENSOR_UPDATE';
    triggeredBy?: string;
    isActive?: boolean;
    sensorValue?: number;
  };
}