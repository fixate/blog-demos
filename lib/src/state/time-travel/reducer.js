import uuidv1 from 'uuid';
import * as actions from './actions';

const initialState = {
  currentStepId: null,
  steps: [],
};

const timeTravelReducer = (state = initialState, action) => {
  let currIndex;
  let currentStepId;

  switch (action.type) {
    case actions.ADD_STEP:
      const id = uuidv1();
      const step = Object.assign({}, {id}, action.step);
      const steps = state.steps.concat(step);

      return Object.assign({}, state, {steps, currentStepId: id});

    case actions.STEP_FORWARD:
      currIndex = getCurrentStepIndex(state);
      const nextStep =
        currIndex < state.steps.length - 1
          ? state.steps[currIndex + 1 % state.steps.length]
          : state.steps[currIndex];

      return Object.assign({}, state, {currentStepId: nextStep.id});

    case actions.STEP_BACKWARD:
      currIndex = getCurrentStepIndex(state);
      const prevStep =
        currIndex > 0 ? state.steps[currIndex - 1] : state.steps[currIndex];

      return Object.assign({}, state, {currentStepId: prevStep.id});

    case actions.SET_CURRENT_INDEX:
      currentStepId = state.steps[action.index % state.steps.length].id;

      return Object.assign({}, state, {currentStepId});

    default:
      return state;
  }
};

const getCurrentStep = ({currentStepId, steps}) =>
  steps.find(s => s.id === currentStepId);

const getCurrentStepIndex = ({currentStepId, steps}) =>
  steps.map(s => s.id).indexOf(currentStepId);

export {getCurrentStep, getCurrentStepIndex, initialState};

export default timeTravelReducer;
