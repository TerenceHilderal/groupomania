// import React from "react";

// const inputTest = () => {
// 	const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// 	const password_regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
// 	const submitHandler = e => {
// 		e.preventDefault();
// 		const email = e.target.email;
// 		const password = e.target.password;
// 		let test = {};
// 		const testField = (regex, value, fields, name, errorMessage) => {
// 			let small = fields.nextElementSibling;
// 			if (regex.test(value) && value !== "") {
// 				small.innerHTML = " valid input";
// 				small.classList.remove("text-danger");
// 				small.classList.add("text-success");
// 				test[name] = true;
// 			} else {
// 				small.innerHTML = errorMessage;
// 				small.classList.remove("text-success");
// 				small.classList.add("text-danger");
// 				test[name] = false;
// 			}
// 		};
// 		testField(
// 			password_regex,
// 			password.value,
// 			password,
// 			"password",
// 			"Passwords must be : -At least 8 characters long	- Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character => !@#$%^&*"
// 		);
// 	};
// };

// export default inputTest;
