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
import { Alert, CircularProgress, Container, Snackbar } from '@mui/material';
import { useScreenWidth } from '../utils/useScreenWidth';
import generationsAreEqual from '../utils/generationsAreEqual';

const INITIAL_SIMULATION_TIMEOUT = 100;

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

const Board: FC = () => {
  usePageTitle('Play');
  const screenWidth = useScreenWidth();

  const user = useLoggedInUser();

  // TODO
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
  };

  const clearBoard = (): void => {
    setGenerations([[]]);
  };

  const { running, start, stop, timeout, setTimeout } = useInterval(stepForward, INITIAL_SIMULATION_TIMEOUT);

  const toggleSimulation = (): void => {
    if (running) {
      stop();
    } else {
      start();
    }
  };

  const changeSpeed = (_: Event, value: number | number[]): void => setTimeout(1000 - (value as number));

  const [boardWidth, setBoardWidth] = useState(configuration.width);
  const [boardHeight, setBoardHeight] = useState(configuration.height);

  const share = async () => {
    const link = await getShareableLink(generations[0], boardWidth, boardHeight, user);
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

  useEffect(() => {
    const lastGeneration = generations.slice(-1)[0];
    const prevGenerations = generations.slice(0, -1);
    const detectedCycle = prevGenerations.some((gen) => generationsAreEqual(gen, lastGeneration));
    setDetectedCycle(detectedCycle);
  }, [generations]);

  const [detectedCycle, setDetectedCycle] = useState(false);

  const closeCycleSnackbar = () => {
    setDetectedCycle(false);
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

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: 7 }}
        autoHideDuration={3000}
        open={detectedCycle}
        onClose={closeCycleSnackbar}
      >
        <Alert severity="info" sx={{ backgroundColor: 'grey.800' }}>
          A cycle has been detected.
        </Alert>
      </Snackbar>

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
        timeout={timeout}
      />
    </Container>
  );
};

export default Board;
