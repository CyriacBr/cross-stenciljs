# Cross-Stencil

This repository is a starter for building web components and consuming them inside React, Angular and VueJS applications. This can be usefull when building a design system or a product that can be delivered to almost all of the frontend devs audiance.

Resources on interoperability with web components and major front-end frameworks are scarce, and those who exist actually are too shallow and don't reflect the reality of actually setting-up such a project. The goal of this repo is to make that easier and ships everything that's needed to ensure seamless integration, including:
* Proper two-sided communication with web components and framework specifics component
* Proper and fully functionnal unit and e2e testing of framework specific components consuming web components
* Proper and fully functionnal deployment and consumption of framework specific components using web components

I decided to go with StencilJS for this setup, which is promising and actually used in production by the Ionic team.

## Getting Started

1. Clone the repository  
2. Using your favorite IDE, search and replace all occurence of `@test/` with `@{your package namespace}/`.  
Cross-stencil uses this monorepo structure with diferent packages you need to name:
```
o
|-- packages
|   |-- ui-core
|   |   |-- src
|   |   `-- dist
|   `-- react
|       |-- src
|       |   `-- lib
|       `-- dist
|-- lerna.json
`-- package.json
```
3. Run `yarn install` at the root of the repo
3. Write your web components using [Stencil](https://stenciljs.com/docs/introduction) inside the `ui-core` package.
4. `yarn build`
5. Wrap the web components with framework specific components inside the `react/src/lib`... folder.
6. `yarn build` and `yarn publish` to consume in a real app.

## Features
* ✅ Build Stencil components
* ✅ React integration:  
    * ✅ Complete communication and props forwarding
    * ✅ Runnable example
    * ✅ Unit testing
* ❌ VueJS integration
* ❌ Angular integration

## Integration

Given the following Stencil component:
```tsx
@Component({
  tag: "x-box",
  styleUrl: "box.css",
  shadow: false
})
export class Box {
  @Prop() headerTitle: string;
  @Prop() myObject: MyObject;
  @Prop() myClassInstance: MyClass;

  @Event({ bubbles: true, composed: true }) event: EventEmitter;

  onClick() {
    this.event.emit({
      headerTitle: this.headerTitle,
      myObject: this.myObject,
      myClassInstance: this.myClassInstance
    });
  }

  render() {
    return (
      <div class="box" onClick={this.onClick.bind(this)}>
        <span class="title">{this.headerTitle}</span>
        <div class="body">
          <slot name="body" />
        </div>
        <span class="footer">
          <slot name="footer" />
        </span>
      </div>
    );
  }
}
```

### React

When building Stencil components, some files will be generated inside the `react/lib/src/stencil` folder: 
```
o
|-- react-components-lib
|   `-- stuff 
`-- components.ts
```
Thanks to `@stencil/react-output-target`, stencil components will be automatically converted to React components and exported inside `components.ts`:
```ts
import { createReactComponent } from './react-component-lib';

export const XBox = /*@__PURE__*/createReactComponent<JSX.XBox, HTMLXBoxElement>('x-box');
```
You'll then need to use the exported components and create a proper wrapper, if needed, inside `lib/src/components`:
```tsx
import React, { FC, ComponentType } from "react";
import { XBox } from "../stencil/components";
import { MyClass, MyObject } from "@test/ui-core/dist/tsc";

export interface BoxProps {
  title: string;
  myObject: MyObject;
  myClassInstance: MyClass;
  Footer: ComponentType;
  onEvent: (props: BoxProps) => void;
}

export const Box: FC<BoxProps> = ({
  title,
  myClassInstance,
  myObject,
  Footer,
  onEvent
}) => {
  return (
    <XBox
      headerTitle={title}
      myClassInstance={myClassInstance}
      myObject={myObject}
      onEvent={(ev: any) => onEvent(ev.detail)}
    >
      <span slot="body">I am a web component</span>
      <span slot="footer">
        <Footer />
      </span>
    </XBox>
  );
};
```
You can then proceed to visually "test" your component by using it inside `react/src/App.tsx` and running `yarn start`.

For unit testing, we're using `cypress-react-unit-test` and [some hacks](https://github.com/CyriacBr/cross-stenciljs/issues/2#issuecomment-589597172) which seems to be so far the only reasonable solution
to unit test a react component who consumes a web component.  
You'll need to be a bit famillar with `Cypress` for that but all you have to do is write a `.spec.tsx` file
inside `cypress/integration`, then run `yarn cypress`. Here's an example of a unit test file:
```tsx
describe("<Box />", () => {
  const instance = new MyClass("bar");
  const obj: MyObject = {
    foo: "bar"
  };
  const DummyFooter = () => <span>I am a footer</span>;
  let receivedProps: BoxProps = null;
  before(() => {
    cy.ensureCustomElements().mount(
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
```

### VueJS

### Angular