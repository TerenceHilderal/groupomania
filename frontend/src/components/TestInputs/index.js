import React from "react";

export const inputTest = (e, username_regex, email_regex, password_regex) => {
	const email = e.target.email;
	const password = e.target.password;
	const role = e.target.role;
	const username = e.target.username;
	let test = {};
	const testField = (regex, value, fields, name, errorMessage) => {
		let small = fields.nextElementSibling;
		if (regex.test(value) && value !== "") {
			small.innerHTML = " valid input";
			small.classList.remove("text-danger");
			small.classList.add("text-success");
			test[name] = true;
		} else {
			small.innerHTML = errorMessage;
			small.classList.remove("text-success");
			small.classList.add("text-danger");
			test[name] = false;
		}
	};
	// testField(
	// 	username_regex,
	// 	role.value,
	// 	role,
	// 	"role",
	// 	"This field must contain only ASCII letters and digits, with hyphens, underscores and spaces as internal separators"
	// );
	testField(
		username_regex,
		username.value,
		username,
		"username",
		"This field must contain only ASCII letters and digits, with hyphens, underscores and spaces as internal separators"
	);
	testField(email_regex, email.value, email, "email", "wrong email format");
	testField(
		password_regex,
		password.value,
		password,
		"password",
		"Passwords must be : -At least 8 characters long	- Include at least 1 lowercase letter - 1 capital letter - 1 number - 1 special character => !@#$%^&*"
	);
};

export default inputTest;
