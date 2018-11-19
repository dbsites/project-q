/**
 * @module formReducer
 * @description Reducer for Login and Registration Forms
 * UNIT TEST COVERAGE - 0%
 */

import actions from '../actions/actionTypes';
import {
  FormState,
  LoginState, RegisterState,
  ForgotPassState, ResetPassState,
} from './types';

// Define initial state
const initialForgotState: ForgotPassState = {
  forgotPassEmail: '',
  emailValid: false,
  forgotError: '',
}

const initialResetState: ResetPassState = {
  newPassword: '',
  confirmNewPassword: '',
  resetError: '',
}

const initialLoginState: LoginState = {
  loginEmail: '',
  emailValid: false,
  loginPassword: '',
  rememberMe: true,
  loginError: '',
};

const initialRegisterState: RegisterState = {
  firstName: '',
  lastName: '',
  registerEmail: '',
  emailValid: false,
  registerPassword: '',
  confirmPassword: '',
  agreeTerms: false,
  registerError: '',
};

const initialFormState: FormState = {
  login: initialLoginState,
  register: initialRegisterState,
  forgot: initialForgotState,
  reset: initialResetState,
}

const forgotReducer = (state: ForgotPassState = initialForgotState, action: any): ForgotPassState => {
  switch (action.type) {
    // UPDATE_FIELD - update input field (or checkbox) to value
    case actions.UPDATE_FIELD:
      // Email Validation
      let emailValid: boolean = state.emailValid;
      if (action.formFieldObject.field === 'forgotPassEmail') {
        if (action.formFieldObject.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          emailValid = action.formFieldObject.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).length === 4;
        } else {
          emailValid = false;
        }
      }

      return {
        ...state,
        emailValid,
        [action.formFieldObject.field]: action.formFieldObject.value,
      };

    // FETCH_FORM_FAILURE - update form with error message
    case actions.FETCH_FORM_FAILURE:
      return {
        ...state,
        forgotError: action.message,
      }

    default:
      return state;
  }
};

const resetReducer = (state: ResetPassState = initialResetState, action: any): ResetPassState => {
  switch (action.type) {
    // UPDATE_FIELD - update input field (or checkbox) to value
    case actions.UPDATE_FIELD:
      return {
        ...state,
        [action.formFieldObject.field]: action.formFieldObject.value,
      };

    // FETCH_FORM_FAILURE - update form with error message
    case actions.FETCH_FORM_FAILURE:
      return {
        ...state,
        resetError: action.message,
      }

    default:
      return state;
  }
};

const loginReducer = (state: LoginState = initialLoginState, action: any): LoginState => {
  switch (action.type) {
    // UPDATE_FIELD - update input field (or checkbox) to value
    case actions.UPDATE_FIELD:
    // Email Validation
    let emailValid: boolean = state.emailValid;
    if (action.formFieldObject.field === 'loginEmail') {
      if (action.formFieldObject.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        emailValid = action.formFieldObject.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).length === 4;
      } else {
        emailValid = false;
      }
    }

    return {
      ...state,
      emailValid,
      [action.formFieldObject.field]: action.formFieldObject.value,
    };

    // FETCH_FORM_FAILURE - update form with error message
    case actions.FETCH_FORM_FAILURE:
    return {
      ...state,
      loginError: action.message,
    }

    default:
      return state;
  }
};

const registerReducer = (state: RegisterState = initialRegisterState, action: any): RegisterState => {
  switch (action.type) {
    // UPDATE_FIELD - update input field (or checkbox) to value
    case actions.UPDATE_FIELD:
      // Email Validation
      let emailValid: boolean = state.emailValid;
      if (action.formFieldObject.field === 'registerEmail') {
        if (action.formFieldObject.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          emailValid = action.formFieldObject.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).length === 4;
        } else {
          emailValid = false;
        }
      }
      return {
        ...state,
        emailValid,
        [action.formFieldObject.field]: action.formFieldObject.value,
      };
    
    // FETCH_FORM_FAILURE - update form with error message
    case actions.FETCH_FORM_FAILURE:
      return {
        ...state,
        registerError: action.message,
      }

    default:
      return state;
  }
};

const formReducer = (state: FormState = initialFormState, action: any): FormState => {
  switch (action.type) {
    // UPDATE_FIELD
    case actions.UPDATE_FIELD:
    if (action.formFieldObject.form === 'login') {
      return {
        ...state,
        login: loginReducer(state.login, action),
      }
    } else if (action.formFieldObject.form === 'register') {
      return {
        ...state,
        register: registerReducer(state.register, action),
      }
    } else if (action.formFieldObject.form === 'forgot') {
      return {
        ...state,
        forgot: forgotReducer(state.forgot, action),
      }
    } else if (action.formFieldObject.form === 'reset') {
      return {
        ...state,
        reset: resetReducer(state.reset, action),
      }
    }

    //  FETCH_FORM_SUCCESS - Reset Login State to Initial Login State
    case actions.FETCH_FORM_SUCCESS:
      return {
        ...state,
        login: initialLoginState,
        register: initialRegisterState,
      };

    //  FETCH_FORM_FAILURE - Update form with error message
    case actions.FETCH_FORM_FAILURE:
      if (action.form === 'register') {
        return {
          ...state,
          register: registerReducer(state.register, action),
        };
      }
      if (action.form === 'login') {
        return {
          ...state,
          login: loginReducer(state.login, action),
        };
      }
      if (action.form === 'forgot') {
        return {
          ...state,
          forgot: forgotReducer(state.forgot, action),
        };
      }
      if (action.form === 'reset') {
        return {
          ...state,
          reset: resetReducer(state.reset, action),
        };
      }

    default:
      return state;
  }
};

export default formReducer;
