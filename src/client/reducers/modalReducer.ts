/**
 * @module modalReducer
 * @description Reducer for Modal States
 * UNIT TEST COVERAGE - 100%
 */

import actions from '../actions/actionTypes';
import { ModalState } from './types';

// Define initial modal state
export const initialModalState: ModalState = {
  isModalActive: false,
  modalType: null,
};

const modalReducer = (state: ModalState = initialModalState, action: any): ModalState => {
  switch (action.type) {
    case actions.SET_MODAL:
      return {
        isModalActive: true,
        modalType: action.modalType,
      };

    case actions.CLEAR_MODAL:
      return initialModalState;

    default:
      return state;
  };
};

export default modalReducer;