/* eslint-disable @typescript-eslint/no-unused-vars */
import EventBus from 'diagram-js/lib/core/EventBus'
import ElementFactory from 'diagram-js/lib/core/ElementFactory'

type ClassService = {
  test: () => void
}

function ClassService(
  this: ClassService,
  eventBus: EventBus,
  elementFactory: ElementFactory,
) {
  this.test = function () {
    console.log('test')
  }
}

ClassService.$inject = ['eventBus', 'elementFactory']

export { ClassService }
