/// <reference types="cypress" />
import React from "react";
import { Box, BoxProps } from "../../src/lib/src";
import { MyClass, MyObject } from "@test/ui-core/dist/tsc";
/* eslint-disable */

describe("<Box />", () => {
  const instance = new MyClass("bar");
  const obj: MyObject = {
    foo: "bar"
  };
  const DummyFooter = () => <span>I am a footer</span>;
  let receivedProps: BoxProps = null;
  before(() => {
    //@ts-ignore
    (cy.ensureCustomElements() as Cypress.Chainable).mount(
      (
        <Box
          Footer={() => <DummyFooter />}
          myClassInstance={instance}
          myObject={obj}
          onEvent={props => {
            receivedProps = props;
          }}
          title="Hello World!"
        />
      ) as any
    );
  });

  it(`correctly forwards events`, () => {
    cy.state('window').document.querySelector('.box').click();
    expect(receivedProps).not.to.be.null;
  });

  it(`correctly passes object props`, () => {
    expect(receivedProps.myObject).to.deep.eq({ foo: "bar" });
  });

  it(`correctly passes class instances props`, () => {
    expect(receivedProps.myClassInstance.foo).to.eq("bar");
  });

  it(`correctly render react components as children`, () => {
    cy.contains("I am a footer");
  });
});
