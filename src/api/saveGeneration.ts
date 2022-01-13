// TODO
import Generation from '../models/Generation';
import { ConfigurationInput } from '../models/Configuration';
import getUniqueName from '../utils/getUniqueName';
import { addDoc } from 'firebase/firestore';
import { configurationsCollection } from '../utils/firebase';
import { User } from 'firebase/auth';

const saveGeneration = async (
  generation: Generation,
  configName: string,
  width: number,
  height: number,
  user: User | undefined,
) => {
  const authorName = user?.email?.split('@')[0] || 'Anonymous';
  const newConfig: ConfigurationInput = {
    name: configName,
    authorName,
    createdAt: new Date(),
    height,
    width,
    initialGeneration: JSON.stringify(generation),
  };
  const doc = await addDoc(configurationsCollection, newConfig);
  return `${window.location.origin}/configurations/${doc.id}`;
};

export default saveGeneration;
