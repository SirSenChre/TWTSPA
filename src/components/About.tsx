import { Target, Users, Lightbulb, Award } from 'lucide-react';

export function About() {
  const features = [
    {
      icon: Target,
      title: 'Nasza misja',
      description: 'Demokratyzacja produkcji muzycznej poprzez wykorzystanie dźwięków z codziennego życia.',
    },
    {
      icon: Users,
      title: 'Dla kogo',
      description: 'Dla producentów muzycznych, entuzjastów dźwięku i wszystkich kreatywnych osób.',
    },
    {
      icon: Lightbulb,
      title: 'Innowacja',
      description: 'Unikalne połączenie technologii audio z interfejsem inspirowanym FL Studio.',
    },
    {
      icon: Award,
      title: 'Jakość',
      description: 'Profesjonalne narzędzia i wysoka jakość dźwięku w przystępnej formie.',
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 dark:text-white mb-4">O nas</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            FL Home to platforma stworzona dla pasjonatów muzyki, którzy chcą odkrywać
            nowe brzmienia w nietypowych miejscach. Inspirowani funkcjonalnością FL Studio,
            stworzyliśmy narzędzie łączące profesjonalizm z prostotą użycia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-red-600 transition-colors"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
