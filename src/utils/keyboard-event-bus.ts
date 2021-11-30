import { v1 as uuidv1 } from "uuid";
import { EBCallback, EBSub, EBTarget, IPublisher, Key } from "../types";
import sortStringArray from "./sort-string-array";

class KeyboardEventBus {
  static inst?: KeyboardEventBus;
  static get instance(): KeyboardEventBus {
    if (KeyboardEventBus.inst) {
      return KeyboardEventBus.inst;
    }
    KeyboardEventBus.inst = new KeyboardEventBus();
    return KeyboardEventBus.inst;
  }

  private _publishers: IPublisher[] = [];

  getAllPublishers(): IPublisher[] {
    return this._publishers;
  }

  filterPublisherByKeys(keys: string[]): IPublisher[] {
    const sortedKeys = sortStringArray(keys);
    const publishers = this._publishers.filter((pub) => {
      const sortedPubKeys = sortStringArray(pub.keys);
      if (sortedPubKeys.join("") === sortedKeys.join("")) {
        return true;
      }
      return false;
    });
    return publishers;
  }

  fireAllCallbacks(publishers: IPublisher[]) {
    publishers?.forEach((publisher) => {
      const subscribers = publisher.subscribers;
      subscribers?.forEach((subscriber) => {
        if (subscriber.callback) {
          subscriber.callback();
        }
      });
    });
  }

  addPublisher(name: string, keys: Key[], target?: EBTarget): IPublisher {
    // Check if a publisher with same name is already exist
    if (this.isExist(name)) {
      throw new Error("Publisher is already existed.");
    }
    // Generate unique id for publisher
    const id = uuidv1();
    const publisher: IPublisher = {
      target,
      id,
      name,
      keys,
      subscribers: [],
    };
    this._publishers = [...this._publishers, publisher];
    return publisher;
  }

  removePublisher(nameOrId: string): void {
    this._publishers = this._publishers.filter(
      (publisher) => publisher.id !== nameOrId && publisher.name !== nameOrId
    );
  }

  removeAllPublishers(): void {
    this._publishers = [];
  }

  addSubscriber(
    name: string,
    publisherNameOrId: string,
    callback: EBCallback,
    target?: EBTarget
  ): EBSub {
    // Check if publisher exist
    if (!this.isExist(publisherNameOrId)) {
      throw new Error("Publisher does not exist.");
    }

    // Generate unique ID for subscriber
    const id = uuidv1();
    const subscriber: EBSub = {
      id,
      name,
      target,
      callback,
    };

    this._publishers = this._publishers?.map((publisher) => {
      if ([publisher.id, publisher.name].includes(publisherNameOrId)) {
        return {
          ...publisher,
          subscribers: [...(publisher.subscribers || []), subscriber],
        };
      }
      return publisher;
    });

    return subscriber;
  }

  removeSubscriber(publisherNameOrId: string, nameOrId: string): void {
    this._publishers = this._publishers?.map((publisher) => {
      if ([publisher.id, publisher.name].includes(publisherNameOrId)) {
        return {
          ...publisher,
          subscribers: publisher.subscribers?.filter(
            (_sub) => _sub.id !== nameOrId && _sub.name !== nameOrId
          ),
        };
      }
      return publisher;
    });
  }

  removeAllSubscribers(publisherNameOrId: string): void {
    this._publishers = this._publishers?.map((publisher) => {
      if ([publisher.id, publisher.name].includes(publisherNameOrId)) {
        return {
          ...publisher,
          subscribers: [],
        };
      }
      return publisher;
    });
  }

  isExist(publisherNameOrId: string): boolean {
    const publisher = this._publishers.find((_pub) =>
      [_pub.name, _pub.id].includes(publisherNameOrId)
    );
    if (publisher) {
      return true;
    }
    return false;
  }
}

export default KeyboardEventBus;
