import { Mail, Phone, MapPin, Facebook, Instagram, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useState } from 'react';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock form submission
    alert('Dziękujemy za wiadomość! Skontaktujemy się wkrótce.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 dark:text-white mb-4">Kontakt</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Masz pytania? Chcesz dowiedzieć się więcej? Skontaktuj się z nami!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-gray-900 dark:text-white mb-6">Informacje kontaktowe</h3>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white mb-1">Email</div>
                  <p className="text-gray-600 dark:text-gray-400">kontakt@flhome.pl</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white mb-1">Telefon</div>
                  <p className="text-gray-600 dark:text-gray-400">+48 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-red-600 rounded flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900 dark:text-white mb-1">Adres</div>
                  <p className="text-gray-600 dark:text-gray-400">ul. Muzyczna 1<br />00-001 Warszawa</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-gray-900 dark:text-white mb-4">Śledź nas w mediach społecznościowych</h4>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 hover:bg-red-600 rounded flex items-center justify-center transition-colors group"
                >
                  <Facebook className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-200 dark:bg-gray-700 hover:bg-red-600 rounded flex items-center justify-center transition-colors group"
                >
                  <Instagram className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-white" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-8 transition-colors">
            <h3 className="text-gray-900 dark:text-white mb-6">Wyślij wiadomość</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Imię i nazwisko
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  placeholder="Jan Kowalski"
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  placeholder="jan@example.com"
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">
                  Wiadomość
                </label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  placeholder="Twoja wiadomość..."
                  rows={5}
                  className="w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                Wyślij wiadomość
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
