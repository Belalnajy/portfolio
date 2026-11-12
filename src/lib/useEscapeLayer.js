"use client";
import { useEffect, useRef } from 'react';

/**
 * One Escape press closes one layer: the one opened last.
 *
 * Every open overlay (phone menu, contact dock, FAQ panel, command palette,
 * project sheet, certificate lightbox) registers here instead of listening
 * for Escape on its own, which closed two layers at once whenever they were
 * stacked (FAQ panel under the palette, palette over the project sheet).
 */
const stack = [];

const onKeyDown = (event) => {
  // An IME uses Escape to cancel a composition, and a held key repeats:
  // neither is a request to close something.
  if (event.key !== 'Escape' || stack.length === 0 || event.isComposing || event.repeat) return;
  event.preventDefault();
  stack[stack.length - 1].current(event);
};

export const useEscapeLayer = (active, handler) => {
  const handlerRef = useRef(handler);
  useEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    if (!active) return undefined;
    const entry = handlerRef;
    if (stack.length === 0) document.addEventListener('keydown', onKeyDown);
    stack.push(entry);
    return () => {
      const index = stack.lastIndexOf(entry);
      if (index !== -1) stack.splice(index, 1);
      if (stack.length === 0) document.removeEventListener('keydown', onKeyDown);
    };
  }, [active]);
};
