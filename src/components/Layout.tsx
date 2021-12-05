import { FC } from 'react';
import { Container } from '@mui/material';
import NavigationBar from './NavigationBar';

const Layout: FC = ({ children }) => {
  return (
    <>
      <NavigationBar />
      <Container
        maxWidth="lg"
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
        {children}
      </Container>
    </>
  );
};

export default Layout;
