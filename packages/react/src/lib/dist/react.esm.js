import React from 'react';
import { __assign, __extends, __rest } from 'tslib';
import ReactDom from 'react-dom';
import { applyPolyfills, defineCustomElements } from '@test/ui-core/loader';
export { MyClass } from '@test/ui-core/dist/tsc';

function attachEventProps(node, newProps, oldProps) {
    if (oldProps === void 0) { oldProps = {}; }
    var className = getClassName(node.classList, newProps, oldProps);
    if (className) {
        node.className = className;
    }
    Object.keys(newProps).forEach(function (name) {
        if (name === 'children' || name === 'style' || name === 'ref' || name === 'className') {
            return;
        }
        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
            var eventName = name.substring(2);
            var eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
            if (!isCoveredByReact(eventNameLc)) {
                syncEvent(node, eventNameLc, newProps[name]);
            }
        }
        else {
            node[name] = newProps[name];
        }
    });
}
function getClassName(classList, newProps, oldProps) {
    // map the classes to Maps for performance
    var currentClasses = arrayToMap(classList);
    var incomingPropClasses = arrayToMap(newProps.className ? newProps.className.split(' ') : []);
    var oldPropClasses = arrayToMap(oldProps.className ? oldProps.className.split(' ') : []);
    var finalClassNames = [];
    // loop through each of the current classes on the component
    // to see if it should be a part of the classNames added
    currentClasses.forEach(function (currentClass) {
        if (incomingPropClasses.has(currentClass)) {
            // add it as its already included in classnames coming in from newProps
            finalClassNames.push(currentClass);
            incomingPropClasses.delete(currentClass);
        }
        else if (!oldPropClasses.has(currentClass)) {
            // add it as it has NOT been removed by user
            finalClassNames.push(currentClass);
        }
    });
    incomingPropClasses.forEach(function (s) { return finalClassNames.push(s); });
    return finalClassNames.join(' ');
}
/**
 * Checks if an event is supported in the current execution environment.
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */
function isCoveredByReact(eventNameSuffix, doc) {
    if (doc === void 0) { doc = document; }
    var eventName = 'on' + eventNameSuffix;
    var isSupported = eventName in doc;
    if (!isSupported) {
        var element = doc.createElement('div');
        element.setAttribute(eventName, 'return;');
        isSupported = typeof element[eventName] === 'function';
    }
    return isSupported;
}
function syncEvent(node, eventName, newEventHandler) {
    var eventStore = node.__events || (node.__events = {});
    var oldEventHandler = eventStore[eventName];
    // Remove old listener so they don't double up.
    if (oldEventHandler) {
        node.removeEventListener(eventName, oldEventHandler);
    }
    if (newEventHandler != null) {
        // Bind new listener.
        node.addEventListener(eventName, (eventStore[eventName] = function handler(e) {
            newEventHandler.call(this, e);
        }));
    }
}
function arrayToMap(arr) {
    var map = new Map();
    arr.forEach(function (s) { return map.set(s, s); });
    return map;
}

var dashToPascalCase = function (str) {
    return str
        .toLowerCase()
        .split('-')
        .map(function (segment) { return segment.charAt(0).toUpperCase() + segment.slice(1); })
        .join('');
};
var createForwardRef = function (ReactComponent, displayName) {
    var forwardRef = function (props, ref) {
        return React.createElement(ReactComponent, __assign({}, props, { forwardedRef: ref }));
    };
    forwardRef.displayName = displayName;
    return React.forwardRef(forwardRef);
};

var createReactComponent = function (tagName) {
    var displayName = dashToPascalCase(tagName);
    var ReactComponent = /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            return _super.call(this, props) || this;
        }
        class_1.prototype.componentDidMount = function () {
            this.componentDidUpdate(this.props);
        };
        class_1.prototype.componentDidUpdate = function (prevProps) {
            var node = ReactDom.findDOMNode(this);
            attachEventProps(node, this.props, prevProps);
        };
        class_1.prototype.render = function () {
            var _a = this.props, children = _a.children, forwardedRef = _a.forwardedRef, style = _a.style, className = _a.className, cProps = __rest(_a, ["children", "forwardedRef", "style", "className", "ref"]);
            var propsToPass = Object.keys(cProps).reduce(function (acc, name) {
                if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
                    var eventName = name.substring(2).toLowerCase();
                    if (isCoveredByReact(eventName)) {
                        acc[name] = cProps[name];
                    }
                }
                return acc;
            }, {});
            var newProps = __assign(__assign({}, propsToPass), { ref: forwardedRef, style: style,
                className: className });
            return React.createElement(tagName, newProps, children);
        };
        Object.defineProperty(class_1, "displayName", {
            get: function () {
                return displayName;
            },
            enumerable: true,
            configurable: true
        });
        return class_1;
    }(React.Component));
    return createForwardRef(ReactComponent, displayName);
};

/* eslint-disable */
applyPolyfills().then(function () { return defineCustomElements(); });
var XBox = /*@__PURE__*/ createReactComponent('x-box');

var Box = function (_a) {
    var title = _a.title, myClassInstance = _a.myClassInstance, myObject = _a.myObject, Footer = _a.Footer, onEvent = _a.onEvent;
    return (React.createElement(XBox, { headerTitle: title, myClassInstance: myClassInstance, myObject: myObject, onEvent: function (ev) { return onEvent(ev.detail); } },
        React.createElement("span", { slot: "body" }, "I am a web component"),
        React.createElement("span", { slot: "footer" },
            React.createElement(Footer, null))));
};

export { Box };
//# sourceMappingURL=react.esm.js.map
