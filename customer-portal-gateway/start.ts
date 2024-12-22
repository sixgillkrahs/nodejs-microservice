import { SVC_ENV } from "./svc-env";
import ApiGateway from "moleculer-web";
import compression from "compression";
import history from "connect-history-api-fallback";
import { INTERNAL_CODES } from "goopay-library/defined/state-code";
import { IncomingMessage, ServerResponse } from "http";
import { Context, Errors, Service, ServiceBroker } from "moleculer";
import { redis } from "./caching";
import { RoutingInterceptor } from "./interceptors/";

const ServiceName = "customer-portal-gateway";
const ServicePort = 8000;

class CustomerPortalGateway extends Service {
	private readonly interceptorRoute: RoutingInterceptor;
	public constructor(broker: ServiceBroker) {
		super(broker);
		this.broker = broker;
		this.loadEnvAndInitService();
		this.interceptorRoute = new RoutingInterceptor(broker);
		this.parseServiceSchema({
			name: ServiceName,
			mixins: [ApiGateway],
			settings: {
				port: SVC_ENV.get().PORT || ServicePort,
				cors: {
					origin: ["http://localhost:*", "http://127.0.0.1:*"],
					methods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
					allowedHeaders: "*",
					exposedHeaders: [],
					credentials: false,
					maxAge: 3600,
				},
				routes: [
					{
						path: "/health",
						aliases: {
							"GET /"(req, res) {
								res.end("I'm fine ty");
							},
						},
					},
					{
						path: "/api",
						whitelist: ["v1.admin-portal.*"],
						use: [],
						mergeParams: true,
						authentication: false,
						authorization: true,
						autoAliases: true,
						aliases: {},
						onBeforeCall(
							ctx: Context<any, { userAgent: string }>,
							route: object,
							req: IncomingMessage,
							res: ServerResponse,
						) {
							this.interceptorRoute.onBeforeCallBase(ctx, route, req, res);
						},
						onAfterCall(
							ctx: Context,
							route: object,
							req: IncomingMessage,
							res: ServerResponse,
							data: object,
						) {
							return this.interceptorRoute.onAfterCallBase(
								ctx,
								route,
								req,
								res,
								data,
							);
						},
						onError(req: IncomingMessage, res: ServerResponse, err) {
							return this.interceptorRoute.onErrorBase(req, res, err);
						},
						callingOptions: {},
						bodyParsers: {
							json: {
								strict: false,
								limit: "1MB",
							},
							urlencoded: {
								extended: true,
								limit: "1MB",
							},
						},
						mappingPolicy: "all",
						logging: true,
					},
				],
				use: [],
				/** Handle Global Error */
				onError(req, res, err) {
					this.logger.error(err);
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					res.statusCode = 501;
					res.end(
						JSON.stringify({
							code: 9999,
							message: "Global error, Please contact support team",
						}),
					);
				},
			},
			actions: {
				heathCheck: {
					desc: "Check service status ready working",
					handler: (ctx) => "OK",
				},
			},
			methods: {
				async authenticate(ctx, route, req, res) {
					const action = `${SVC_ENV.get().AUTH_SERVICE}.authenticate`;
					const resp = await ctx.call(action, req.headers);
					const { code, data, message } = resp;
					if (code !== INTERNAL_CODES.SUCCESS.CODE) {
						throw new Errors.MoleculerError("ERR_AUTH", 401, "ERR_AUTH");
					}
					ctx.meta.user = data;
					return Promise.resolve(data);
				},
			},
			created: this.serviceCreated,
			started: this.serviceStarted,
			stopped: this.serviceStopped,
		});
	}

	private serviceCreated() {
		this.logger.info(`${ServiceName} created.`);
	}

	private serviceStarted(): void {
		/** Init Dependencies For This Service */
		this.logger.info(`${ServiceName} started.`);
	}

	private serviceStopped(): void {
		this.logger.info(`${ServiceName} stopped.`);
	}

	private initService(): void {}

	private async loadEnvAndInitService(): Promise<void> {
		SVC_ENV.setEnvironmentsFromEnv(this.broker, ServiceName);
		await redis.connect();
		this.initService();
	}
}

export = CustomerPortalGateway;
