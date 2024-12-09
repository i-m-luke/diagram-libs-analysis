// NOTE: Diagram Pin object renderer recipe

import type EventBus from 'diagram-js/lib/core/EventBus'
import BaseRenderer, { type Shape } from 'diagram-js/lib/draw/BaseRenderer'
import { append, attr, create } from 'tiny-svg'
import { is } from 'bpmn-js/lib/util/ModelUtil'
import type { Point } from './Point'

import type Injectable from './Injectable'

const TYPE = 'functionBlock'

export default class FunctionBlockRenderer
  extends BaseRenderer
  implements Injectable
{
  $inject = ['eventBus']

  constructor(eventBus: EventBus<null>, renderPriority?: number) {
    super(eventBus, renderPriority)
  }

  canRender(element: Element) {
    return is(element, TYPE)
  }

  drawShape(parentNode: SVGElement, element: Shape) {
    const shape = super.drawShape(parentNode, element)

    element.pins.forEach((pin: Point) => {
      const circle = create('circle')
      attr(circle, {
        cx: element.x + pin.x * element.width,
        cy: element.y + pin.y * element.height,
        r: 3,
        fill: 'black',
      })
      append(parentNode, circle)
    })

    return shape
  }
}
