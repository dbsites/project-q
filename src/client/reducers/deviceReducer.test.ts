/**
 * @module deviceReducerTest
 * @description Unit Tests for Device Reducer
 */

// Import action creator to generate actions to be used as reducer test argument
import { setDevice } from "../actions/actionCreators";

// Import templates to be used as reducer test arguments
import { stubDeviceType } from "../actions/templates";
import deviceReducer, { initialDeviceState } from "./deviceReducer";

describe('Functionality Test: Device Reducer', () => {
  it('Should return initial state by default', () => {
    expect(deviceReducer(undefined, { type: 'STUB', deviceType: 'STUB' }))
      .toEqual(initialDeviceState)
  })
  it('Should update deviceType to the string passed in with the request', () => {
    expect(deviceReducer(initialDeviceState, setDevice(stubDeviceType)).deviceType)
      .toEqual(stubDeviceType);
  })
});
