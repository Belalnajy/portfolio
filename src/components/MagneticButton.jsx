"use client";
import { useRef, useState } from 'react';
import { m } from 'framer-motion';

// A precise pointer that can hover (mouse, trackpad). On a touch screen the
// pull does nothing useful, and the compatibility mouse events a tap fires
// made the button jump under the finger.
const canPull = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Renders a real <a> when given an href (keyboard-focusable, native smooth
// scroll via CSS scroll-behavior), and a <button> otherwise.
const MagneticButton = ({ children, className = '', href, ...props }) => {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = e => {
    if (!canPull()) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x, y });
  };

  const reset = () => {
    setPosition((current) => (current.x === 0 && current.y === 0 ? current : { x: 0, y: 0 }));
  };

  const { x, y } = position;
  const Tag = href ? m.a : m.button;

  return (
    <Tag
      ref={ref}
      href={href}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
      {...props}>
      {children}
    </Tag>
  );
};

export default MagneticButton;
