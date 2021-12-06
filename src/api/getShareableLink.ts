import Generation from '../models/Generation';
import { User } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { configurationsCollection } from '../utils/firebase';
import { ConfigurationInput } from '../models/Configuration';
import getUniqueName from '../utils/getUniqueName';

const getShareableLink = async (generation: Generation, width: number, height: number, user: User | undefined) => {
  const authorName = user?.email?.split('@')[0] || 'Anonymous';
  const newConfig: ConfigurationInput = {
    name: getUniqueName(),
    authorName,
    createdAt: new Date(),
    height,
    width,
    initialGeneration: JSON.stringify(generation),
  };
  const doc = await addDoc(configurationsCollection, newConfig);
  return `${window.location.origin}/configurations/${doc.id}`;
};

export default getShareableLink;
