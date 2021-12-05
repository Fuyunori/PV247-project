import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import Board from '../pages/Board';
import Login from '../pages/Login';
import Configurations from '../pages/Configurations';

const RoutesSwitch: FC = () => (
  <Routes>
    <Route path="/" element={<Board />} />
    <Route path="/configurations" element={<Configurations />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default RoutesSwitch;
