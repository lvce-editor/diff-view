import { expect, test } from '@jest/globals'
import { EventExpression } from '@lvce-editor/constants'
import * as DomEventListenerFunctions from '../src/parts/DomEventListenerFunctions/DomEventListenerFunctions.ts'
import { renderEventListeners } from '../src/parts/RenderEventListeners/RenderEventListeners.ts'

test('renderEventListeners registers tracked sash pointer listeners', (): void => {
  const result = renderEventListeners()

  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleWheel,
    params: ['handleWheel', EventExpression.DeltaMode, EventExpression.DeltaY],
    passive: true,
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleContextMenu,
    params: ['handleContextMenu', EventExpression.Button, EventExpression.ClientX, EventExpression.ClientY],
    preventDefault: true,
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleSashPointerDown,
    params: ['handleSashPointerDown', EventExpression.ClientX, EventExpression.ClientY],
    trackPointerEvents: [DomEventListenerFunctions.HandleSashPointerMove, DomEventListenerFunctions.HandleSashPointerUp],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleSashPointerMove,
    params: ['handleSashPointerMove', EventExpression.ClientX, EventExpression.ClientY],
  })
  expect(result).toContainEqual({
    name: DomEventListenerFunctions.HandleSashPointerUp,
    params: ['handleSashPointerUp', EventExpression.ClientX, EventExpression.ClientY],
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
