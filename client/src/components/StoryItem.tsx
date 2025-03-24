import React from 'react';

interface StoryItemProps {
  username: string;
  content: string;
  timestamp?: number;
}

export default function StoryItem({ username, content, timestamp }: StoryItemProps) {
  // Generate color based on username (deterministic)
  const generateColor = (username: string) => {
    const charCode = username.charCodeAt(0);
    const hue = Math.floor((charCode * 10) % 360);
    return {
      from: `hsl(${hue}, 70%, 65%)`,
      to: `hsl(${(hue + 40) % 360}, 70%, 65%)`,
    };
  };
  
  const { from, to } = generateColor(username);
  const initial = username.charAt(0).toUpperCase();
  
  return (
    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-gray-200 transition-all">
      <div className="flex items-start space-x-3">
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" 
          style={{ background: `linear-gradient(to right, ${from}, ${to})` }}
        >
          {initial}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">
            {username}
          </p>
          <p className="text-gray-700 mt-1">
            {content}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            {timestamp 
              ? new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              : 'Appena condivisa'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

