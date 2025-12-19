import { Music, Headphones, Waves } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  const scrollToCreator = () => {
    const element = document.getElementById('creator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative pt-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-gray-900 dark:text-white mb-6">
              Twórz muzykę z dźwięków domowych
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Odkryj nową formę ekspresji muzycznej. FL Home to innowacyjna platforma
              pozwalająca tworzyć profesjonalne utwory wykorzystując dźwięki z Twojego
              otoczenia - RTV, AGD i więcej.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                onClick={scrollToCreator}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Rozpocznij tworzenie
              </Button>
              <Button
                variant="outline"
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Dowiedz się więcej
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
              <Music className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">Kreator dźwięków</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Intuicyjny interfejs inspirowany FL Studio
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 transition-colors">
              <Headphones className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">Profesjonalna jakość</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Wysokiej jakości próbki dźwiękowe
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 col-span-2 transition-colors">
              <Waves className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-gray-900 dark:text-white mb-2">Nieograniczone możliwości</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Twórz unikalne kompozycje z dźwięków codzienności
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
