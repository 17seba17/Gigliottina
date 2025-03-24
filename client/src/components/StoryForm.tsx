import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export default function StoryForm() {
  const [username, setUsername] = useState('');
  const [story, setStory] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleClear = () => {
    setUsername('');
    setStory('');
  };

  const handleSubmit = async () => {
    if (!username.trim() || !story.trim()) {
      toast({
        title: "Errore",
        description: "Inserisci sia un username che una storia!",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await apiRequest('POST', '/api/stories', {
        username: username.trim(),
        content: story.trim()
      });
      
      toast({
        title: "Storia condivisa",
        description: "La tua storia è stata condivisa con successo!",
      });
      
      // Clear only the story field, keep the username
      setStory('');
    } catch (error) {
      toast({
        title: "Errore",
        description: "Si è verificato un errore. Riprova più tardi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8 transition-all hover:shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Condividi la tua storia</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Nome utente</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </span>
            <Input 
              id="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10"
              placeholder="Come vuoi essere chiamato?"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="storia" className="block text-sm font-medium text-gray-700 mb-1">La tua storia</label>
          <Textarea 
            id="storia" 
            rows={4} 
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="Racconta qualcosa di interessante..."
          />
        </div>
        
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg> 
            Cancella
          </Button>
          
          <Button 
            disabled={isSubmitting}
            onClick={handleSubmit}
            className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-primary hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Invio...
              </>
            ) : (
              <>
                Condividi
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
