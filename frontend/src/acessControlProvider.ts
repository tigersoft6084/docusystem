import { AccessControlProvider } from "@refinedev/core";
import { TOKEN_KEY } from "./authProvider";

export const accessControlProvider: AccessControlProvider = {
    can: async ({ resource, action, params }) => {
        const token = localStorage.getItem(TOKEN_KEY);
        if (!token) {
            return {
                can: false,
                reason: 'Unauthenticated'
            }
        }
        const { user } = JSON.parse(token);

        if (user.role === "admin") {
            return { can: true };
        }
        if (user.role === "user") {
            if (resource === "documents" || resource === "box-files") 
                return { can: true };
        }
        return {
            can: false,
            reason: "Unauthorized",
        };
    },
};