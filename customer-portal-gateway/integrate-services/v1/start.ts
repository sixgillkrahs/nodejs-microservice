/* eslint-disable max-len */
"use strict";
import { Service, ServiceBroker } from "moleculer";
import {
	authenticateMiddleware,
	authorizationMiddleware,
	processMappingMiddleware,
	processRequestLanguageMiddleware,
	processResponseLanguageMiddleware,
	validationParameterMiddleware,
} from "../../middlewares";
import { RestRoute } from "../../mixins/rest-route.mixin";
import { SVC_ENV } from "../../svc-env";
import { ActionGetAllArticlePaging } from "./account";

class IntegrateServiceV1 extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: SVC_ENV.get().INTEGRATE_SERVICE_V1 || "admin-portal",
			version: 1,
			settings: {},
			hooks: {
				/** Verify all expression before action call */
				before: {
					/** Check authentication, authorization on all action of V1 by defined actions need to checking */
					"*": [
						authenticateMiddleware,
						authorizationMiddleware,
						processRequestLanguageMiddleware,
						validationParameterMiddleware,
					],
				},
				/** Verify data return or something jobs after action was called */
				after: {
					/** Checking correct format response before return to gateway */
					"*": [processMappingMiddleware, processResponseLanguageMiddleware],
				},
			},
			mixins: [
				// ARTICLE
				RestRoute(
					"GET",
					"/article",
					"getAllArticlePaging",
					ActionGetAllArticlePaging
				),
			],
			meta: {
				scalable: true,
			},
			dependencies: [],
			actions: {
				heathCheck: {
					desc: "Check service status ready working",
					handler: (ctx) => "OK",
				},
			},
			methods: {},
			events: {},
			created: this.serviceCreated,
			started: this.serviceStarted,
			stopped: this.serviceStopped,
		});
	}
	private serviceCreated() {
		this.logger.info(`${SVC_ENV.get().INTEGRATE_SERVICE_V1} created.`);
	}

	private serviceStarted(): Promise<void> {
		this.logger.info(`${SVC_ENV.get().INTEGRATE_SERVICE_V1} started.`);
		return;
	}

	private serviceStopped(): Promise<void> {
		this.logger.info(`${SVC_ENV.get().INTEGRATE_SERVICE_V1} stopped.`);
		return;
	}
}

export = IntegrateServiceV1;
