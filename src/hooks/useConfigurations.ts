import { onSnapshot } from '@firebase/firestore';
import { useEffect, useState } from 'react';
import Generation from '../models/Generation';
import { gamesCollection } from '../utils/firebase';

// TODO use react-firebase-hooks
const useConfigurations = () => {
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

export default useConfigurations;
