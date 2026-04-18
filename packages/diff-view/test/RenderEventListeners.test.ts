import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners registers tracked sash pointer listeners', (): void => {
  const result = renderEventListeners()

  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleSashPointerDown,
    params: ['handleSashPointerDown', EventExpression.ClientX],
    trackPointerEvents: [DomEventListenerFunctions.HandleSashPointerMove, DomEventListenerFunctions.HandleSashPointerUp],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleSashPointerMove,
    params: ['handleSashPointerMove', EventExpression.ClientX],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleSashPointerUp,
    params: ['handleSashPointerUp', EventExpression.ClientX],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleScrollBarPointerDown,
    params: ['handleScrollBarPointerDown', EventExpression.ClientY],
    trackPointerEvents: [DomEventListenerFunctions.HandleScrollBarPointerMove, DomEventListenerFunctions.HandleScrollBarPointerUp],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleScrollBarPointerMove,
    params: ['handleScrollBarPointerMove', EventExpression.ClientY],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleScrollBarPointerUp,
    params: ['handleScrollBarPointerUp', EventExpression.ClientY],
  })
})
