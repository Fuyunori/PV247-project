import { onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import Generation from '../models/Generation';
import { gamesCollection } from '../utils/firebase';

const useGames = () => {
  const [games, setGames] = useState<Generation[]>();

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

export default useGames;
