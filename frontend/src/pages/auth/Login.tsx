import * as React from "react";
import {
    useActiveAuthProvider,
} from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useAutocomplete, Edit } from "@refinedev/mui";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import MuiLink from "@mui/material/Link";
import Autocomplete from "@mui/material/Autocomplete";

import {
    BaseRecord,
    HttpError,
    useTranslate,
    useRouterContext,
    useRouterType,
    useLink,
    useRegister,
} from "@refinedev/core";

import { CSSProperties } from "react";
import { ICompany } from "../../interfaces";

const layoutStyles: CSSProperties = {};

const titleStyles: CSSProperties = {
    textAlign: "center",
    fontSize: "24px",
    marginBottom: "24px",
    overflowWrap: "break-word",
    hyphens: "manual",
    textOverflow: "unset",
    whiteSpace: "pre-wrap",
};

interface RegisterFormTypes {
    email: string;
    name: string;
    company: ICompany;
    password: string;
}

export const RegisterPage: React.FC = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<BaseRecord, HttpError, RegisterFormTypes>({});
    const t = useTranslate();
    const { autocompleteProps } = useAutocomplete<ICompany>({
        resource: "companies",
    });
    const authProvider = useActiveAuthProvider();
    const { mutate: registerMutate, isLoading } =
        useRegister<RegisterFormTypes>();
    const translate = useTranslate();
    const routerType = useRouterType();
    const Link = useLink();
    const { Link: LegacyLink } = useRouterContext();

    const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

    const Content = (
        <Card>
            <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
                <Typography
                    component="h1"
                    variant="h5"
                    align="center"
                    style={titleStyles}
                    color="primary"
                    fontWeight={700}
                >
                    {translate(
                        "pages.register.title",
                        "Sign up for your account",
                    )}
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit((data) => {
                        console.log(data)
                        return registerMutate(data);
                    })}
                >

                    <Controller
                        control={control}
                        name="company"
                        rules={{
                            required: t(
                                "errors.required.field",
                                { field: "Company" },
                            ),
                        }}
                        // eslint-disable-next-line
                        defaultValue={null as any}
                        render={({ field }) => (
                            <Autocomplete
                                sx={{ marginBottom: "10px" }}
                                disablePortal
                                {...autocompleteProps}
                                {...field}
                                onChange={(_, value) => {
                                    field.onChange(value);
                                }}
                                getOptionLabel={(item) => {
                                    return item.name
                                        ? item.name
                                        : autocompleteProps?.options?.find(
                                            (p) =>
                                                p.id.toString() ===
                                                item.toString(),
                                        )?.name ?? "";
                                }}
                                isOptionEqualToValue={(
                                    option,
                                    value,
                                ) =>
                                    value === undefined ||
                                    option?.id?.toString() ===
                                    (
                                        value?.id ?? value
                                    )?.toString()
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Company"
                                        variant="outlined"
                                        error={
                                            !!errors.company
                                                ?.message
                                        }
                                        required
                                    />
                                )}
                            />
                        )}
                    />

                    <TextField
                        {...register("email", {
                            required: true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: translate(
                                    "pages.register.errors.validEmail",
                                    "Invalid email address",
                                ),
                            },
                        })}
                        id="email"
                        margin="normal"
                        fullWidth
                        label={translate("pages.register.email", "Email")}
                        error={!!errors.email}
                        helperText={
                            errors["email"] ? errors["email"].message : ""
                        }
                        name="email"
                        autoComplete="email"
                    />
                    <TextField
                        {...register("name", {
                            required: true,
                        })}
                        id="name"
                        margin="normal"
                        fullWidth
                        label={translate("pages.register.name", "Name")}
                        error={!!errors.name}
                        helperText={
                            errors["name"] ? errors["name"].message : ""
                        }
                        name="name"
                        autoComplete="name"
                    />
                    <TextField
                        {...register("password", {
                            required: true,
                        })}
                        id="password"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={translate(
                            "pages.register.fields.password",
                            "Password",
                        )}
                        helperText={
                            errors["password"]
                                ? errors["password"].message
                                : ""
                        }
                        error={!!errors.password}
                        type="password"
                        placeholder="●●●●●●●●"
                        autoComplete="current-password"
                        sx={{
                            mb: 0,
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            mt: "24px",
                        }}
                    >
                        {translate("pages.register.signup", "Sign up")}
                    </Button>
                </Box>
                <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    sx={{
                        mt: "24px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        component="span"
                        fontSize="12px"
                    >
                        {translate(
                            "pages.login.buttons.haveAccount",
                            "Have an account?",
                        )}
                    </Typography>
                    <MuiLink
                        ml="4px"
                        variant="body2"
                        color="primary"
                        component={ActiveLink}
                        underline="none"
                        to="/login"
                        fontSize="12px"
                        fontWeight="bold"
                    >
                        {translate("pages.login.signin", "Sign in")}
                    </MuiLink>
                </Box>
            </CardContent>
        </Card>
    );

    return (
        <Box component="div" style={layoutStyles}>
            <Container
                component="main"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100dvh",
                    padding: "16px",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <Box
                    sx={{
                        width: "100%",
                        maxWidth: "400px",
                        display: "flex",
                        flexDirection: "column",
                        paddingTop: 0,
                    }}
                >
                    <>
                        {Content}
                    </>
                </Box>
            </Container>
        </Box>
    );
}