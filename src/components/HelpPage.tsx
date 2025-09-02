import React, { useState } from 'react';
import { Play, BookOpen, ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  thumbnail: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const HelpPage: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const tutorials: Tutorial[] = [
    {
      id: '1',
      title: 'Comment commander sur Alibaba',
      description: 'Guide complet pour passer une commande sur Alibaba et indiquer la bonne adresse de livraison',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '8:30',
      thumbnail: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop&crop=center'
    },
    {
      id: '2',
      title: 'Acheter sur Taobao - Guide débutant',
      description: 'Tutoriel étape par étape pour naviguer sur Taobao et faire ses achats en toute sécurité',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '12:15',
      thumbnail: 'https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop&crop=center'
    },
    {
      id: '3',
      title: 'Utiliser votre code client iKite',
      description: 'Comment bien utiliser votre code client pour identifier vos colis',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '5:45',
      thumbnail: 'https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop&crop=center'
    },
    {
      id: '4',
      title: 'Workflow complet iKite',
      description: 'De la commande à la réception : le processus complet expliqué',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '15:20',
      thumbnail: 'https://images.pexels.com/photos/6169668/pexels-photo-6169668.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&fit=crop&crop=center'
    }
  ];

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'Comment obtenir mon code client ?',
      answer: 'Cliquez sur "Obtenir un code fidélité" dans le header et remplissez le formulaire. Votre code suivra le format KITE-[votre numéro de téléphone].',
      category: 'Compte'
    },
    {
      id: '2',
      question: 'Où dois-je indiquer mon code client ?',
      answer: 'Votre code client doit être clairement visible sur l\'emballage de votre colis. Demandez à votre fournisseur de l\'indiquer sur l\'étiquette d\'expédition.',
      category: 'Envoi'
    },
    {
      id: '3',
      question: 'Que faire si mon colis est perdu ?',
      answer: 'Contactez immédiatement notre support avec votre code client et les détails de votre commande. Nous tracerons votre colis avec le transporteur.',
      category: 'Support'
    },
    {
      id: '4',
      question: 'Comment utiliser mes points de fidélité ?',
      answer: 'Vos points se convertissent en réductions lors de la livraison. Informez notre livreur que vous souhaitez utiliser vos points. 100 points = 10,000 FCFA de réduction.',
      category: 'Fidélité'
    },
    {
      id: '5',
      question: 'Quels sont les délais de livraison ?',
      answer: 'Les délais varient entre 15 et 25 jours selon le convoi choisi et votre localisation finale au Mali.',
      category: 'Livraison'
    },
    {
      id: '6',
      question: 'Comment choisir entre une expedition express et standard ?',
      answer: 'Dès que votre fournisseur vous communique le jour de livraison de votre colis chez le transiteur et vous envoie la photo de votre colis, communiquez moi votre choix d\'expedition sur whatsapp avec la photo du colis.',
      category: 'option'
    }
  ];

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Centre d'aide</h2>
        <p className="text-gray-600 text-sm sm:text-base">Tutoriels vidéo et réponses à vos questions les plus fréquentes</p>
      </div>

      {/* Video Tutorials */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Tutoriels Vidéo</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {tutorials.map((tutorial) => (
            <div key={tutorial.id} className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden hover:border-red-300 transition-all">
              {activeVideo === tutorial.id ? (
                <div className="aspect-video">
                  <iframe
                    src={tutorial.videoUrl}
                    title={tutorial.title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div 
                  className="relative aspect-video cursor-pointer group"
                  onClick={() => setActiveVideo(tutorial.id)}
                >
                  <img 
                    src={tutorial.thumbnail} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform">
                      <Play className="h-8 w-8 text-red-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                    {tutorial.duration}
                  </div>
                </div>
              )}
              
              <div className="p-3 sm:p-4">
                <h4 className="font-semibold text-gray-900 mb-2">{tutorial.title}</h4>
                <p className="text-gray-600 text-xs sm:text-sm mb-3">{tutorial.description}</p>
                {activeVideo === tutorial.id && (
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-red-600 text-sm hover:text-red-700"
                  >
                    Fermer la vidéo
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* External Resources */}
      <div className="mb-12">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Ressources Externes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <a
            href="https://www.alibaba.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-red-600">Alibaba.com</h4>
                <p className="text-xs sm:text-sm text-gray-600">Plateforme B2B</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
            </div>
          </a>

          <a
            href="https://www.taobao.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-orange-600">Taobao</h4>
                <p className="text-xs sm:text-sm text-gray-600">Marketplace chinois</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-orange-600" />
            </div>
          </a>

          <a
            href="https://www.1688.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-xl transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 group-hover:text-red-600">1688.com</h4>
                <p className="text-xs sm:text-sm text-gray-600">Vente en gros</p>
              </div>
              <ExternalLink className="h-5 w-5 text-gray-500 group-hover:text-red-600" />
            </div>
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Questions Fréquemment Posées</h3>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg border border-gray-200 shadow-xl">
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-gray-900">{faq.question}</h4>
                  <span className="text-xs sm:text-sm text-red-600">{faq.category}</span>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              {expandedFAQ === faq.id && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpPage;