import { configurationsCollection } from '../utils/firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { ParsedConfiguration } from '../models/Configuration';

const useConfigurations = () => {
  const [configurations = []] = useCollection(configurationsCollection);
  const parsedConfigurations: ParsedConfiguration[] = [];

  configurations.forEach((configDoc) => {
    const data = configDoc.data();
    parsedConfigurations.push({
      id: configDoc.id,
      ...data,
      initialGeneration: JSON.parse(data.initialGeneration),
    });
  });

  return parsedConfigurations;
};

export default useConfigurations;
