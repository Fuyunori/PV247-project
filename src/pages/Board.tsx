import { FC, useEffect, useState } from 'react';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import usePageTitle from '../hooks/usePageTitle';
import Canvas from '../components/Canvas';
import useInterval from '../hooks/useInterval';
import Generation from '../models/Generation';
import getShareableLink from '../api/getShareableLink';
import saveGeneration from '../api/saveGeneration';
import ControlPanel from '../components/ControlPanel';
import Social from './Social';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useParams } from 'react-router-dom';
import useConfigurationById from '../api/useConfigurationById';
import { CircularProgress } from '@mui/material';
import { Alert, Container } from '@mui/material';
import { indexOfCycleStart } from '../utils/indexOfCycleStart';

const INITIAL_SIMULATION_DELAY = 100;

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

const Board: FC = () => {
  usePageTitle('Play');

  const user = useLoggedInUser();

  const { configId = '0' } = useParams();

  const [configuration, configurationLoading] = useConfigurationById(configId);

  const [generations, setGenerations] = useState<Generation[]>([configuration.initialGeneration]);

  const [generationIndex, setGenerationIndex] = useState(0);

  useEffect(() => {
    setGenerations([configuration.initialGeneration]);
  }, [configurationLoading]);

  const toggleCell = (coordinate: Coordinate) => {
    const cur = getCurrentGenerationCoordinateSet(generations);
    if (cur.has(coordinate)) {
      setGenerations((generations) => [...generations.slice(0, -1), [...cur.delete(coordinate)]]);
    } else {
      setGenerations((generations) => [...generations.slice(0, -1), [...cur.add(coordinate)]]);
    }
  };

  const stepForward = () => {
    setGenerationIndex(generationIndex + 1);

    if (!hasCycle) {
      setGenerations((generations) => [
        ...generations,
        [...getNextGeneration(getCurrentGenerationCoordinateSet(generations))],
      ]);

      const index = indexOfCycleStart(generations);

      if (index != null && !hasCycle) {
        setHasCycle(true);
        setGenerations((oldGenerations) => oldGenerations.slice(index));
        console.log(generations);
      }
    } else if (generationIndex + 1 === generations.length) {
      setGenerationIndex(0);
    }
  };

  const stepBackward = (): void => {
    setGenerationIndex(generationIndex - 1);
    if (generations.length > 1 && !hasCycle) {
      setGenerations((generations) => generations.slice(0, -1));
    } else if (generationIndex === 0) {
      setGenerationIndex(generations.length - 1);
    }
  };

  const resetGenerations = (): void => {
    setGenerations([generations[0]]);
    stop();
  };

  const setCurrentGenerationAsInitial = (): void => setGenerations([generations.slice(-1)[0]]);

  const clearBoard = (): void => setGenerations([[]]);

  const { running, start, stop, delay, setDelay } = useInterval(stepForward, INITIAL_SIMULATION_DELAY);

  const toggleSimulation = (): void => (running ? stop() : start());

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));

  const [boardWidth, setBoardWidth] = useState(MOCK_CONFIGURATION.width);
  const [boardHeight, setBoardHeight] = useState(MOCK_CONFIGURATION.height);
  const [hasCycle, setHasCycle] = useState(false);

  const share = async () => {
    const link = await getShareableLink(generations[0], configuration.width, configuration.height, user);
    await navigator.clipboard.writeText(link);
  };

  // TODO
  const saveCurrentGeneration = () => {
    saveGeneration(generations.slice(-1)[0]);
  };

  // TODO
  const saveSimulation = () => {
    saveGeneration(generations[0]);
  };

  if (configurationLoading) {
    return <CircularProgress />;
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Social onShare={share} onSaveCurrentGeneration={saveCurrentGeneration} onSaveSimulation={saveSimulation} />

      <Canvas
        generation={!hasCycle ? generations[generations.length - 1] : generations[generationIndex]}
        configWidth={boardWidth}
        configHeight={boardHeight}
        canvasWidth={800}
        showGrid
        onCellClick={toggleCell}
      />

      {hasCycle && (
        <Alert
          severity="info"
          sx={{ margin: '20px' }}
          onClose={() => {
            return null;
          }}
        >
          A cycle has been detected. {generationIndex}
        </Alert>
      )}

      <ControlPanel
        boardWidth={boardWidth}
        boardHeight={boardHeight}
        onReset={resetGenerations}
        onSetCurrentGenerationAsInitial={setCurrentGenerationAsInitial}
        onClear={clearBoard}
        onStepBackward={stepBackward}
        onToggleSimulation={toggleSimulation}
        onStepForward={stepForward}
        onHeightChange={setBoardHeight}
        onWidthChange={setBoardWidth}
        onChangeSpeed={changeSpeed}
        running={running}
        delay={delay}
      />
    </Container>
  );
};

export default Board;
