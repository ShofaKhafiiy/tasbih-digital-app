import { useCallback, useRef } from "react";

/** Guard anti double-tap: abaikan ketukan yang datang terlalu cepat. */
export function useTapCooldown(delayMs = 120) {
  const lastTapRef = useRef(0);

  const canTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < delayMs) return false;
    lastTapRef.current = now;
    return true;
  }, [delayMs]);

  return canTap;
}
