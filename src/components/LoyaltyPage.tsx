import React, { useState } from 'react';
import { Gift, TrendingUp, Star, Coins, Info, Search, AlertCircle, User, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LoyaltyUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  client_code: string;
  loyalty_points: number;
  created_at: string;
}

interface LoyaltyTransaction {
  id: string;
  points: number;
  type: 'earned' | 'spent' | 'converted';
  description: string;
  created_at: string;
}

const LoyaltyPage: React.FC = () => {
  const [clientCode, setClientCode] = useState('');
  const [loyaltyUser, setLoyaltyUser] = useState<LoyaltyUser | null>(null);
  const [transactions, setTransactions] = useState<LoyaltyTransaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchLoyaltyAccount = async () => {
    if (!clientCode.trim()) {
      setError('Veuillez entrer votre code fidélité');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Rechercher l'utilisateur par code client
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('client_code', clientCode.trim().toUpperCase())
        .single();

      if (userError || !userData) {
        setError('Code fidélité introuvable. Vérifiez votre code ou demandez-en un nouveau.');
        setLoyaltyUser(null);
        setTransactions([]);
        return;
      }

      setLoyaltyUser(userData);

      // Récupérer les transactions
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('loyalty_transactions')
        .select('*')
        .eq('user_id', userData.id)
        .order('created_at', { ascending: false });

      if (transactionsError) {
        console.error('Erreur transactions:', transactionsError);
        setTransactions([]);
      } else {
        setTransactions(transactionsData || []);
      }

    } catch (err) {
      console.error('Erreur recherche:', err);
      setError('Erreur lors de la recherche. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const pointsToFCFA = (points: number): number => points * 100;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getLoyaltyLevel = (points: number) => {
    if (points >= 1000) return { name: 'Platinum', color: 'text-purple-600', bgColor: 'bg-purple-50' };
    if (points >= 500) return { name: 'Gold', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
    if (points >= 200) return { name: 'Silver', color: 'text-gray-600', bgColor: 'bg-gray-50' };
    return { name: 'Bronze', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  };

  const loyaltyLevel = getLoyaltyLevel(loyaltyUser?.loyalty_points || 0);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Programme de Fidélité</h2>
        <p className="text-gray-600 text-sm sm:text-base">Consultez vos points de fidélité avec votre code client</p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Consulter mes points</h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={clientCode}
              onChange={(e) => setClientCode(e.target.value.toUpperCase())}
              placeholder="Entrez votre code fidélité (ex: IZI-70123456)"
              className="w-full px-4 py-3 border border-gray-300 bg-white text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base font-mono"
            />
          </div>
          <button
            onClick={searchLoyaltyAccount}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Recherche...</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>Rechercher</span>
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        )}
      </div>

      {loyaltyUser && (
        <>
          {/* User Info */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations du compte</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Nom</p>
                  <p className="font-medium text-gray-900">{loyaltyUser.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Téléphone</p>
                  <p className="font-medium text-gray-900">{loyaltyUser.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium text-gray-900 truncate">{loyaltyUser.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Points Balance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="bg-red-600 rounded-xl p-4 sm:p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-xs sm:text-sm">Points disponibles</p>
                  <p className="text-2xl sm:text-3xl font-bold">{loyaltyUser.loyalty_points}</p>
                </div>
                <Gift className="h-8 w-8 sm:h-10 sm:w-10 text-red-200" />
              </div>
            </div>

            <div className="bg-green-600 rounded-xl p-4 sm:p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-xs sm:text-sm">Valeur en FCFA</p>
                  <p className="text-2xl sm:text-3xl font-bold">{pointsToFCFA(loyaltyUser.loyalty_points).toLocaleString()}</p>
                </div>
                <Coins className="h-8 w-8 sm:h-10 sm:w-10 text-green-200" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl p-4 sm:p-6 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-xs sm:text-sm">Niveau fidélité</p>
                  <p className="text-xl sm:text-2xl font-bold">{loyaltyLevel.name}</p>
                </div>
                <Star className="h-8 w-8 sm:h-10 sm:w-10 text-orange-200" />
              </div>
            </div>
          </div>

          {/* Conversion Info */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-red-800 mb-3">💡 Conversion de points</h3>
                <div className="text-sm sm:text-base text-red-700 space-y-2">
                  <p>
                    Vos points peuvent être convertis en réduction lors de la <strong>livraison de vos colis</strong>.
                  </p>
                  <p className="font-medium">
                    <strong>1 point = 100 FCFA</strong> • Conversion manuelle par notre équipe
                  </p>
                  <p className="text-red-600">
                    Informez notre livreur de votre souhait de convertir vos points lors de la réception de votre colis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6 mb-6 sm:mb-8">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Comment ça fonctionne</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Gagnez des points</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <li>• 10 points par kg de colis envoyé</li>
                  <li>• Bonus de 50 points pour votre premier envoi</li>
                  <li>• Points doublés lors des promotions spéciales</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Utilisez vos points</h4>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
                  <li>• 1 point = 100 FCFA de réduction</li>
                  <li>• Conversion lors de la livraison par notre équipe</li>
                  <li>• Pas de date d'expiration</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg shadow-xl border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Historique des points</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {transactions.length === 0 ? (
                <div className="px-4 sm:px-6 py-8 text-center">
                  <Gift className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune transaction pour le moment</p>
                  <p className="text-sm text-gray-400 mt-1">Vos points apparaîtront ici après vos premiers envois</p>
                </div>
              ) : (
                transactions.map((transaction) => (
                  <div key={transaction.id} className="px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        transaction.type === 'earned' 
                          ? 'bg-green-100' 
                          : transaction.type === 'converted'
                          ? 'bg-blue-100'
                          : 'bg-red-100'
                      }`}>
                        <TrendingUp className={`h-4 w-4 ${
                          transaction.type === 'earned' 
                            ? 'text-green-600' 
                            : transaction.type === 'converted'
                            ? 'text-blue-600'
                            : 'text-red-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{transaction.description}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{formatDate(transaction.created_at)}</p>
                      </div>
                    </div>
                    <span className={`font-semibold text-sm sm:text-base ${
                      transaction.type === 'earned' 
                        ? 'text-green-600' 
                        : transaction.type === 'converted'
                        ? 'text-blue-600'
                        : 'text-red-600'
                    }`}>
                      {transaction.type === 'earned' ? '+' : transaction.type === 'converted' ? '-' : ''}{transaction.points} pts
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* Info Section for non-members */}
      {!loyaltyUser && !loading && (
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Pas encore membre ?</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 mb-3">
              Obtenez votre code fidélité en cliquant sur le bouton "Obtenir un code fidélité" dans le header.
            </p>
            <div className="text-sm text-red-600">
              <p className="font-medium mb-2">Avantages :</p>
              <ul className="space-y-1">
                <li>• 10 points par kg de colis envoyé</li>
                <li>• 1 point = 100 FCFA de réduction</li>
                <li>• Conversion lors de la livraison</li>
                <li>• Suivi de tous vos envois</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoyaltyPage;