import { BrowserRouter } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { Switch } from './components/Switch';
import { Container } from '@mui/material';
import { UserProvider } from './hooks/useLoggedInUser';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavigationBar />
        <Container
          maxWidth="sm"
          component="main"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            pt: 8,
            gap: 2,
          }}
        >
          <Switch />
        </Container>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
