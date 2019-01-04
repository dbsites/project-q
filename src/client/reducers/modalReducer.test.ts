/**
 * @module modalReducerTest
 * @description Unit Tests for Modal Reducer
 */

import modalReducer, {initialModalState} from './modalReducer';

// Import action creators to generate modal actions
import { setModal, clearModal } from '../actions/actionCreators';

// Import Templates for Testing
import { stubModalType } from '../actions/templates';

describe('Functionality Test: Modal Reducer', () => {
  it('Should return initial state by default', () => {
    expect(modalReducer(undefined, {})).toEqual(initialModalState);
  });

  it('Should update isModalActive to true and modalType to the string passed in to setModal', () => {
    const state = modalReducer(undefined, setModal(stubModalType));
    expect(state.isModalActive).toEqual(true);
    expect(state.modalType).toEqual(stubModalType);
  });

  it('Should update isModalActive to false and modalType to null upon clearModal', () => {
    let state = modalReducer(undefined, setModal(stubModalType));
    state = modalReducer(state, clearModal());
    expect(modalReducer(state, clearModal()).isModalActive).toEqual(false);
    expect(modalReducer(state, clearModal()).modalType).toEqual(null);
  });
});
