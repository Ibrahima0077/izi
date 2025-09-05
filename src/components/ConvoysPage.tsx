import React, { useState, useEffect } from 'react';
import { DollarSign, MapPin, Copy, Check, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Convoy } from '../types';

const ConvoysPage: React.FC = () => {
  const [convoys, setConvoys] = useState<Convoy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchConvoys();
  }, []);

  const fetchConvoys = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('convoys')
        .select('*')
        .eq('is_active', true)
        .order('departure_date', { ascending: true });

      if (error) {
        throw error;
      }

      const formattedConvoys: Convoy[] = data.map(convoy => ({
        id: convoy.id,
        departureDate: convoy.departure_date,
        pricePerKg: convoy.price_per_kg,
        carrierAddress: convoy.carrier_address,
        carrierName: convoy.carrier_name,
        destination: convoy.destination,
        availableSpace: convoy.available_space
      }));

      setConvoys(formattedConvoys);
    } catch (err) {
      console.error('Erreur fetchConvoys:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des transiteurs');
    } finally {
      setLoading(false);
    }
  };

  const copyAddress = async (address: string, convoyId: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedId(convoyId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Erreur copie:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
          <span className="ml-3 text-gray-600">Chargement des transiteurs...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
          <p className="text-red-800">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8 bg-white min-h-screen">
      <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Transiteurs Disponibles</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 sm:p-4">
          <h3 className="font-semibold text-red-800 mb-2">Instructions importantes :</h3>
          <ul className="text-red-700 text-xs sm:text-sm space-y-1">
            <li>• Copiez l'adresse du transporteur pour votre fournisseur (Alibaba, Taobao, Amazon etc.)</li>
            <li>• Assurez-vous que votre code client est clairement indiqué sur le colis</li>
            <li>• Inscrivez vous au programmme de fidelité pour accumuler des points</li>
            <li>• Contactez le support si vous avez des questions</li>
          </ul>
        </div>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {convoys.map((convoy) => (
          <div key={convoy.id} className="bg-white rounded-lg shadow-xl border border-gray-200 p-4 sm:p-6 hover:shadow-2xl hover:border-red-300 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate pr-2">{convoy.carrierName}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                convoy.availableSpace > 80 ? 'bg-green-100 text-green-800 border border-green-200' :
                convoy.availableSpace > 60 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {convoy.availableSpace}% dispo
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-gray-600">
                <DollarSign className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm sm:text-base">{convoy.pricePerKg.toLocaleString()} FCFA/kg</p>
                  <p className="text-xs sm:text-sm">Prix par kilogramme</p>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-gray-600">
                <MapPin className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 mb-1 text-sm sm:text-base">Adresse transiteur</p>
                  <p className="text-xs sm:text-sm text-gray-600 break-words leading-relaxed">{convoy.carrierAddress}</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => copyAddress(convoy.carrierAddress, convoy.id)}
              className={`w-full flex items-center justify-center space-x-2 px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all text-sm sm:text-base ${
                copiedId === convoy.id
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 hover:bg-red-700 text-white hover:shadow-lg hover:scale-105'
              }`}
            >
              {copiedId === convoy.id ? (
                <>
                  <Check className="h-5 w-5" />
                  <span>Adresse copiée !</span>
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  <span>Copier l'adresse</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConvoysPage;