// NOTE: Diagram Pin object rules

import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider'
import type EventBus from 'diagram-js/lib/core/EventBus'
import type { Shape } from 'diagram-js/lib/model/Types'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import type { Point } from './Point'

const PIN_ELEMENT_TYPE = 'pinElement'

export default class FunctionBlockRules extends RuleProvider {
  constructor(eventBus: EventBus) {
    super(eventBus)

    this.addRule('connection.start', function (context: ConnectionContext) {
      return canConnect(context.source, context.target, context)
    })

    this.addRule('connection.create', function (context: ConnectionContext) {
      return canConnect(context.source, context.target, context)
    })
  }
}

interface ConnectionContext {
  source: Shape
  target: Shape
  sourcePosition?: Point
  targetPosition?: Point
}

function canConnect(
  source: Shape,
  target: Shape,
  context: ConnectionContext,
): boolean {
  if (is(source, PIN_ELEMENT_TYPE) || is(target, PIN_ELEMENT_TYPE)) {
    const pinElement = is(source, PIN_ELEMENT_TYPE) ? source : target

    const connectionPoint = is(source, PIN_ELEMENT_TYPE)
      ? context.sourcePosition
      : context.targetPosition

    const unknownPoint = { x: -1000, y: -1000 }
    return isPinPosition(pinElement, connectionPoint ?? unknownPoint)
  }

  return true
}

function isPinPosition(element: Shape, position: { x: number; y: number }) {
  return element.pins.some((pin: { x: number; y: number }) => {
    const pinPos = {
      x: element.x + pin.x * element.width,
      y: element.y + pin.y * element.height,
    }
    return (
      Math.abs(position.x - pinPos.x) < 5 && Math.abs(position.y - pinPos.y) < 5
    )
  })
}

FunctionBlockRules.$inject = ['eventBus']
