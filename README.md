trigger pipeline

[![Firebase Deployment](https://github.com/petr7555/pv247-game-of-life/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/petr7555/pv247-game-of-life/actions/workflows/firebase-hosting-merge.yml)
[![Lint, test, build](https://github.com/petr7555/pv247-game-of-life/actions/workflows/lint_and_test.yml/badge.svg)](https://github.com/petr7555/pv247-game-of-life/actions/workflows/lint_and_test.yml)
[![codecov](https://codecov.io/gh/petr7555/pv247-game-of-life/branch/main/graph/badge.svg?token=CA27W2XYL6)](https://codecov.io/gh/petr7555/pv247-game-of-life)

# PV247 Project - Game of Life
Running on https://pv247-game-of-life.web.app/.

## Used technologies
- React
- Firebase (Firestore, Firebase Auth)
- Material UI

## Functional requirements
The user will be able to:
- create an account, sign in and sign out;
- create games, i.e. specify matrix dimensions and initial state (cell values);
- save games (both current generation and whole simulation);
- list theirs saved games;
- delete theirs saved games;
- list games someone has shared;
- generate a shareable link for a game;
- run simulation:
  - step-by-step;
  - automatically.

The simulation will have the following features:
- choice of speed / frame rate;
- rewinding to a previous state;
- cycle detection;
- setting the current state as a new game's initial state.

## Non-functional requirements
- responsivity
