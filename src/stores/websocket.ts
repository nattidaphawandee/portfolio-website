import { defineStore, type _GettersTree } from 'pinia';
import { Centrifuge, Subscription } from 'centrifuge';
import type { ServerJoinContext, ServerLeaveContext, ServerPublicationContext } from 'centrifuge';
import { useEventBus } from './eventBus';
import type { Events } from '@/types/EventBusType';
import { shallowRef } from 'vue';

const eventBus = useEventBus();

// NOTE Define the MessageData interface
interface MessageData {
  action: keyof Events;
  data: any;
}

// NOTE Define the State interface
interface State {
  centrifuge: ReturnType<typeof shallowRef<Centrifuge | null>>;
  subscription: Subscription | null;
}

type Getters = _GettersTree<State>;

// Define the Actions interface
interface Actions {
  connect(token: string, host: string): void;
  disconnect(): void;
}

// NOTE Define the store using the specified types
export const useWebsocket = defineStore<'centrifugo', State, Getters, Actions>('centrifugo', {
  state: () => ({
    centrifuge: shallowRef<Centrifuge | null>(null),
    subscription: null as Subscription | null
  }),
  getters: {},
  actions: {
    // NOTE Connect to Centrifugo server, initialize centrifuge instance, and subscribe to channel
    connect(host: string, token: string) {
      // NOTE Initialize the Centrifuge instance with the host and token
      if (!this.centrifuge) {
        this.centrifuge = new Centrifuge(host, {
          token
        });
      }

      // NOTE Client connection events
      this.centrifuge.on('connected', () => {
        console.log('Connected to Centrifugo server');
      });

      this.centrifuge.on('connecting', () => {
        console.log('connecting to Centrifugo server');
      });

      this.centrifuge.on('disconnected', (reason) => {
        console.log('Disconnected from Centrifugo server:', reason);
      });

      this.centrifuge.connect();

      // NOTE ใช้ในการ Subscribe Channel ที่เราต้องการข้อมูล
      const channel = JSON.parse(atob(token.split('.')[1])).sub;

      // NOTE Set up the subscription to the specified channel
      this.subscription = this.centrifuge.newSubscription(channel);

      this.subscription.on('join', (ctx: ServerJoinContext) => {
        console.log('User joined:', ctx.info);
      });

      this.subscription.on('leave', (ctx: ServerLeaveContext) => {
        console.log('User left:', ctx.info);
      });

      this.subscription.on('unsubscribed', () => {
        console.log('Unsubscribed from channel');
      });

      this.subscription.on('error', (err) => {
        console.error('Subscription error:', err);
      });

      // NOTE Handle events
      this.subscription.on('publication', (ctx: ServerPublicationContext) => {
        const data = ctx.data as MessageData;
        eventBus.emit(data.action, data.data);
      });

      // NOTE Subscribe to the channel
      this.subscription.subscribe();
    },

    // NOTE Disconnect from Centrifugo server and reset state
    disconnect() {
      if (this.subscription) {
        this.subscription.unsubscribe();
        this.subscription = null;
      }
      if (this.centrifuge) {
        this.centrifuge.disconnect();
        this.centrifuge = null; // NOTE Reset the centrifuge instance
      }
    }
  }
});
