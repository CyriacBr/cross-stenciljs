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
