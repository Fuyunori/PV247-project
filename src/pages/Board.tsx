import React, { FC, useEffect, useState } from 'react';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import usePageTitle from '../hooks/usePageTitle';
import Canvas from '../components/Canvas';
import useInterval from '../hooks/useInterval';
import Generation from '../models/Generation';
import getShareableLink from '../api/getShareableLink';
import saveGeneration from '../api/saveGeneration';
import ControlPanel from '../components/ControlPanel';
import Social from '../components/Social';
import useLoggedInUser from '../hooks/useLoggedInUser';
import { useParams } from 'react-router-dom';
import useConfigurationById from '../api/useConfigurationById';
import { CircularProgress, Container } from '@mui/material';
import { indexOfCycleStart } from '../utils/indexOfCycleStart';
import { useScreenWidth } from '../utils/useScreenWidth';
import { CycleAlert } from '../components/CycleAlert';

const INITIAL_SIMULATION_DELAY = 100;

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

const Board: FC = () => {
  usePageTitle('Play');
  const screenWidth = useScreenWidth();

  const user = useLoggedInUser();

  const { configId = '0' } = useParams();

  const [configuration, configurationLoading] = useConfigurationById(configId);

  const [generations, setGenerations] = useState<Generation[]>([configuration.initialGeneration]);

  useEffect(() => {
    setGenerations([configuration.initialGeneration]);
    setBoardWidth(configuration.width);
    setBoardHeight(configuration.height);
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
    const link = await getShareableLink(generations[0], boardWidth, boardHeight, user);
    await navigator.clipboard.writeText(link);
  };

  const saveCurrentGeneration = async (configName: string) => {
    saveGeneration(generations.slice(-1)[0], configName, boardWidth, boardHeight, user);
  };

  const saveSimulation = async (configName: string) => {
    saveGeneration(generations[0], configName, boardWidth, boardHeight, user);
  };

  if (configurationLoading) {
    return (
      <Container
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}
      >
        <CircularProgress />
      </Container>
    );
  }
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Social onShare={share} onSaveCurrentGeneration={saveCurrentGeneration} onSaveSimulation={saveSimulation} />

      {hasCycle && <CycleAlert hasCycle={hasCycle} />}

      <Canvas
        generation={generations[generations.length - 1]}
        configWidth={boardWidth}
        configHeight={boardHeight}
        canvasWidth={Math.min(800, screenWidth)}
        showGrid
        onCellClick={toggleCell}
      />

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
