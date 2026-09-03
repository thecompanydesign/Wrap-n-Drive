import { createContext, useCallback, useContext, useEffect, useRef, type ReactNode } from 'react';

type RafCallback = (time: number) => void;

const RafLoopContext = createContext<{ subscribe: (cb: RafCallback) => () => void } | null>(null);

/**
 * Single shared requestAnimationFrame loop — BUILD-SPEC.md §8, engineering rule 8:
 * "useRafLoop must be a single loop shared by all frame-driven behaviour."
 * Nav scroll state, hero parallax and section-rail active state all subscribe here.
 */
export function RafLoopProvider({ children }: { children: ReactNode }) {
  const callbacksRef = useRef(new Set<RafCallback>());
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const tick = (time: number) => {
      callbacksRef.current.forEach((cb) => cb(time));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const subscribe = useCallback((cb: RafCallback) => {
    callbacksRef.current.add(cb);
    return () => {
      callbacksRef.current.delete(cb);
    };
  }, []);

  return <RafLoopContext.Provider value={{ subscribe }}>{children}</RafLoopContext.Provider>;
}

export function useRafLoop(callback: RafCallback, active = true) {
  const ctx = useContext(RafLoopContext);
  const cbRef = useRef(callback);
  cbRef.current = callback;

  useEffect(() => {
    if (!ctx || !active) return;
    return ctx.subscribe((time) => cbRef.current(time));
  }, [ctx, active]);
}
