import { ChangeEvent, FC } from 'react';
import { Button, ButtonGroup, Slider, Stack, TextField, useMediaQuery } from '@mui/material';
import { RiArrowGoBackFill, RiArrowGoForwardFill } from 'react-icons/ri';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SpeedIcon from '@mui/icons-material/Speed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';

type Props = {
  boardWidth: number;
  boardHeight: number;
  onReset: () => void;
  onSetCurrentGenerationAsInitial: () => void;
  onClear: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onToggleSimulation: () => void;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  onChangeSpeed: (_: Event, value: number | number[]) => void;
  running: boolean;
  timeout: number;
};

const ControlPanel: FC<Props> = ({
  boardWidth,
  boardHeight,
  onReset,
  onSetCurrentGenerationAsInitial,
  onClear,
  onStepForward,
  onStepBackward,
  onToggleSimulation,
  onWidthChange,
  onHeightChange,
  onChangeSpeed,
  running,
  timeout,
}) => {
  const handleWidthChange = (event: ChangeEvent<HTMLTextAreaElement>) => onWidthChange(+event.target.value);

  const handleHeightChange = (event: ChangeEvent<HTMLTextAreaElement>) => onHeightChange(+event.target.value);

  const btnGroupOrientation = useMediaQuery('(min-width:768px)') ? 'horizontal' : 'vertical';

  return (
    <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} alignItems="center" gap={2} sx={{ margin: '30px' }}>
      <Stack direction="column" alignItems="center" width={200} gap={1.5}>
        <TextField label="width:" type="number" onChange={handleWidthChange} value={boardWidth} />
        <TextField label="height:" type="number" onChange={handleHeightChange} value={boardHeight} />
      </Stack>

      <ButtonGroup orientation={btnGroupOrientation} variant="contained" aria-label="outlined primary button group">
        <Button onClick={onReset} aria-label="reset">
          <RefreshIcon />
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
        <Button onClick={onClear} aria-label="clear board" startIcon={<DeleteIcon />}>
          Clear
        </Button>
      </ButtonGroup>

      <Stack direction="column" alignItems="center" width={200}>
        <SpeedIcon />
        <Slider min={800} max={1000} value={1000 - timeout} aria-label="simulation speed" onChange={onChangeSpeed} />
      </Stack>
    </Stack>
  );
};

export default ControlPanel;
