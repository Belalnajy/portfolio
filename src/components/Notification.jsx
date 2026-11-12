"use client";
import { useEffect, useState } from "react";
import { m, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";

/**
 * The site's toast, in two parts.
 *
 * What is seen: the toast card, with its icon and close button, in a plain
 * container that is not a live region, so the close button's name is never
 * read out as part of the message.
 *
 * What is heard: two visually hidden live regions that stay mounted for the
 * whole visit, one polite (role="status") and one assertive (role="alert").
 * Only the message text goes into the one that matches its type. A live
 * region only announces changes to content it already contains, so a region
 * that mounts together with its message would be read by no screen reader.
 * Every call to showNotification gets a new `announceKey`; the region is
 * emptied and refilled a beat later, so the same message twice in a row
 * (two failed downloads) is announced twice instead of being a no-op.
 *
 * Errors stay up longer than confirmations (see SiteShell) and either can be
 * dismissed. The width is capped at the viewport so a 320px phone keeps a
 * margin on both sides.
 */
const Toast = ({ message, type, onClose, closeLabel }) => (
  <m.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -50 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className={`pointer-events-auto bg-[rgb(var(--card))] border ${
      type === "error" ? "border-[rgb(var(--destructive))]" : "border-[rgb(var(--success))]"
    } rounded-lg shadow-lg ps-4 pe-1 py-2 flex items-center gap-3 w-full sm:w-auto sm:min-w-[300px] max-w-md backdrop-blur-sm`}>
    {type === "error" ? (
      <FaExclamationCircle aria-hidden="true" className="shrink-0 text-[rgb(var(--destructive))] text-xl" />
    ) : (
      <FaCheckCircle aria-hidden="true" className="shrink-0 text-[rgb(var(--success))] text-xl" />
    )}
    <p className="text-[rgb(var(--foreground))] flex-grow py-2">{message}</p>
    <button
      type="button"
      onClick={onClose}
      aria-label={closeLabel}
      className="shrink-0 w-11 h-11 flex items-center justify-center rounded-lg text-[rgb(var(--muted-foreground))] hover:text-[rgb(var(--foreground))] transition-colors">
      <FaTimes aria-hidden="true" />
    </button>
  </m.div>
);

const REGION = "fixed top-24 inset-x-0 z-50 flex justify-center px-4 pointer-events-none";

// Long enough for screen readers to register the emptied region as a change.
const REANNOUNCE_DELAY = 100;

const Notification = ({ message, type = "success", isVisible, onClose, closeLabel = "Dismiss", announceKey }) => {
  const isError = type === "error";
  // What the live regions say, tagged with the toast it belongs to. Until
  // the delayed update lands, a new toast's key differs and both regions are
  // empty: that is the "clear" half of clear-then-set.
  const [spoken, setSpoken] = useState({ key: null, text: "", error: false });

  useEffect(() => {
    if (!isVisible || !message) return undefined;
    const timer = setTimeout(
      () => setSpoken({ key: announceKey, text: message, error: isError }),
      REANNOUNCE_DELAY,
    );
    return () => clearTimeout(timer);
  }, [announceKey, isVisible, message, isError]);

  const current = isVisible && spoken.key === announceKey ? spoken : null;

  return (
    <>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {current && !current.error ? current.text : ""}
      </div>
      <div role="alert" aria-live="assertive" aria-atomic="true" className="sr-only">
        {current && current.error ? current.text : ""}
      </div>
      <div className={REGION}>
        <AnimatePresence>
          {isVisible && (
            <Toast key={isError ? "alert" : "status"} message={message} type={type} onClose={onClose} closeLabel={closeLabel} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Notification;
