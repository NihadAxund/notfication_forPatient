type SignalingCallback = (data: any) => void;

class SignalingService {
  private callbacks: Map<string, SignalingCallback[]> = new Map();
  private ws: WebSocket | null = null;

  constructor() {
    this.initializeWebSocket();
  }

  private initializeWebSocket() {
    // In a real application, replace with your WebSocket server URL
    this.ws = new WebSocket('wss://example.com/ws');

    this.ws.onmessage = (event) => {
      const { type, data } = JSON.parse(event.data);
      this.notify(type, data);
    };

    this.ws.onclose = () => {
      setTimeout(() => this.initializeWebSocket(), 5000);
    };
  }

  subscribe(event: string, callback: SignalingCallback) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)?.push(callback);
  }

  unsubscribe(event: string, callback: SignalingCallback) {
    const callbacks = this.callbacks.get(event) || [];
    const index = callbacks.indexOf(callback);
    if (index > -1) {
      callbacks.splice(index, 1);
    }
  }

  private notify(event: string, data: any) {
    const callbacks = this.callbacks.get(event) || [];
    callbacks.forEach(callback => callback(data));
  }

  send(event: string, data: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ event, data }));
    }
  }
}

export const signaling = new SignalingService();