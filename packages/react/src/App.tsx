import React from "react";
import "./App.css";
import { Box, BoxProps } from "./lib/src";
import { MyClass } from "@test/ui-core";

function App() {
  return (
    <div className="App">
      <Box
        title="Hello World"
        myClassInstance={new MyClass("bar")}
        myObject={{ foo: "bar" }}
        Footer={() => <span>I am a footer</span>}
        onEvent={(ev: BoxProps) => console.log("onEvent: ", ev)}
      />
    </div>
  );
}

export default App;
