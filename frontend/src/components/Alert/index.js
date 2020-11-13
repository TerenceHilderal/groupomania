import React from "react";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);
// MySwal.fire("Good job!", "You clicked the button!", "success");

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
