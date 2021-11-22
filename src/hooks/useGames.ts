import { onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import { Game } from '../models/Game';
import { gamesCollection } from '../utils/firebase';

export const useGames = () => {
  const [games, setGames] = useState<Game[]>();

  useEffect(() => {
    const unsubscribe = onSnapshot(gamesCollection, (snapshot) => {
      setGames(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return games;
};
