import { useWebSocket } from '@/lib/websocket';

export default function Header() {
  const { connected } = useWebSocket();
  
  return (
    <header className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
          WiFi Stories
        </h1>
        <span className={`${connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-sm py-1 px-3 rounded-full flex items-center`}>
          <span className={`w-2 h-2 ${connected ? 'bg-green-500' : 'bg-red-500'} rounded-full mr-2 animate-pulse`}></span>
          {connected ? 'Connesso' : 'Disconnesso'}
        </span>
      </div>
      <p className="text-gray-600 mt-2">Condividi storie con altri utenti sulla stessa rete WiFi</p>
    </header>
  );
}
