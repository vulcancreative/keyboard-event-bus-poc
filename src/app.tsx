import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./app.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import useShortcut from "./hooks/use-shortcut";
import KeyboardEventBus from "./utils/keyboard-event-bus";
import { Key } from "./types";

function App() {
  const onShortcutFired = () => toast("Congrats! You just hit a shortcut.");

  useEffect(() => {
    // Add a publisher
    const publisher = KeyboardEventBus.instance.addPublisher(
      "CMD_LEFT+SHIFT_LEFT+L",
      [Key.CMD_LEFT, Key.SHIFT_LEFT, Key.L_LOWERCASE]
    );

    // Add a subscriber
    KeyboardEventBus.instance.addSubscriber(
      "SUB_1",
      publisher.id,
      onShortcutFired
    );

    return () => {
      KeyboardEventBus.instance.removeAllSubscribers(publisher.id);
      KeyboardEventBus.instance.removeAllPublishers();
    };
  }, []);

  const [activeKeys] = useShortcut();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {!activeKeys.length && <p>Press left Command + left Shift + L</p>}
        {!!activeKeys.length && <p>{activeKeys.join(" + ")}</p>}
      </header>
      <ToastContainer />
    </div>
  );
}

export default App;
