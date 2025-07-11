import React from "react"
import { createRoot } from "react-dom/client"
import HelloWorld from "./components/HelloWorld.js"
import SampleComponent from "./components/SampleComponent.js"

const ComponentArr = {
  hello_world: HelloWorld,
  sample_component: SampleComponent
}

const App = ({ componentType, title }) => {
  const Component = ComponentArr[componentType]

  if (!Component) {
    console.warn(`Component "${componentType}" not found in registry`)
    return <div>Component not found: {componentType}</div>
  }

  return <Component title={title} />
}

const container = document.getElementById("react-root")

;(function (Drupal, drupalSettings) {
  Drupal.behaviors.reactComponent = {
    attach(context, settings) {
      for (const key in settings.reactComponents) {
        const data = settings.reactComponents[key]
        const componentType = settings.reactComponents[key].componentType
        const title = settings.reactComponents[key].title
        let elm = null

        // I kept a seperate if/else for paragraph and blocks, even though they basically both do the same thing
        // in case I wanted to differentiate them somehow, or pass different variables, or something
        // of course the "root.render" would have to be moved inside this if/else in that case
        if (key.startsWith("rc-paragraph")) {
          elm = document.querySelector(
            `.react-components-paragraph[data-uuid="${data.paragraph_uuid}"]:not(.processed)`
          )
        } else if (key.startsWith("rc-block")) {
          elm = document.querySelector(
            `.react-components-block[data-uuid="${data.block_uuid}"]:not(.processed)`
          )
        }

        if (elm && elm.nodeType === Node.ELEMENT_NODE) {
          elm.classList.add("processed")
          const root = createRoot(elm)
          root.render(<App componentType={componentType} />)
        }
      }
    }
  }
})(Drupal, drupalSettings)
