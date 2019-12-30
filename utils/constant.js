let constants = {
	limit: 10,
	rate: 0,
	httpStatusCode: {
		success: 200,
		unauthorised: 401,
        forbidden: 403,
        notfound: 404,
		badRequest: 400
	},
	responseCodes: {
		successfulOperation: 200,
		noContent: 204,
		failedOperation: 500,
		unauthorizedAccess: 401,
		revalidation: 400,
		alreadyExist: 409
	},
	messageKeys: {
		en: {
			msg_success: 'Successful Operation',
			msg_failed: 'Something went wrong',
			msg_service_success: 'Service Book Successfully Operation',
			msg_data_not_found: "Data not Found",
			msg_service_provider_unavailable :" Service provider is unavailble between : "
		},
	}	

};

module.exports = constants;