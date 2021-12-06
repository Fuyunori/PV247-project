import { FC, useEffect, useState } from 'react';
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
import { CircularProgress } from '@mui/material';

const INITIAL_SIMULATION_DELAY = 100;

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

// TODO cycle detection

const Board: FC = () => {
  usePageTitle('Play');

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
  };

  const stepBackward = (): void => {
    if (generations.length > 1) {
      setGenerations((generations) => generations.slice(0, -1));
    }
  };

  const resetGenerations = (): void => setGenerations([generations[0]]);

  const setCurrentGenerationAsInitial = (): void => setGenerations([generations.slice(-1)[0]]);

  const clearBoard = (): void => setGenerations([[]]);

  const { running, start, stop, delay, setDelay } = useInterval(stepForward, INITIAL_SIMULATION_DELAY);

  const toggleSimulation = (): void => (running ? stop() : start());

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));

  // TODO
  const [boardSize, setBoardSize] = useState(50);
  const changeBoardSize = (_: Event, value: number | number[]): void => setBoardSize(value as number);

  const share = async () => {
    const link = await getShareableLink(generations[0], configuration.width, configuration.height, user);
    await navigator.clipboard.writeText(link);
  };

  // TODO
  const saveCurrentGeneration = async (configName: string) => {
    saveGeneration(generations.slice(-1)[0], configName);
  };

  // TODO
  const saveSimulation = async (configName: string) => {
    saveGeneration(generations[0], configName);
  };

  if (configurationLoading) {
    return <CircularProgress />;
  }

  return (
    <>
      <Social onShare={share} onSaveCurrentGeneration={saveCurrentGeneration} onSaveSimulation={saveSimulation} />

      <Canvas
        generation={generations[generations.length - 1]}
        configWidth={configuration.width}
        configHeight={configuration.height}
        canvasWidth={800}
        showGrid
        onCellClick={toggleCell}
      />

      <ControlPanel
        value={boardSize}
        onReset={resetGenerations}
        onSetCurrentGenerationAsInitial={setCurrentGenerationAsInitial}
        onClear={clearBoard}
        onStepBackward={stepBackward}
        onToggleSimulation={toggleSimulation}
        onStepForward={stepForward}
        onChangeBoardSize={changeBoardSize}
        onChangeSpeed={changeSpeed}
        running={running}
        delay={delay}
      />
    </>
  );
};

export default Board;
