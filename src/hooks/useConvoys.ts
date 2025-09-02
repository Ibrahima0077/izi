import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Convoy } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const useConvoys = () => {
  const { session, refreshSession } = useAuth();
  const [convoys, setConvoys] = useState<Convoy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      fetchConvoys();
    } else {
      setLoading(false);
    }
  }, [session]);

  const fetchConvoys = async (retryCount = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      // Vérifier que la session est valide avant la requête
      if (!session || !session.access_token) {
        await refreshSession();
        return;
      }

      const { data, error } = await supabase
        .from('convoys')
        .select('*')
        .eq('is_active', true)
        .order('departure_date', { ascending: true });

      if (error) {
        // Si erreur d'authentification, essayer de rafraîchir la session
        if ((error.message?.includes('JWT') || error.message?.includes('expired') || error.message?.includes('invalid')) && retryCount < 2) {
          console.log('Token expiré, rafraîchissement de la session...');
          await refreshSession();
          // Attendre un peu puis réessayer
          setTimeout(() => fetchConvoys(retryCount + 1), 1000);
          return;
        }
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
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des convois');
    } finally {
      setLoading(false);
    }
  };

  return { convoys, loading, error, refetch: fetchConvoys };
};