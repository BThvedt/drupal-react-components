import React from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import HelloWorld from "./components/HelloWorld.js";
import SampleComponent from "./components/SampleComponent.js";

const ComponentArr = {
  hello_world: HelloWorld,
  sample_component: SampleComponent,
};

// the app component, renders multiple components with a "portal" pattern
// I do this to avoid creating multiple instances of react
const App = ({ elmDataArr }) => {
  return (
    <>
      {elmDataArr.map((entry) => {
        const { componentType, elm, ...props } = entry;
        const Component = ComponentArr[componentType];

        if (!Component) {
          console.warn(
            `Component "${componentType}" not found in ComponentArr`
          );
          return <div>Component not found: {componentType}</div>;
        }

        return createPortal(<Component {...props} />, elm); // "title", other vars, are passed to the component props
      })}
    </>
  );
};

// The variables from the drupal components are passed in via settings (or drupalSettings)
// right now I just send an optional "title" for an example, but for more variables add it in preprocess
// for paragraphs (in the .module file) or in the build() function for the block
(function (Drupal, drupalSettings) {
  Drupal.behaviors.reactComponent = {
    attach(context, settings) {
      const elmDataArr = [];

      for (const key in settings.reactComponents) {
        const data = settings.reactComponents[key];
        const componentType = settings.reactComponents[key].componentType;
        const title = settings.reactComponents[key].title;
        let elm = null;
        let otherData = null;

        // right now both types of components pass the same props and render in the same way, but
        // I keep seperate logic with them in case I want a to do different things with the different
        // component types in the future but right now they do the same thing
        // I use a data-uuid for the selector because uuids aren't formatted right for an "id" attribute
        if (key.startsWith("rc-paragraph")) {
          elm = document.querySelector(
            `.react-components-paragraph[data-uuid="${data.paragraph_uuid}"]:not(.processed)`
          );
          otherData = { componentType, title }; // add more variables besides 'title' here
        } else if (key.startsWith("rc-block")) {
          elm = document.querySelector(
            `.react-components-block[data-uuid="${data.block_uuid}"]:not(.processed)`
          );
          otherData = { componentType, title }; // add more variables besides 'title' here
        }

        if (elm && elm.nodeType === Node.ELEMENT_NODE) {
          elm.classList.add("processed");
          elmDataArr.push({ elm, ...otherData });
        }
      }

      // elmDataArr has all the data needed to render the react app
      // dummy html element is needed to mount react
      // various componsnts are rendered into the paragraphs and blocks via a portal pattern
      //
      if (elmDataArr.length) {
        const appContainer = document.createElement("div");
        appContainer.id = "react-app-root";
        appContainer.style.display = "none";
        document.body.appendChild(appContainer);
        const root = createRoot(appContainer);
        root.render(<App elmDataArr={elmDataArr} />);
      }
    },
  };
})(Drupal, drupalSettings);
