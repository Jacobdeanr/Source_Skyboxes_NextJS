import React from 'react';

interface TechnicalDetailsProps {
  resolution?: string;
  fileSize?: string;
  compatibility?: string;
}

export default function TechnicalDetails({ 
  resolution = '2048x1024', 
  fileSize = 'N/A', 
  compatibility = 'Source Engine' 
}: TechnicalDetailsProps) {
  return (
    <div className="bg-neutral-800/50 p-4 rounded-md">
      <h3 className="text-lg font-medium mb-4">Technical Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-neutral-400">Resolution</p>
          <p className="text-neutral-200">{resolution}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Format</p>
          <p className="text-neutral-200">HDR</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">File Size</p>
          <p className="text-neutral-200">{fileSize}</p>
        </div>
        <div>
          <p className="text-sm text-neutral-400">Compatibility</p>
          <p className="text-neutral-200">{compatibility}</p>
        </div>
      </div>
    </div>
  );
}
