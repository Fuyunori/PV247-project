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
import { useScreenWidth } from '../utils/useScreenWidth';

const INITIAL_SIMULATION_DELAY = 100;

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

const Board: FC = () => {
  usePageTitle('Play');
  const width = useScreenWidth();

  const user = useLoggedInUser();

  const { configId = '0' } = useParams();

  const [configuration, configurationLoading] = useConfigurationById(configId);

  const [generations, setGenerations] = useState<Generation[]>([configuration.initialGeneration]);

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
    setGenerations((generations) => [
      ...generations,
      [...getNextGeneration(getCurrentGenerationCoordinateSet(generations))],
    ]);

    if (!hasCycle) {
      const index = indexOfCycleStart(generations);

      if (index != null && !hasCycle) {
        setHasCycle(true);
      }
    }
  };

  const stepBackward = (): void => {
    if (generations.length > 1) {
      setGenerations((generations) => generations.slice(0, -1));
    }
  };

  const resetGenerations = (): void => {
    setGenerations([generations[0]]);
    stop();
  };

  const setCurrentGenerationAsInitial = (): void => {
    setGenerations([generations.slice(-1)[0]]);
    setHasCycle(false);
  };

  const clearBoard = (): void => {
    setGenerations([[]]);
    setHasCycle(false);
  };

  const { running, start, stop, delay, setDelay } = useInterval(stepForward, INITIAL_SIMULATION_DELAY);

  const toggleSimulation = (): void => {
    if (running) {
      stop();
    } else {
      start();
    }

    if (!hasCycle) {
      const index = indexOfCycleStart(generations);

      if (index != null && !hasCycle) {
        setHasCycle(true);
      }
    }
  };

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));

  const [boardWidth, setBoardWidth] = useState(configuration.width);
  const [boardHeight, setBoardHeight] = useState(configuration.height);
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
        generation={generations[generations.length - 1]}
        configWidth={boardWidth}
        configHeight={boardHeight}
        canvasWidth={Math.min(800, width)}
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
          A cycle has been detected.
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
