import React from "react";

const Alert = success => {
	return (
		<>
			{success ? (
				<div class="alert alert-success alert-dismissible">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">
						&times;
					</a>
					<strong>Success!</strong>
				</div>
			) : (
				<div class="alert alert-danger alert-dismissible">
					<a href="#" class="close" data-dismiss="alert" aria-label="close">
						&times;
					</a>
					<strong>Something gone wrong</strong>
				</div>
			)}
		</>
	);
};
export default Alert;
