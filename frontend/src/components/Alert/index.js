import React from "react";

const Alert = success => {
	return (
		<>
			{success ? (
				<div className="alert alert-success alert-dismissible">
					<a
						href="none"
						className="close"
						data-dismiss="alert"
						aria-label="close"
					>
						&times;
					</a>
					<strong>Success!</strong>
				</div>
			) : (
				<div className="alert alert-danger alert-dismissible">
					<a
						href="none"
						className="close"
						data-dismiss="alert"
						aria-label="close"
					>
						&times;
					</a>
					<strong>Something gone wrong</strong>
				</div>
			)}
		</>
	);
};
export default Alert;
