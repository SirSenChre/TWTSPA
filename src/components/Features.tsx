import { Zap, Layout, Shield, Smartphone, Globe, RefreshCw } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Szybkość działania',
      description: 'Zoptymalizowana wydajność zapewniająca płynne tworzenie muzyki bez opóźnień.',
    },
    {
      icon: Layout,
      title: 'Intuicyjny interfejs',
      description: 'Design inspirowany FL Studio - profesjonalne narzędzia w przystępnej formie.',
    },
    {
      icon: Shield,
      title: 'Bezpieczeństwo',
      description: 'Certyfikaty SSL i zabezpieczenia zapewniające ochronę Twoich danych.',
    },
    {
      icon: Smartphone,
      title: 'Responsywność',
      description: 'Pełna funkcjonalność na komputerach, tabletach i smartfonach.',
    },
    {
      icon: Globe,
      title: 'Dostępność 24/7',
      description: 'Twórz muzykę kiedy chcesz, gdzie chcesz - platforma zawsze dostępna.',
    },
    {
      icon: RefreshCw,
      title: 'Regularne aktualizacje',
      description: 'Nowe dźwięki, funkcje i usprawnienia dodawane regularnie.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 dark:text-white mb-4">Nasza oferta</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Profesjonalna platforma do tworzenia muzyki z przemyślaną funkcjonalnością
            i nowoczesnym podejściem do produkcji dźwięku.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
            >
              <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-red-600 to-red-700 rounded-lg p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="mb-2">1000+</div>
              <p className="text-red-100">Unikalnych dźwięków</p>
            </div>
            <div>
              <div className="mb-2">24/7</div>
              <p className="text-red-100">Dostępność platformy</p>
            </div>
            <div>
              <div className="mb-2">100%</div>
              <p className="text-red-100">Satysfakcji użytkowników</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
