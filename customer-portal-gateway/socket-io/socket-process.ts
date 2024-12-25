import { LoggerInstance, Service } from "moleculer";
import { RedisClient } from "redis";
import { Server, Socket } from "socket.io";
import { Room } from "socket.io-adapter";
import { createAdapter } from "socket.io-redis";
import { redis } from "../caching";
import { ROOM } from "../defined/app-setting";
import { SVC_ENV } from "../svc-env";


class SocketProcess {
	public readonly service: Service;
	public readonly logger: LoggerInstance;
	public room: Room = ROOM.CLIENT_CONNECTING;
	public socketIO: Server;
	public constructor(logger: LoggerInstance, molService: Service) {
		this.logger = logger;
		this.service = molService;
	}

	/** INIT SOCKET SERVER AND START */
	public startSocket(): Server {
		try {
			const pubClient = new RedisClient(
				{
					host: SVC_ENV.get().ADAPTER_SOCKET_REDIS_HOST,
					port: parseInt(SVC_ENV.get().ADAPTER_SOCKET_REDIS_PORT, 10),
					password: SVC_ENV.get().ADAPTER_SOCKET_REDIS_AUTH_PASS
				});
			const subClient = pubClient.duplicate();
			const socketServer = new Server(this.service.server, {path: "/io", cors: {
					origin: "*",
					methods: "*"
			}});
			socketServer.adapter(createAdapter({ pubClient, subClient }));
			this.socketIO = socketServer;
			return socketServer;
		} catch (e) {
			this.logger.error(e);
			throw e;
		}
	}

	/** PROCESSING ALL EVENTS FOR SOCKET CONNECTIONS */
	public processSocket(eventHandle: Function) {
		try {
			const sef = this;
			this.socketIO.on("connect", (socket: Socket) => {
				this.joinRoom(socket, this.room);
				/** Handle event */
				eventHandle(socket, sef.service);
				/** End handle event */
				socket.on("disconnect", () => {
					this.leaveRoom(socket, this.room);
				});
				socket.on("error", err => {
					this.leaveRoom(socket, this.room);
					this.logger.error(err);
				});
			});
		} catch (e) {
			this.logger.error(e);
		}
	}

	/** MANAGEMENT ROOMS FOR SOCKET CONNECTION: JOIN ROOM, LEAVE ROOM */
	public joinRoom(socket: Socket, roomCode: string): void {
		console.log(socket.id + " join room");
		socket.join(roomCode);
	}

	public leaveRoom(socket: Socket, roomCode: string): void {
		console.log(socket.id + " leave room");
		socket.leave(roomCode);
		redis
			.sRem(ROOM.CLIENT_CONNECTING, {sid: socket.id, email: socket.handshake.auth.email, room: this.room})
			.catch(err => this.logger.error(err));
		redis
			.del(socket.handshake.auth.email)
			.catch(err => this.logger.error(err));
	}
}

export = SocketProcess;
