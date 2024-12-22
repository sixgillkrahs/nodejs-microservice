import os from "os";
import { BrokerOptions, Errors, MetricRegistry } from "moleculer";

const brokerConfig: BrokerOptions = {
	namespace: "default",
	nodeID: os.hostname(),
	metadata: {},
	logger: [
		{
			type: "Console",
			options: {
				level: "info",
				colors: true,
				moduleColors: true,
				formatter: "full",
				objectPrinter: null,
				autoPadding: true,
			},
		},
	],
	logLevel: "info",
	transporter: process.env.NATS,
	cacher: "redis",
	serializer: "JSON",
	requestTimeout: 10 * 60 * 60 * 1000,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err: Errors.MoleculerError | Error) =>
			err instanceof Errors.MoleculerError && !!err.retryable,
	},
	maxCallLevel: 100,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	contextParamsCloning: false,
	tracking: {
		enabled: false,
		shutdownTimeout: 5000,
	},
	disableBalancer: false,
	registry: {
		strategy: "RoundRobin",
		preferLocal: true,
	},
	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: (err: Errors.MoleculerError | Error) =>
			err instanceof Errors.MoleculerError && err.code >= 500,
	},
	bulkhead: {
		enabled: false,
		concurrency: 10,
		maxQueueSize: 100,
	},
	validator: true,
	errorHandler: undefined,
	metrics: {
		enabled: false,
		reporter: {
			type: "Prometheus",
			options: {
				port: process.env.METRICS_PORT,
				path: "/metrics",
				defaultLabels: (registry: MetricRegistry) => ({
					namespace: registry.broker.namespace,
					nodeID: registry.broker.nodeID,
				}),
			},
		},
	},
	tracing: {
		enabled: false,
		exporter: {
			type: "Jaeger",
			options: {
				endpoint: null,
				host: "127.0.0.1",
				port: 6832,
				sampler: {
					type: "Const",
					options: {},
				},
				tracerOptions: {},
				defaultTags: null,
			},
		},
	},
	middlewares: [],
};

export = brokerConfig;
