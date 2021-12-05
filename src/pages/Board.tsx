import { FC, useState } from 'react';
import { Button, Stack } from '@mui/material';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import usePageTitle from '../hooks/usePageTitle';
import Canvas from '../components/Canvas';
import useInterval from '../hooks/useInterval';
import Configuration from '../models/Configuration';
import Generation from '../models/Generation';
import ShareIcon from '@mui/icons-material/Share';
import SaveIcon from '@mui/icons-material/Save';
import getShareableLink from '../api/getShareableLink';
import saveGeneration from '../api/saveGeneration';
import ControlPanel from '../components/ControlPanel';

const INITIAL_SIMULATION_DELAY = 100;

const MOCK_CONFIGURATION: Configuration = {
  id: '123',
  name: 'Mock Config',
  authorName: 'John Smith',
  width: 80,
  height: 50,
  createdAt: new Date(),
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

const getCurrentGenerationCoordinateSet = (generations: Generation[]) => {
  return new CoordinateSet(generations.slice(-1)[0]);
};

// TODO cycle detection

const Board: FC = () => {
  usePageTitle('Play');
  const [generations, setGenerations] = useState<Generation[]>([MOCK_CONFIGURATION.initialGeneration]);

  const toggleCell = (coordinate: Coordinate) => {
    const cur = getCurrentGenerationCoordinateSet(generations);
    if (cur.has(coordinate)) {
      setGenerations((generations) => [...generations.slice(-1), [...cur.delete(coordinate)]]);
    } else {
      setGenerations((generations) => [...generations.slice(-1), [...cur.add(coordinate)]]);
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

  // TODO
  const share = () => {
    const link = getShareableLink();
    // copy to clipboard
    // notify user that it is in clipboard
  };

  // TODO
  const saveCurrentGeneration = () => {
    saveGeneration(generations.slice(-1)[0]);
  };

  // TODO
  const saveSimulation = () => {
    saveGeneration(generations[0]);
  };

  return (
    <>
      {/*TODO extract into Social component*/}
      <Stack direction="row" alignItems="center" gap={2}>
        <Button variant="contained" endIcon={<ShareIcon />} onClick={share}>
          Share
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={saveCurrentGeneration}>
          Save current generation
        </Button>
        <Button variant="contained" endIcon={<SaveIcon />} onClick={saveSimulation}>
          Save simulation
        </Button>
      </Stack>

      <Canvas
        generation={generations[generations.length - 1]}
        configWidth={MOCK_CONFIGURATION.width}
        configHeight={MOCK_CONFIGURATION.height}
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
