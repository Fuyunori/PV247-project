import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { logOut } from '../utils/firebase';
import useLoggedInUser from '../hooks/useLoggedInUser';

const NavigationBar: FC = () => {
  const user = useLoggedInUser();

  return (
    <AppBar position="fixed">
      <Container maxWidth="sm">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Button component={Link} to="/">
            Play
          </Button>
          <Button component={Link} to="/configurations">
            Configurations
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <Button onClick={logOut}>Log out</Button>
          ) : (
            <Button component={Link} to="/login">
              Log in
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavigationBar;
