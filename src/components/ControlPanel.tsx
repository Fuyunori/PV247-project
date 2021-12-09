import { FC } from 'react';
import { Button, ButtonGroup, Slider, Stack, useMediaQuery } from '@mui/material';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import Grid4x4Icon from '@mui/icons-material/Grid4x4';

type Props = {
  onReset: () => void;
  onSetCurrentGenerationAsInitial: () => void;
  onClear: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onToggleSimulation: () => void;
  onBoardSizeChange: (boardSize: number) => void;
  onChangeSpeed: (_: Event, value: number | number[]) => void;
  running: boolean;
  delay: number;
  boardSize: number;
};

const ControlPanel: FC<Props> = ({
  onReset,
  onSetCurrentGenerationAsInitial,
  onClear,
  onStepForward,
  onStepBackward,
  onToggleSimulation,
  onBoardSizeChange,
  onChangeSpeed,
  running,
  delay,
  boardSize,
}) => {
  const changeBoardSize = (_: Event, boardSize: number | number[]): void => {
    if (Array.isArray(boardSize)) {
      return;
    }
    onBoardSizeChange(boardSize);
  };

  const btnGroupOrientation = useMediaQuery('(min-width:768px)') ? 'horizontal' : 'vertical';

  return (
    <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} alignItems="center" gap={2} sx={{ margin: '30px' }}>
      <Stack direction="column" alignItems="center" width={200}>
        <Grid4x4Icon />
        <Slider min={3} max={80} value={boardSize} aria-label="board size" onChange={changeBoardSize} />
      </Stack>

      <ButtonGroup orientation={btnGroupOrientation} variant="contained" aria-label="outlined primary button group">
        <Button onClick={onReset} aria-label="reset">
          <RefreshIcon sx={{ fontSize: 22 }} />
        </Button>
        <Button onClick={onStepBackward} aria-label="step backward">
          <RiArrowGoBackFill size={17} />
        </Button>
        <Button
          onClick={onToggleSimulation}
          aria-label={running ? 'pause' : 'start'}
          startIcon={running ? <PauseIcon /> : <PlayArrowIcon />}
        >
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={onStepForward} aria-label="step forward">
          <RiArrowGoForwardFill size={17} />
        </Button>
        <Button
          onClick={onSetCurrentGenerationAsInitial}
          aria-label="set current generation as initial"
          startIcon={<ArrowUpwardIcon />}
        >
          Make initial
        </Button>
        <Button onClick={onClear} aria-label="clear board" startIcon={<DeleteIcon />}>
          Clear
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
