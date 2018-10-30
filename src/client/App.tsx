/**
 * @module App.tsx
 * @description Overarching App Container
 */


 import * as React from 'react';
import FormContainer from './containers/FormContainer';

class App extends React.Component {
  // TODO: Explicit type for props
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <FormContainer />
      </div>
    );
  }
};

export default App;
