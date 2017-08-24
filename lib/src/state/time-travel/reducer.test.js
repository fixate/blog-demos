import test from 'tape';

import reducer, * as fromTimeTravel from './reducer';
import * as actions from './actions';

const getStateAfterNAdditions = (n, state = fromTimeTravel.initialState) =>
  Array.apply(null, Array(n)).reduce(
    (accState, _) =>
      reducer(accState, {
        type: actions.ADD_STEP,
      }),
    Object.assign({}, state)
  );

test('timeTravelReducer', nest => {
  nest.test('-> when initialised', assert => {
    const {currentStepId, steps} = reducer(undefined, {});

    assert.equal(currentStepId, null, 'currentStepId is null');
    assert.equal(steps.length, 0, 'steps has no length');
    assert.end();
  });

  nest.test('-> when adding a step', assert => {
    const nextState = getStateAfterNAdditions(1);

    assert.equal(nextState.steps.length, 1, 'number of steps is 1');
    assert.end();
  });

  nest.test('-> when adding multiple steps', assert => {
    const nextState = getStateAfterNAdditions(200);
    const ids = nextState.steps.map(s => s.id);
    const hasUniqueIds = nextState.steps.reduce((acc, step) => {
      const occurrences = ids.filter(id => id === step.id).length;

      return !acc ? acc : occurrences === 1;
    }, true);

    assert.ok(hasUniqueIds, 'has unique ids');
    assert.end();
  });

  nest.test('-> selectors', nest2 => {
    nest2.test('-> when getting the current step', assert => {
      const state = getStateAfterNAdditions(1);
      const currStep = fromTimeTravel.getCurrentStep(state);

      assert.equal(
        currStep.id,
        state.currentStepId,
        "currentStepId matches current step's id"
      );
      assert.equal(
        fromTimeTravel.getCurrentStepIndex(state),
        state.steps.indexOf(currStep)
      );
      assert.equal(state.steps.length, 1, 'we have 3 steps');
      assert.end();
    });
  });

  nest.test('-> when setting the current index', assert => {
    const numTests = 10;

    Array.apply(null, Array(10)).map((_, i) => {
      const index = i + 1;
      let nextState = getStateAfterNAdditions(numTests);
      nextState = reducer(nextState, {
        type: actions.SET_CURRENT_INDEX,
        index,
      });

      assert.equal(
        fromTimeTravel.getCurrentStepIndex(nextState),
        index % numTests,
        'current step index matches index set'
      );
    });

    assert.end();
  });

  nest.test('-> when stepping backwards', assert => {
    const numSteps = 10;
    let state = getStateAfterNAdditions(10);

    Array.apply(null, Array(10)).map((_, i) => {
      state = reducer(state, {type: actions.STEP_BACKWARD});
      const currIndex = fromTimeTravel.getCurrentStepIndex(state);

      assert.equal(numSteps - i, currIndex, 'current index is one from end');
    });

    assert.end();
  });

  nest.test('-> when stepping forwards', assert => {
    const numTests = 10;

    Array.apply(null, Array(numTests - 1)).map((_, i) => {
      const index = i;
      let state = getStateAfterNAdditions(numTests);
      state = reducer(state, {
        type: actions.SET_CURRENT_INDEX,
        index,
      });
      const indexBefore = fromTimeTravel.getCurrentStepIndex(state);
      state = reducer(state, {
        type: actions.STEP_FORWARD,
      });
      const currIndex = fromTimeTravel.getCurrentStepIndex(state);

      assert.equal(
        indexBefore,
        index,
        'index before step is same as specified index'
      );
      // assert.equal(
      //   currIndex,
      //   index + 1,
      //   'current index is 1 ahead of previous index'
      // );
    });

    assert.end();
  });
});
