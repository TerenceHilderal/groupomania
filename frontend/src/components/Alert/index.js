import React, { useState } from "react";

const Alert = success => {
	return (
		<>
			{success ? (
				<div class="alert alert-success " role="alert" data-dismiss="alert">
					Successfully done!
				</div>
			) : (
				<div class="alert alert-danger" role="alert">
					Something gone wrong!
				</div>
			)}
		</>
	);
};
export default Alert;
