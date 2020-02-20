import { FC, ComponentType } from 'react';
import { MyClass, MyObject } from '@test/ui-core/dist/tsc';
export { MyClass, MyObject };
export interface BoxProps {
    title: string;
    myObject: MyObject;
    myClassInstance: MyClass;
    Footer: ComponentType;
    onEvent: (props: BoxProps) => void;
}
export declare const Box: FC<BoxProps>;
