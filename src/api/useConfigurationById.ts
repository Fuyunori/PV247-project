import { configurationDocument } from '../utils/firebase';
import { Configuration, ParsedConfiguration } from '../models/Configuration';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { FirestoreError } from 'firebase/firestore';

export const DEFAULT_CONFIGURATION: Configuration = {
  width: 80,
  height: 50,
  initialGeneration: [
    [0, 0],
    [5, 5],
    [3, 3],
    [9, 10],
    [10, 10],
    [11, 10],
    [11, 9],
    [10, 8],
    [79, 6],
  ],
};

const useConfigurationById = (
  id: string,
): [ParsedConfiguration | Configuration, boolean, FirestoreError | undefined] => {
  const [storedConfig, storedConfigLoading, storedConfigError] = useDocumentDataOnce(configurationDocument(id));

  if (storedConfigLoading || !storedConfig) {
    return [DEFAULT_CONFIGURATION, storedConfigLoading, undefined];
  }
  return [
    { ...storedConfig, initialGeneration: JSON.parse(storedConfig.initialGeneration) },
    storedConfigLoading,
    storedConfigError,
  ];
};

export default useConfigurationById;
