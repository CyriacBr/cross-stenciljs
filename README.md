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
3. Write your web components using Stencil inside `ui-core`.
4. `yarn build`
5. Wrap the web components with framework specific components inside the `react/src/lib`... folder.
6. `yarn build` and `yarn publish` to consume in a real app.

## Features
* ✅ Build Stencil components
* ❌ React integration:  
    * ✅ Complete communication and props forwarding
    * ✅ Runnable example
    * ❌ Unit testing
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

❗️ Now comes the troubles. Unit testing `Box`, or even `XBox` (whatever React component that consumes a web component) seems impossible currently. The current tooling such as `react-testing-library` is unable to render web components.  
We need a testing library that leverage a real browser while letting us test component units instead of a full blown and served app.  
So far `cypress-react-unit-test` ticks all the boxes. But still, stencil components do not seem to fully render.  
Here's how `x-box` is rendered inside `App.tsx` when running `yarn start`:
```html
<x-box class="hydrated">
    <!---->
    <div class="box">
        <span class="title">Hello World</span>
        <div class="body">
            <span slot="body">I am a web component</span>
        </div>
        <span class="footer">
            <span slot="footer">
                <span>I am a footer</span>
            </span>
        </span>
    </div>
</x-box>
```
A fully hydrated, styled and functionnal custom element.  
However, here's what is rendered when we run Cypress:  
```html
<div id="cypress-jsdom">
    <x-box>
        <span slot="body">I am a web component</span>
        <span slot="footer">
            <span>I am a footer</span>
        </span>
    </x-box>
</div>
```
Unhydrated, unstyled with the `title` prop not being passed, as well as the `div .box` element missing.  
This seems to me that Stencil bundle isn't correctly injected or working inside Cypress' rendered `document`.  

`cypress-react-unit-test` injects `React` and `ReactDOM` bundles inside the testing document, which allows us to `ReactDOM.render` on the fly. 
[See more details here](https://github.com/bahmutov/cypress-react-unit-test/blob/master/lib/index.ts).  
I tried to mimic that logic by injecting stencil built files, to no avail. For example, injecting `ui-core/dist/ui-core/ui-core.js` (the recommended file to attach to the script tag according to Stencil docs) cause an error. `Uncaught TypeError: Failed to construct 'URL': Invalid base URL`.

My attemps can be found sindie `react/cypress/supports`. PRs are welcomed!