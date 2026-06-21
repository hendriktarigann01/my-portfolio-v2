import { useEffect, useCallback } from "react";

export function useKeyboardNavigation({
  onLeft,
  onRight,
  enabled = true,
}: {
  onLeft: () => void;
  onRight: () => void;
  enabled?: boolean;
}) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      if (e.key === "ArrowLeft") onLeft();
      if (e.key === "ArrowRight") onRight();
    },
    [onLeft, onRight, enabled]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);
}
