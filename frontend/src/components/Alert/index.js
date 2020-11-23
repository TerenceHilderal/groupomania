import React from "react";

const Alert = ({ status, text, error }) => {
	return (
		<>
			{!status ? (
				<div className="alert alert-success alert-dismissible">
					<a
						href="none"
						className="close"
						data-dismiss="alert"
						aria-label="close"
					>
						&times;
					</a>
					<strong>{text}</strong>
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
					<strong>{error}</strong>
				</div>
			)}
		</>
	);
};
export default Alert;
