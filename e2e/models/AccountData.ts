export class AccountData {
    username: string;
    password: string;
    email: string;
    registerPassword: string;
    rememberMe: boolean;

    constructor (username: string,
        password: string,
        email: string,
        registerPassword: string,
        rememberMe: boolean) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.registerPassword = registerPassword;
        this.rememberMe = rememberMe;
    }
}