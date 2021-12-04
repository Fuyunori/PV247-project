import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';
import { GameEditor } from '../pages/GameEditor';

export const Switch: FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="login" element={<Login />} />
    <Route path="game/editor" element={<GameEditor />} />
  </Routes>
);
