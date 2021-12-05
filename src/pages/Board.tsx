import { FC, useState } from 'react';
import { Button, ButtonGroup, Slider, Stack } from '@mui/material';
import getNextGeneration, { Coordinate, CoordinateSet } from '../utils/getNextGeneration';
import usePageTitle from '../hooks/usePageTitle';
import Canvas from '../components/Canvas';
import useInterval from '../hooks/useInterval';
import Configuration from '../models/Configuration';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import StopIcon from '@mui/icons-material/Stop';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';

const INITIAL_SIMULATION_DELAY = 100;

const MOCK_CONFIGURATION: Configuration = {
  id: '123',
  name: 'Mock Config',
  authorName: 'John Smith',
  width: 80,
  height: 50,
  createdAt: new Date(),
  initialGeneration: {
    aliveCells: [
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
  },
};

const getCurrentGeneration = (generations: CoordinateSet[]) => {
  return generations[generations.length - 1];
};

function ControlPanel(props: {
  value: number;
  onReset: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onToggleSimulation: () => void;
  onChangeBoardSize: (_: Event, value: number | number[]) => void;
  onChangeSpeed: (_: Event, value: number | number[]) => void;
  running: boolean;
  delay: number;
}) {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Stack direction="column" alignItems="center" width={200}>
        <Grid4x4Icon />
        <Slider aria-label="board size" min={10} max={100} value={props.value} onChange={props.onChangeBoardSize} />
      </Stack>

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={props.onReset} aria-label="reset">
          <StopIcon />
        </Button>
        <Button onClick={props.onStepBackward} aria-label="step backward">
          <RiArrowGoBackFill />
        </Button>
        <Button onClick={props.onToggleSimulation} aria-label={props.running ? 'pause' : 'start'}>
          {props.running ? (
            <>
              <PauseIcon />
              Pause
            </>
          ) : (
            <>
              <PlayArrowIcon />
              Start
            </>
          )}
        </Button>
        <Button onClick={props.onStepForward} aria-label="step forward">
          <RiArrowGoForwardFill />
        </Button>
      </ButtonGroup>

      <Stack direction="column" alignItems="center" width={200}>
        <SpeedIcon />
        <Slider
          min={800}
          max={1000}
          value={1000 - props.delay}
          aria-label="simulation speed"
          onChange={props.onChangeSpeed}
        />
      </Stack>
    </Stack>
  );
}

const Board: FC = () => {
  usePageTitle('Play');
  const [generations, setGenerations] = useState<CoordinateSet[]>([
    new CoordinateSet(MOCK_CONFIGURATION.initialGeneration.aliveCells),
  ]);

  const toggleCell = (coordinate: Coordinate) => {
    if (getCurrentGeneration(generations).has(coordinate)) {
      setGenerations((generations) => [...generations.slice(-1), getCurrentGeneration(generations).delete(coordinate)]);
    } else {
      setGenerations((generations) => [...generations.slice(-1), getCurrentGeneration(generations).add(coordinate)]);
    }
  };
  const stepForward = () => {
    setGenerations((generations) => [...generations, getNextGeneration(getCurrentGeneration(generations))]);
  };

  const stepBackward = (): void => {
    if (generations.length > 1) {
      setGenerations((generations) => generations.slice(0, -1));
    }
  };

  const resetGenerations = (): void => setGenerations([generations[0]]);

  const { running, start, stop, delay, setDelay } = useInterval(stepForward, INITIAL_SIMULATION_DELAY);

  const toggleSimulation = (): void => (running ? stop() : start());

  const changeSpeed = (_: Event, value: number | number[]): void => setDelay(1000 - (value as number));

  // TODO
  const [boardSize, setBoardSize] = useState(50);
  const changeBoardSize = (_: Event, value: number | number[]): void => setBoardSize(value as number);

  return (
    <>
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
