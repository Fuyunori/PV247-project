import { FC } from 'react';
import { Button, ButtonGroup, Slider, Stack } from '@mui/material';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';
import StopIcon from '@mui/icons-material/Stop';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

type Props = {
  value: number;
  onReset: () => void;
  onSetCurrentGenerationAsInitial: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onToggleSimulation: () => void;
  onChangeBoardSize: (_: Event, value: number | number[]) => void;
  onChangeSpeed: (_: Event, value: number | number[]) => void;
  running: boolean;
  delay: number;
};

const ControlPanel: FC<Props> = ({
  value,
  onReset,
  onSetCurrentGenerationAsInitial,
  onStepForward,
  onStepBackward,
  onToggleSimulation,
  onChangeBoardSize,
  onChangeSpeed,
  running,
  delay,
}) => {
  return (
    <Stack direction="row" alignItems="center" gap={2}>
      <Stack direction="column" alignItems="center" width={200}>
        <Grid4x4Icon />
        <Slider aria-label="board size" min={10} max={100} value={value} onChange={onChangeBoardSize} />
      </Stack>

      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={onReset} aria-label="reset">
          <StopIcon />
        </Button>
        <Button onClick={onStepBackward} aria-label="step backward">
          <RiArrowGoBackFill />
        </Button>
        <Button
          onClick={onToggleSimulation}
          aria-label={running ? 'pause' : 'start'}
          startIcon={running ? <PauseIcon /> : <PlayArrowIcon />}
        >
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={onStepForward} aria-label="step forward">
          <RiArrowGoForwardFill />
        </Button>
        <Button
          onClick={onSetCurrentGenerationAsInitial}
          aria-label="set current generation as initial"
          startIcon={<ArrowUpwardIcon />}
        >
          Make initial
        </Button>
      </ButtonGroup>

      <Stack direction="column" alignItems="center" width={200}>
        <SpeedIcon />
        <Slider min={800} max={1000} value={1000 - delay} aria-label="simulation speed" onChange={onChangeSpeed} />
      </Stack>
    </Stack>
  );
};

export default ControlPanel;
