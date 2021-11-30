export enum Key {
  SHIFT_LEFT = "ShiftLeft",
  SHIFT_RIGHT = "ShiftRight",
  TAB = "Tab",
  CTRL_LEFT = "ControlLeft",
  CTRL_RIGHT = "ControlRight",
  ALT_LEFT = "AltLeft",
  ALT_RIGHT = "AltRight",
  CMD_LEFT = "MetaLeft",
  CMD_RIGHT = "MetaRight",
  BACKSPACE = "Backspace",
  ENTER = "Enter",
  CAPSLOCK = "CapsLock",
  A_UPPERCASE = "A",
  B_UPPERCASE = "B",
  C_UPPERCASE = "C",
  D_UPPERCASE = "D",
  E_UPPERCASE = "E",
  F_UPPERCASE = "F",
  G_UPPERCASE = "G",
  H_UPPERCASE = "H",
  I_UPPERCASE = "I",
  J_UPPERCASE = "J",
  K_UPPERCASE = "K",
  L_UPPERCASE = "L",
  M_UPPERCASE = "M",
  N_UPPERCASE = "N",
  O_UPPERCASE = "O",
  P_UPPERCASE = "P",
  Q_UPPERCASE = "Q",
  R_UPPERCASE = "R",
  S_UPPERCASE = "S",
  T_UPPERCASE = "T",
  U_UPPERCASE = "U",
  V_UPPERCASE = "V",
  W_UPPERCASE = "W",
  X_UPPERCASE = "X",
  Y_UPPERCASE = "Y",
  Z_UPPERCASE = "Z",
  A_LOWERCASE = "a",
  B_LOWERCASE = "b",
  C_LOWERCASE = "c",
  D_LOWERCASE = "d",
  E_LOWERCASE = "e",
  F_LOWERCASE = "f",
  G_LOWERCASE = "g",
  H_LOWERCASE = "h",
  I_LOWERCASE = "i",
  J_LOWERCASE = "j",
  K_LOWERCASE = "k",
  L_LOWERCASE = "l",
  M_LOWERCASE = "m",
  N_LOWERCASE = "n",
  O_LOWERCASE = "o",
  P_LOWERCASE = "p",
  Q_LOWERCASE = "q",
  R_LOWERCASE = "r",
  S_LOWERCASE = "s",
  T_LOWERCASE = "t",
  U_LOWERCASE = "u",
  V_LOWERCASE = "v",
  W_LOWERCASE = "w",
  X_LOWERCASE = "x",
  Y_LOWERCASE = "y",
  Z_LOWERCASE = "z",
  NUM_0 = "0",
  NUM_1 = "1",
  NUM_2 = "2",
  NUM_3 = "3",
  NUM_4 = "4",
  NUM_5 = "5",
  NUM_6 = "6",
  NUM_7 = "7",
  NUM_8 = "8",
  NUM_9 = "9",
  BACKQUOTE = "`",
}

export type EBCallback = (...args: any[]) => any;

export type EBTarget = HTMLElement | React.Component;

export interface EBSub {
  name: string;
  id: string;
  target?: EBTarget;
  callback: EBCallback;
}

export interface IPublisher {
  target?: EBTarget;
  id: string;
  name: string;
  keys: Key[];
  subscribers?: EBSub[];
}
