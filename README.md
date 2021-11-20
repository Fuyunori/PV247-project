[![Lint, test, build](https://github.com/Fuyunori/PV247-project/actions/workflows/lint_and_test.yml/badge.svg)](https://github.com/Fuyunori/PV247-project/actions/workflows/lint_and_test.yml)
[![codecov](https://codecov.io/gh/petr7555/PV247-project/branch/main/graph/badge.svg?token=HZU73RVO6M)](https://codecov.io/gh/petr7555/PV247-project)

# PV247 Project - Game of Life
## Used technologies
- React
- Firebase _(Firestore, Firebase Auth)_
- Material UI

## Functional requirements
The user will be able to:
- create an account, sign in and sign out;
- create games, i.e. specify matrix dimensions and initial state (cell values);
- delete and update existing games;
- run simulation:
  - step-by-step;
  - automatically.

The simulation will have the following features:
- choice of speed / frame rate;
- rewinding to a previous state;
- cycle detection;
- storing the current state as a new game's initial state.

## Non-functional requirements
- responsivity
