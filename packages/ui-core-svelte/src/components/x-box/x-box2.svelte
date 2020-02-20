<script lang="typescript">
  import { MyObject, MyClass } from "./interfaces.ts";
  export let headertitle: string;
  export let myobject: MyObject;
  export let myclassinstance: MyClass;

  function dispatchClickEvent(e) {
    const event = new CustomEvent("event", {
      detail: {
        headertitle,
        myobject,
        myclassinstance
      },
      bubbles: true,
      cancelable: true,
      composed: true
    });
    this.dispatchEvent(event);
  }
</script>

<style>
  .box {
    box-shadow: 0 8px 12px rgba(60, 90, 120, 0.1);
    background: rgb(251, 252, 253);
    padding: 1em;
    display: flex;
    flex-direction: column;
    color: black;
    border-radius: 6px;
    font-family: monospace;
  }

  .box:hover {
    cursor: pointer;
    top: 4px;
  }

  .box:active {
    top: 8px;
    transition: 0;
  }

  .body span {
    color: #61dafb;
  }

  .title {
    font-size: 2em;
    margin-bottom: 0.5em;
  }

  .footer {
    margin-top: 0.7em;
    padding-top: 0.3em;
    border-top: 1px solid #ddd;
  }
</style>

<svelte:options tag="x-box2" />
<template>
  <div class="box" on:click="{dispatchClickEvent}">
    <span class="title">{headertitle}</span>
    <div class="body">
      <slot name="body" />
    </div>
    <span class="footer">
      <slot name="footer" />
    </span>
  </div>
</template>
