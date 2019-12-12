export const PreSubmit = (info, type) => {
    const { username, email, password } = info;

    switch (true) {
        case username.length < 1:
            return { warning: true, message: "Username must have more than one character" };
        case username.length > 20:
            return { warning: true, message: "Username cannot contain more than 20 characters" };
        case password.length < 6:
            return { warning: true, message: "Password must contain a minimum of 6 characters" };
        case password.length > 30:
            return { warning: true, message: "Password cannot contain more than 30 characters" };
        default:
            return { warning: false };
    }
};

export const fetchAuth = async (info, param) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: { "Content-Type": "application/json" }
    };
    const res = await fetch(`/api/auth/${param}`, options);
    const json = await res.json();

    switch (json.statusCode) {
        case 404:
            return { error: true, message: "Username doesn't exist!" };
        case 403:
            return { error: true, message: "Username has already been taken!" };
        case 401:
            return { error: true, message: "Incorrect password!" };
        case 201:
            return { success: true, message: "Profile has been created!" };
        case 200:
            return { success: true, message: "Successful login!" };
        default:
            return { error: true, message: "Something went wrong :(" };
    }
};

export const InitInfo = {
    username: "",
    email: "",
    password: ""
};
export const InitNotify = {
    error: false,
    success: false,
    warning: false,
    message: ""
};
