# Keyboard Event Bus PoC
Temporary repo for a frontend keyboard event bus feature PoC

> Demo: https://vulcancreative.github.io/keyboard-event-bus-poc

Open [src/app.tsx](https://github.com/vulcancreative/keyboard-event-bus-poc/blob/172243d6fd26ff205aa8bafc9cce44c861604010/src/app.tsx) to see how to add a publisher and subscriber to the keyboard event bus.

This PoC consists of several moving parts:
- [KeyboardEventBus](https://github.com/vulcancreative/keyboard-event-bus-poc/blob/172243d6fd26ff205aa8bafc9cce44c861604010/src/utils/keyboard-event-bus.ts) class - this is where all event publishers and subscriber temporarily stored on the memory
- [useShortcut](https://github.com/vulcancreative/keyboard-event-bus-poc/blob/172243d6fd26ff205aa8bafc9cce44c861604010/src/hooks/use-shortcut.ts) hooks - this is a React hook to monitor key press and match it to the keyboard event publishers keys.
- [getLocalizedKey](https://github.com/vulcancreative/keyboard-event-bus-poc/blob/172243d6fd26ff205aa8bafc9cce44c861604010/src/utils/get-localized-key.ts) helper - a helper to translate the keyboard key code into localized keyboard key based on user's keyboard layout map

## Getting started
#### Install depedencies:
```
yarn
```
#### Start development server:
```
yarn start
```
