import { Button } from '@/components/ui/button';
import { useStories } from '@/hooks/use-stories';
import StoryItem from './StoryItem';

export default function StoriesList() {
  const { stories, isLoading, error, refetch } = useStories();
  
  const handleRefresh = () => {
    refetch();
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Storie condivise</h2>
        
        <Button 
          variant="ghost"
          size="icon"
          onClick={handleRefresh}
          className="rounded-full text-primary hover:bg-blue-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
          <span className="sr-only">Aggiorna</span>
        </Button>
      </div>
      
      <div className="space-y-4">
        {isLoading && (
          <div className="py-8 text-center text-gray-500">
            <div className="flex justify-center mb-2">
              <svg className="animate-spin h-8 w-8 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <p>Caricamento delle storie...</p>
          </div>
        )}
        
        {!isLoading && error && (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 mb-4 text-red-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Impossibile caricare le storie</h3>
            <p className="mt-1 text-gray-500">Si è verificato un errore di connessione</p>
            <Button 
              onClick={handleRefresh}
              variant="outline"
              className="mt-3"
            >
              Riprova 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        )}
        
        {!isLoading && !error && stories && Object.keys(stories).length === 0 && (
          <div className="py-8 text-center">
            <div className="mx-auto w-16 h-16 mb-4 text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900">Nessuna storia</h3>
            <p className="mt-1 text-gray-500">Sii il primo a condividere una storia</p>
          </div>
        )}
        
        {!isLoading && !error && stories && Object.keys(stories).length > 0 && (
          <div className="space-y-4">
            {Object.entries(stories).reverse().map(([username, content]) => (
              <StoryItem key={username} username={username} content={content} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
