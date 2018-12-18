/**
 * @module deviceReducer
 * @description Reducer for Device
 * UNIT TEST COVERAGE - 100%
 */

// Import action types
import actions from "../actions/actionTypes";

// Import Device and SetDeviceAction Interfaces
import { DeviceState } from "./types";
import { ISetDeviceAction } from "../actions/types";

// Define Initial State
export const initialDeviceState: DeviceState = {
  deviceType: null
};

// Define reducer to update device.deviceType to payload deviceType
const deviceReducer = (
  state: DeviceState = initialDeviceState,
  action: ISetDeviceAction
): DeviceState => {
  // console.log(action);
  const { deviceType, type } = action;
  switch (type) {
    case actions.SET_DEVICE:
      return { deviceType: deviceType };

    default:
      return state;
  }
};

export default deviceReducer;
