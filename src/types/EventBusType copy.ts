import { type _GettersTree } from 'pinia';
import type { Emitter, WildcardHandler, EventHandlerMap, Handler } from 'mitt';

// NOTE : This is template of state ----------------------------
export interface State {
  eventBus: Emitter<Events>;
}

// NOTE : This is template of getters ---------------------------
export interface Getters extends _GettersTree<State> {
  all(state: State): EventHandlerMap<Events>;
}

// NOTE : This is template of methods of exporting ---------------
export interface Actions {
  // Specific event handlers
  on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  off<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void;
  emit<Key extends keyof Events>(type: Key, event: Events[Key]): void;

  // Wildcard event handlers
  onWildcard(handler: WildcardHandler<Events>): void;
  offWildcard(handler: WildcardHandler<Events>): void;
  emitNoPayload<Key extends keyof Events>(type: Key): void;
  clearAllEvents(): void;
}

//  NOTE Type of module ---------------------------------------------

export type Events = {
  'widget:update': string;
  'widget:search': string;
  'user:create': string;
  'user:update': string;
  logout: string;
  'widget:filter': string;
  // 'widget:LineChart': string;
  // 'widget:List': string;
  'widget:ListFilterBtn': boolean;
  'widget:clickSearchBtn': any;
  'widget:inputFromSearch': string;
  'widget:searchClearHistory': any;
};
