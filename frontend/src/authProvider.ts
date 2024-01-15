import { AuthBindings, HttpError } from "@refinedev/core";
import axios from "axios";
export const TOKEN_KEY = "auth";
export const SERVER_URL = import.meta.env.VITE_API_URL;
export const authProvider: AuthBindings = {
    login: async ({ email, password }) => {
        try {
            const response = await axios.post(SERVER_URL + "/auth/login", {
                email,
                password
            })
            if (response.data.tokens) {
                console.log(response.data.tokens);
                localStorage.setItem(TOKEN_KEY, JSON.stringify(response.data));
                return {
                    success: true,
                    redirectTo: "/documents",
                };
            }
        }
        catch (error) {
            return {
                success: false,
                error: {
                    message: "Login failed",
                    name: error.response?.data?.message
                }
            }
        }

        return {
            success: false,
            error: {
                message: "Login failed",
                name: "Incorrect email or password"
            }
        }
    },
    register: async ({ email, password, name, company }) => {
        try {
            await axios.post(SERVER_URL + "/auth/register", {
                email,
                name,
                company: company.id,
                password
            })

            await authProvider.login({ email, password });
            return {
                success: true,
                redirectTo: "/documents",
            };
        } catch (error) {
            return {
                success: false,
                error: {
                    message: "Register failed",
                    name: "Invalid email or password",
                },
            };
        }
    },
    updatePassword: async () => {
        return {
            success: true,
        };
    },
    forgotPassword: async () => {
        return {
            success: true,
        };
    },
    logout: async () => {
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
            redirectTo: "/login",
        };
    },
    onError: async (error) => {
        console.error(error);
        return { error };
    },
    check: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) {
            return {
                authenticated: true,
            };
        }

        return {
            authenticated: false,
            error: {
                message: "Check failed",
                name: "Token not found",
            },
            logout: true,
            redirectTo: "/login",
        };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return null;
        }
        const auth = JSON.parse(token);
        const user = auth.user;
        return user;
        // return {
        //     id: 1,
        //     name: "James Sullivan",
        //     avatar: "https://i.pravatar.cc/150",
        // };
    },
};
