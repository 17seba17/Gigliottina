import Header from '@/components/Header';
import StoryForm from '@/components/StoryForm';
import StoriesList from '@/components/StoriesList';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="bg-gray-50 font-sans text-gray-800 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Header />
        <StoryForm />
        <StoriesList />
        <Footer />
      </div>
    </div>
  );
}
