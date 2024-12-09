// NOTE: Diagram Pin object factory

import { assign } from 'min-dash'

import EventBus from 'diagram-js/lib/core/EventBus'
import ElementFactory from 'diagram-js/lib/core/ElementFactory'

import type { ModuleDeclaration } from 'didi'
import type { Shape } from 'diagram-js/lib/model/Types'

const TYPE = 'schenaFactory'
const PIN_ELEMENT_TYPE = 'pinElement'
const FB_ELEMENT_TYPE = 'fbElement'

type SchemaFactory = {
  createFunctionBlock: (attrs: Shape[]) => Shape
  createPin: (attrs: Shape[]) => Shape
}

// NOTE: Constructor parameters are injected (see bellow)
function SchemaFactory(
  this: SchemaFactory,
  eventBus: EventBus,
  elementFactory: ElementFactory,
) {
  // attachers = objects that the element is attached to

  this.createFunctionBlock = function (attachers: Shape[]) {
    const element = elementFactory.createShape(
      assign({ type: FB_ELEMENT_TYPE }, attachers),
    )

    element.pins = [
      { id: 'pin1', x: 0, y: 0.5 },
      { id: 'pin2', x: 1, y: 0.5 },
      { id: 'pin3', x: 0.5, y: 0 },
      { id: 'pin4', x: 0.5, y: 1 },
    ]

    return element
  }

  this.createPin = function (attachers: Shape[]) {
    return elementFactory.createShape(
      assign({ type: PIN_ELEMENT_TYPE }, attachers),
    )
  }
}

// NOTE: Injecting dependencies to the constructor
SchemaFactory.$inject = ['eventBus', 'elementFactory']

const SchemaFactoryModule: ModuleDeclaration = {
  //   __depends__: [ AnotherPlugin ],
  __init__: [TYPE],
  [TYPE]: ['type', SchemaFactory],
}

export {
  TYPE,
  SchemaFactoryModule,
  SchemaFactory,
  PIN_ELEMENT_TYPE,
  FB_ELEMENT_TYPE,
}
