import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useLoggedInUser } from '../hooks/useLoggedInUser';
import { logOut } from '../utils/firebase';

export const NavigationBar: FC = () => {
  const user = useLoggedInUser();

  return (
    <AppBar position="fixed">
      <Container maxWidth="sm">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          {!user ? (
            <Button color="inherit" component={Link} to="/login">
              Log in
            </Button>
          ) : (
            <Button color="inherit" onClick={logOut}>
              Log out
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
