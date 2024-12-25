"use strict";
import os from "os";
import { BrokerOptions, Errors, MetricRegistry } from "moleculer";

const brokerConfig: BrokerOptions = {
	namespace: process.env.NAMESPACE || "GOOPAY-CORE",
	nodeID: `${process.env.SERVICE_NAME}-${(process.env.NODEID ? process.env.NODEID : "") + os.hostname().toLowerCase()}`,
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
				autoPadding: true
			}
		}
	],
	logLevel: "info",
	transporter: process.env.NATS, // "NATS"
	cacher: null,
	serializer: "JSON",
	requestTimeout: 0,
	retryPolicy: {
		enabled: false,
		retries: 5,
		delay: 100,
		maxDelay: 1000,
		factor: 2,
		check: (err: Errors.MoleculerError) => err && !!err.retryable
	},
	maxCallLevel: 100,
	heartbeatInterval: 10,
	heartbeatTimeout: 30,
	contextParamsCloning: false,
	tracking: {
		enabled: false,
		shutdownTimeout: 5000
	},
	disableBalancer: false,
	registry: {
		strategy: "RoundRobin",
		preferLocal: false
	},
	circuitBreaker: {
		enabled: false,
		threshold: 0.5,
		minRequestCount: 20,
		windowTime: 60,
		halfOpenTime: 10 * 1000,
		check: (err: Errors.MoleculerError) => err && err.code >= 500
	},
	bulkhead: {
		enabled: false,
		concurrency: 10000,
		maxQueueSize: 10000
	},
	validator: true,
	errorHandler: null,
	metrics: {
		enabled: false,
		reporter: {
			type: "Prometheus",
			options: {
				port: process.env.METRICS_PORT,
				path: "/metrics",
				defaultLabels: (registry: MetricRegistry) => ({
					namespace: registry.broker.namespace,
					nodeID: registry.broker.nodeID
				})
			}
		}
	},
	tracing: {
		enabled: false,
		exporter: {
			type: "Jaeger",
			options: {
				endpoint: null,
				host: process.env.TRACING_HOST,
				port: process.env.TRACING_PORT,
				sampler: {
					type: "Const",
					options: {}
				},
				tracerOptions: {},
				defaultTags: null
			}
		}
	},
	middlewares: []
};

export = brokerConfig;
