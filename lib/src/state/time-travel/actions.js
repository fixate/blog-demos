export const ADD_STEP = 'ADD_STEP';
export const addStep = step => ({
  type: ADD_STEP,
  step,
});

export const STEP_BACKWARD = 'STEP_BACKWARD';
export const stepBackward = () => ({
  type: STEP_BACKWARD,
});

export const STEP_FORWARD = 'STEP_FOWARD';
export const stepForward = () => ({
  type: STEP_FORWARD,
});

export const SET_CURRENT_INDEX = 'SET_CURRENT_INDEX';
export const setCurrentIndex = index => ({
  type: SET_CURRENT_INDEX,
  index,
});
