import React, { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Board from '../pages/Board';
import Login from '../pages/Login';
import Configurations from '../pages/Configurations';

const RoutesSwitch: FC = () => (
  <Routes>
    <Route path="/" element={<Board />} />
    <Route path="/configurations/:configId" element={<Board />} />
    <Route path="/configurations" element={<Configurations />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<Navigate replace to="/" />} />
  </Routes>
);

export default RoutesSwitch;
