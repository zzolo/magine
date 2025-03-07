/**
 * Websocket server to communicate the game queue (state and input requests) to clients.
 */
import { createServer, Server } from 'node:http';
import debugGenerator from 'debug';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { loadEnvironment } from './utilities/environment';
import type { GameQueueStateChange, GameQueueInputRequest, GameQueueInputResponse } from './types';

// Setup
loadEnvironment();
const debug = debugGenerator('magine:game-relay');

// Socket.IO-based game relay service
export class GameRelay {
  private socketServer: SocketIOServer;
  private httpServer: Server;
  private pendingRequests: Map<string, (response: GameQueueInputResponse) => void>;

  constructor(port: number = parseInt(process.env.MAGINE_RELAY_PORT)) {
    this.httpServer = createServer();
    this.socketServer = new SocketIOServer(this.httpServer, {
      // TODO: Restrict to specific origins?
      cors: { origin: '*' }
    });

    this.pendingRequests = new Map();

    this.socketServer.on('connection', (socket: Socket) => {
      debug(`Client connected: ${socket.id}`);

      socket.on('input-response', (response: GameQueueInputResponse) => {
        this.handleInputResponse(response);
      });

      socket.on('disconnect', () => {
        debug(`Client disconnected: ${socket.id}`);
      });
    });

    this.httpServer.listen(port, () => {
      debug(`Socket.IO server running on http://localhost:${port}`);
    });
  }
  // Send a game state update to all connected clients
  sendState(state: GameQueueStateChange): void {
    debug('Sending state update to clients', state);
    this.socketServer.emit('state-update', state);
  }

  // Request input from the client and wait for a response
  requestInput(request: GameQueueInputRequest): Promise<GameQueueInputResponse> {
    return new Promise((resolve) => {
      this.pendingRequests.set(request.requestId, resolve);
      this.socketServer.emit('input-request', request);
    });
  }

  // Handle an input response from a client
  private handleInputResponse(response: GameQueueInputResponse): void {
    const resolver = this.pendingRequests.get(response.requestId);

    if (resolver) {
      this.pendingRequests.delete(response.requestId);
      resolver(response);
    }
  }
}
