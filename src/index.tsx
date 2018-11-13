/**
 * ************************************
 *
 * @module  index.tsx
 * @description Application Entry Point. Hang Root App off #root in index.html
 *
 * ************************************
 */

import * as React from "react";
import { render } from "react-dom";

import Root from "./Root";
import store from './client/store'

render(
  <Root store={store} />,
  document.getElementById('root'),
);
