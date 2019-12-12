export const PreSubmit = (info, type) => {
    const { username, email, password } = info;

    if (type === "signup") {
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
    }
};

export const Register = async (info) => {
    const options = {
        method: 'POST',
        body: JSON.stringify(info),
        headers: { "Content-Type": "application/json" }
    };
    const res = await fetch('/api/auth/register', options);
    const json = await res.json();

    switch (json.statusCode) {
        case 403:
            return { error: true, message: "Username has already been taken!" };
        case 200:
            return { success: true, message: "Profile has been created!" };
        default:
            return { error: true, message: "Something went wrong :(" };
    }
};
