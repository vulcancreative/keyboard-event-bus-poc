import { useEffect, useRef, useState } from "react";
import KeyboardEventBus from "../utils/keyboard-event-bus";
import getLocalizedKey from "../utils/get-localized-key";

const useShortcut = () => {
  const activeKeysRef = useRef<string[]>([]);
  const [activeKeys, setActiveKeys] = useState<string[]>([]);

  useEffect(() => {
    if (!activeKeys.length) {
      return;
    }
    const matchesPublishers =
      KeyboardEventBus.instance.filterPublisherByKeys(activeKeys);
    if (!!matchesPublishers.length) {
      KeyboardEventBus.instance.fireAllCallbacks(matchesPublishers);
    }
  }, [activeKeys]);

  const resetKeys = () => {
    activeKeysRef.current = [];
    setActiveKeys(activeKeysRef.current);
  };

  const addKey = (key: string) => {
    if (activeKeysRef.current.includes(key)) {
      return;
    }
    activeKeysRef.current = [...activeKeysRef.current, key];
    setActiveKeys(activeKeysRef.current);
  };

  useEffect(() => {
    const onKeyDown = async (evt: KeyboardEvent) => {
      evt = evt || window.event;
      const key = await getLocalizedKey(evt);
      addKey(key);
    };
    const onKeyUp = async (evt: KeyboardEvent) => {
      resetKeys();
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    // Detect window blur event and reset all
    window.addEventListener("blur", resetKeys);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", resetKeys);
    };
  }, []);

  return [activeKeys];
};

export default useShortcut;
