import { Component, Prop, h, EventEmitter, Event } from "@stencil/core";
import { MyClass, MyObject } from "./interfaces";

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
