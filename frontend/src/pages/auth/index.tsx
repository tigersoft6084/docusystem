import * as React from "react";
import { AuthPage as MUIAuthPage, AuthProps } from "@refinedev/mui";
import { Link } from "react-router-dom";
export * from "./register";

const renderAuthContent = (content: React.ReactNode) => {
    return (
        <div
            style={{
                margin: "auto",
            }}
        >
            {content}
        </div>
    );
};

export const AuthPage: React.FC<AuthProps> = ({ type, formProps }) => {
    return (
        <MUIAuthPage
            type={type}
            renderContent={renderAuthContent}
            formProps={formProps}
        />
    );
};
