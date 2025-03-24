import { useWebSocket } from '@/lib/websocket';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

export function useStories() {
  const { stories: wsStories, connected } = useWebSocket();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['/api/stories'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/stories');
      return await response.json();
    },
    // Use WebSocket data when available, otherwise fetch from API
    enabled: !connected || Object.keys(wsStories).length === 0
  });
  
  // Prefer WebSocket data when connected
  const stories = connected && Object.keys(wsStories).length > 0 ? wsStories : data;
  
  return {
    stories,
    isLoading: isLoading && !stories,
    error,
    refetch
  };
}
