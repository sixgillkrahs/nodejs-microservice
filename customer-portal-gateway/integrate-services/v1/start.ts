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
import { ActionRegister, ActionSignin } from "./auth";

class IntegrateServiceV1 extends Service {
	public constructor(public broker: ServiceBroker) {
		super(broker);
		this.parseServiceSchema({
			name: SVC_ENV.get().INTEGRATE_SERVICE_V1 || "customer-portal",
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
				// Account
				RestRoute(
					"GET",
					"/article",
					"getAllArticlePaging",
					ActionGetAllArticlePaging
				),

				// Auth
				RestRoute("POST", "/auth/signin", "signin", ActionSignin),
				RestRoute("POST", "/auth/register", "register", ActionRegister),
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
