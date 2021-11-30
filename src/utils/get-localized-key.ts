const getLocalizedKey = async (
  keyboardEvent: KeyboardEvent
): Promise<string> => {
  const keyboard = (navigator as any).keyboard;

  /*
   * Return key code if the pressed key is not a single character key
   * e.g SHIFT, CMD, CTRL
   */
  if (keyboardEvent.key.length > 1 && keyboardEvent.key !== "Dead") {
    return keyboardEvent.code;
  }
  if (!keyboard) {
    return keyboardEvent.key;
  }

  // Get localized key based on keyboard layout map
  const keyboardLayoutMap = await keyboard.getLayoutMap();
  const localizedKey: string = keyboardLayoutMap.get(keyboardEvent.code);

  return localizedKey;
};

export default getLocalizedKey;
