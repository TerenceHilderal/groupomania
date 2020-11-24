import React from "react";

const Alert = ({ status, text }) => {
	return (
		<>
			{status === "success" && text ? (
				<div className="alert alert-success" role="alert">
					{text}
				</div>
			) : (
				<div className="alert alert-danger" role="alert">
					{text}
				</div>
			)}
		</>
	);
};
export default Alert;
