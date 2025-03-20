import React from 'react';
import { Block } from '../types';
import { LinkIcon, AlertTriangle } from 'lucide-react';

interface BlockchainViewerProps {
  blocks: Block[];
}

export function BlockchainViewer({ blocks }: BlockchainViewerProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Блокчејн историја</h2>
      <div className="space-y-4">
        {blocks.map((block, index) => (
          <div key={block.hash} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold">Блок #{blocks.length - index}</span>
              <span className="text-sm text-gray-500">
                {new Date(block.timestamp).toLocaleString('sr-Cyrl')}
              </span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <LinkIcon size={16} className="mr-2" />
                <span className="font-mono">Хеш: {block.hash.slice(0, 16)}...</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-mono">Претходни хеш: {block.previousHash.slice(0, 16)}...</span>
              </div>
              <div className="mt-4 bg-gray-50 p-4 rounded">
                <h4 className="font-semibold mb-2">Подаци:</h4>
                <p>Уређај: {block.data.deviceId}</p>
                {block.data.temperature !== undefined && (
                  <p>Температура: {block.data.temperature}°C</p>
                )}
                {block.data.humidity !== undefined && (
                  <p>Влажност: {block.data.humidity}%</p>
                )}
                {block.data.actionType === 'SWITCH_ACTIVATION' && (
                  <div className="mt-2 flex items-center text-orange-600">
                    <AlertTriangle size={16} className="mr-2" />
                    <p>Аутоматска акција: {block.data.isActive ? 'Укључивање' : 'Искључивање'} грејања</p>
                    <p className="ml-2 text-sm text-gray-600">Окидач: {block.data.triggeredBy}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}