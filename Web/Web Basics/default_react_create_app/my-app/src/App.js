import React from 'react';
import { Cell, Input, Prompt, Source, Outputs } from "@nteract/presentational-components";

function App() {
  return (
    <Cell style={{backgroundColor : '#111'}}>
      <Input style={{backgroundColor : '#111'}}>
        <Prompt style={{backgroundColor : '#111'}} counter={1} />
        <Source language="python">{`print("Hello World")`}</Source>
      </Input>
      {/* <Outputs>
        <pre>Hello World</pre>
      </Outputs> */}
    </Cell>
  );
}

export default App;
