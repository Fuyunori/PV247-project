import { Box, Button, Paper, Typography } from '@mui/material';
import { FC, FormEvent, useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { logIn } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';

const Login: FC = () => {
  usePageTitle('Login');
  const [submitError, setSubmitError] = useState<string>();
  const navigate = useNavigate();

  return (
    <Paper
      component="form"
      onSubmit={async (e: FormEvent) => {
        e.preventDefault();
        try {
          await logIn();
          navigate('/');
        } catch (err) {
          setSubmitError((err as { message?: string })?.message ?? 'An unknown error has occurred.');
        }
      }}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        p: 4,
        gap: 2,
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        Log in
      </Typography>
      <Box>
        {submitError && (
          <Typography variant="caption" textAlign="right" sx={{ color: 'error.main' }}>
            {submitError}
          </Typography>
        )}
        <Button type="submit" variant="contained" startIcon={<GoogleIcon />}>
          Sign in with Google
        </Button>
      </Box>
    </Paper>
  );
};

export default Login;
