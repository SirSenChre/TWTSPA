import { Facebook, Instagram, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white">FL</span>
              </div>
              <span className="text-white">FL Home</span>
            </div>
            <p className="text-gray-400 dark:text-gray-500">
              Twórz profesjonalną muzykę z dźwięków domowych.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Nawigacja</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-400 dark:text-gray-500 hover:text-red-600 transition-colors">
                  Strona główna
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 dark:text-gray-500 hover:text-red-600 transition-colors">
                  O nas
                </a>
              </li>
              <li>
                <a href="#creator" className="text-gray-400 dark:text-gray-500 hover:text-red-600 transition-colors">
                  Kreator muzyki
                </a>
              </li>
              <li>
                <a href="#offer" className="text-gray-400 dark:text-gray-500 hover:text-red-600 transition-colors">
                  Oferta
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>kontakt@flhome.pl</li>
              <li>+48 123 456 789</li>
              <li>ul. Muzyczna 1</li>
              <li>00-001 Warszawa</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Media społecznościowe</h4>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:kontakt@flhome.pl"
                className="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-red-600 rounded flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>© {currentYear} FL Home. Wszystkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
