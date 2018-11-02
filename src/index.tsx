/**
 * ************************************
 *
 * @module  index.tsx
 * @author Team Quail
 * @date
 * @description Application Entry Point. Hang React App off #App in index.html
 *
 * ************************************
 */

import * as React from "react";
import { render } from "react-dom";

import Root from "./Root";
import store from './client/store'

// Wrap App in Provider (passing in store)
render(
  <Root store={store} />,
  document.getElementById('root'),
);
