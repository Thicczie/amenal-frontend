import React from "react";

export function useLongPress(callback, options = {}) {
  const { threshold = 400, onStart, onFinish, onCancel } = options;
  const isLongPressActive = React.useRef(false);
  const isPressed = React.useRef(false);
  const timerId = React.useRef();

  return React.useMemo(() => {
    if (typeof callback !== "function") {
      return {};
    }

    const start = (event, ...args) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (onStart) {
        onStart(event);
      }

      isPressed.current = true;
      timerId.current = setTimeout(() => {
        callback(event, ...args);
        isLongPressActive.current = true;
      }, threshold);
    };

    const cancel = (event) => {
      if (!isMouseEvent(event) && !isTouchEvent(event)) return;

      if (isLongPressActive.current) {
        if (onFinish) {
          onFinish(event);
        }
      } else if (isPressed.current) {
        if (onCancel) {
          onCancel(event);
        }
      }

      isLongPressActive.current = false;
      isPressed.current = false;

      if (timerId.current) {
        window.clearTimeout(timerId.current);
      }
    };


    const touchHandlers = {
      onTouchStart: start,
      onTouchMove: cancel,
      onTouchEnd: cancel,
    };

    return {

      ...touchHandlers,
    };
  }, [callback, threshold, onCancel, onFinish, onStart]);
}


function isMouseEvent(event) {
  return event.nativeEvent instanceof MouseEvent;
}

function isTouchEvent({ nativeEvent }) {
  return window.TouchEvent
    ? nativeEvent instanceof TouchEvent
    : "touches" in nativeEvent;
}