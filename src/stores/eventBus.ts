import { defineStore } from 'pinia';
import mitt from 'mitt';
import type { WildcardHandler, EventHandlerMap, Handler } from 'mitt';
import type { Events, State, Getters, Actions } from '@/types/EventBusType';

export const useEventBus = defineStore<'eventBus', State, Getters, Actions>({
  id: 'eventBus',
  state: () => ({
    eventBus: mitt<Events>()
  }),
  getters: {
    // Getter to access all event handlers
    all: (state): EventHandlerMap<Events> => state.eventBus.all
  },
  actions: {
    /**
     * Registers a handler for a specific event type.
     * @param type - The event type to listen for.
     * @param handler - The handler function to invoke when the event is emitted.
     */
    on<Key extends keyof Events>(type: Key, handler: Handler<Events[Key]>): void {
      this.eventBus.on(type, handler); // Correct reference to the state
    },

    /**
     * Registers a wildcard handler that listens to all events.
     * @param handler - The handler function to invoke for any event.
     */
    onWildcard(handler: WildcardHandler<Events>): void {
      this.eventBus.on('*', handler);
    },

    /**
     * Removes a handler for a specific event type.
     * @param type - The event type to stop listening for.
     * @param handler - (Optional) The specific handler to remove. If omitted, no action is taken.
     */
    off<Key extends keyof Events>(type: Key, handler?: Handler<Events[Key]>): void {
      if (handler) {
        this.eventBus.off(type, handler);
      } else {
        // mitt does not support removing all handlers for a specific type directly.
        // If needed, consider implementing a mechanism to track and remove all handlers.
        console.warn(`Handler for event type "${type}" not provided. No action taken.`);
      }
    },

    /**
     * Removes a wildcard handler.
     * @param handler - The wildcard handler to remove.
     */
    offWildcard(handler: WildcardHandler<Events>): void {
      this.eventBus.off('*', handler);
    },

    /**
     * Emits an event with an optional payload.
     * @param type - The event type to emit.
     * @param event - (Optional) The payload associated with the event.
     */
    emit<Key extends keyof Events>(type: Key, event?: Events[Key]): void {
      if (event !== undefined) {
        this.eventBus.emit(type, event);
      } else {
        this.emitNoPayload(type);
      }
    },

    /**
     * Emits an event without a payload. This should only be used for events that do not require a payload.
     * @param type - The event type to emit.
     */
    emitNoPayload<Key extends keyof Events>(type: Key): void {
      // Ensure that the event type can be emitted without a payload
      // Based on your Events type, adjust accordingly
      this.eventBus.emit(type as any);
    },

    clearAllEvents(): void {
      this.eventBus.all.clear();
    }
  }
});
