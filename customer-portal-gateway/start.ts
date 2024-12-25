/* eslint-disable @typescript-eslint/member-ordering */
import compression from "compression";
import history from "connect-history-api-fallback";
import { INTERNAL_CODES } from "goopay-library/defined/state-code";
import { IncomingMessage, ServerResponse } from "http";
import { Context, Errors, Service, ServiceBroker } from "moleculer";
import ApiGateway from "moleculer-web";
import { redis } from "./caching";
import { RoutingInterceptor } from "./interceptors/";
import { SocketProcess, socketEventHandle } from "./socket-io";
import { SVC_ENV } from "./svc-env";
import BusinessRequestLogic from "./logics/business-request.logic";

const ServiceName = "admin-portal-gateway";
const ServicePort = 8700;

class GoopayPortalGateway extends Service {
	private readonly interceptorRoute: RoutingInterceptor;
	private readonly socketProcess: SocketProcess;
	private businessRequestLogic: BusinessRequestLogic;

	public constructor(broker: ServiceBroker) {
		super(broker);
		this.loadEnvAndInitService();
		this.interceptorRoute = new RoutingInterceptor(broker);
		this.socketProcess = new SocketProcess(broker.logger, this);
		this.parseServiceSchema({
			name: ServiceName,
			mixins: [ApiGateway],
			settings: {
				port: SVC_ENV.get().PORT || ServicePort,
				cors: {
					origin: [
						"http://localhost:*",
						"http://127.0.0.1:*",
						SVC_ENV.get().ORIGIN,
					],
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
							res: ServerResponse
						) {
							this.interceptorRoute.onBeforeCallBase(ctx, route, req, res);
						},
						onAfterCall(
							ctx: Context,
							route: object,
							req: IncomingMessage,
							res: ServerResponse,
							data: object
						) {
							return this.interceptorRoute.onAfterCallBase(
								ctx,
								route,
								req,
								res,
								data
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
					{
						path: SVC_ENV.get().PATH_PORTAL,
						use: [
							compression(),
							history(),
							ApiGateway.serveStatic(
								`${SVC_ENV.get().WEB_PORTAL_PUBLIC_DIR}`,
								{}
							),
						],
						mappingPolicy: "all",
					},
					{
						path: "/",
						use: [
							compression(),
							history(),
							ApiGateway.serveStatic(
								`${SVC_ENV.get().WEB_PORTAL_PUBLIC_DIR}`,
								{}
							),
						],
						mappingPolicy: "restrict",
						logging: true,
					},
					{
						path: "/api/v1/download",
						whitelist: [],
						use: [],
						mergeParams: false,
						authentication: true,
						authorization: false,
						autoAliases: true,
						aliases: {
							"GET /monthlyReconcileReport"(req, res) {
								this.merchantReconcileReportLogic.exportReport(req, res);
							},
							"GET /exportNapasReconcile"(req, res) {
								this.napasReconcileReportLogic.exportReport(req, res);
							},
							"GET /templateBusiness"(req, res) {
								this.businessRequestLogic.downloadTemplate(req, res);
							},
						},
						mappingPolicy: "restrict",
						logging: true,
						onBeforeCall(ctx, route, req, res) {
							ctx.meta.headers = req.headers;
							this.interceptorRoute.onBeforeCallBase(ctx, route, req, res);
						},
						onAfterCall(ctx, route, req, res, data) {
							return this.interceptorRoute.onAfterCallBase(
								ctx,
								route,
								req,
								res,
								data
							);
						},
						onError(req, res, err) {
							return this.interceptorRoute.onErrorBase(req, res, err);
						},
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
						})
					);
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
			actions: {
				heathCheck: {
					desc: "Check service status ready working",
					handler: (ctx) => "OK",
				},
			},
			created: this.serviceCreated,
			started: this.serviceStarted,
			stopped: this.serviceStopped,
		});
	}
	private serviceCreated() {
		this.logger.info(`${SVC_ENV.get().SERVICE_NAME} created.`);
	}

	private serviceStarted(): Promise<void> {
		this.logger.info(`${SVC_ENV.get().SERVICE_NAME} started.`);
		return;
	}

	private serviceStopped(): Promise<void> {
		this.logger.info(`${SVC_ENV.get().SERVICE_NAME} stopped.`);
		return;
	}

	private initService(): void {
		/** Start socket io and processing events from client */
		this.socketProcess.startSocket();
		this.socketProcess.processSocket(socketEventHandle);
		this.businessRequestLogic = new BusinessRequestLogic({
			logger: this.logger,
			broker: this.broker,
		});
		/** End socket io */
	}

	private async loadEnvAndInitService(): Promise<void> {
		SVC_ENV.setEnvironmentsFromEnv(this.broker, ServiceName);

		await redis.connect();
		this.initService();
	}
}

export = GoopayPortalGateway;
