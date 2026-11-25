/**
 * @file Hook guard anti double-tap untuk mencegah ketukan beruntun yang terlalu cepat.
 * @layer Hooks
 */

import { useCallback, useRef } from "react";

import { SESSION_CONFIG } from "@/constants/config";

/**
 * Mengembalikan fungsi `canTap()` yang bernilai `true` hanya jika jeda minimum telah terpenuhi.
 *
 * @param delayMs - Jeda minimum antar ketukan dalam milidetik.
 * @returns Callback penentu apakah ketukan boleh diproses.
 */
export function useTapCooldown(
  delayMs = SESSION_CONFIG.DEFAULT_TAP_COOLDOWN_MS,
) {
  const lastTapRef = useRef(0);

  const canTap = useCallback(() => {
    const now = Date.now();
    if (now - lastTapRef.current < delayMs) return false;
    lastTapRef.current = now;
    return true;
  }, [delayMs]);

  return canTap;
}
