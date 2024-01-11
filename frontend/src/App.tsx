import { Authenticated, Refine } from "@refinedev/core";
import { KBarProvider } from "@refinedev/kbar";
import {
    ErrorComponent,
    notificationProvider,
    ThemedLayoutV2,
    RefineSnackbarProvider,
} from "@refinedev/mui";
import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
// import dataProvider from "@refinedev/simple-rest";
import { dataProvider } from "./rest-data-provider";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import ComputerIcon from "@mui/icons-material/Computer";
import PeopleOutlineOutlined from "@mui/icons-material/PeopleOutlineOutlined";

import { authProvider, TOKEN_KEY, API_URL, SERVER_URL } from "./authProvider";
import { UserList } from "./pages/users";
import { DocumentList } from "./pages/documents";
import { CompanyList } from "./pages/companies";
import { BoxFileList } from "./pages/box-files";
import { ColorModeContextProvider } from "./contexts";
import { Header, Title } from "./components";
import { AuthPage, RegisterPage } from "./pages/auth";
import { accessControlProvider } from "./acessControlProvider";

const App: React.FC = () => {
    // This hook is used to automatically login the user.
    // We use this hook to skip the login page and demonstrate the application more quickly.
    // const { loading } = useAutoLoginForDemo();
    const { t, i18n } = useTranslation();
    const i18nProvider = {
        translate: (key: string, params: object) => t(key, params),
        changeLocale: (lang: string) => i18n.changeLanguage(lang),
        getLocale: () => i18n.language,
    };

    // if (loading) {
    //     return null;
    // }

    return (
        <BrowserRouter>
            <KBarProvider>
                <ColorModeContextProvider>
                    <CssBaseline />
                    <GlobalStyles
                        styles={{ html: { WebkitFontSmoothing: "auto" } }}
                    />
                    <RefineSnackbarProvider>
                        <Refine
                            routerProvider={routerProvider}
                            dataProvider={dataProvider(SERVER_URL)}
                            authProvider={authProvider}
                            accessControlProvider={accessControlProvider}
                            i18nProvider={i18nProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                            notificationProvider={notificationProvider}
                            resources={[
                                {
                                    name: "users",
                                    list: "/users",
                                    show: "/users/show/:id",
                                    meta: {
                                        icon: <PeopleOutlineOutlined />,
                                    },
                                },
                                {
                                    name: "documents",
                                    list: "/documents",
                                    meta: {
                                        icon: <FileOpenOutlinedIcon />,
                                    },
                                },
                                {
                                    name: "box-files",
                                    list: "/box-files",
                                    meta: {
                                        icon: <FolderOpenOutlinedIcon />,
                                    },
                                },
                                {
                                    name: "companies",
                                    list: "/companies",
                                    meta: {
                                        icon: <ComputerIcon />,
                                    },
                                },
                            ]}
                        >
                            <Routes>
                                <Route
                                    element={
                                        <Authenticated
                                            key="authenticated-routes"
                                            fallback={
                                                <CatchAllNavigate to="/login" />
                                            }
                                        >
                                            <ThemedLayoutV2
                                                Header={Header}
                                                Title={Title}
                                            >
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        </Authenticated>
                                    }
                                >
                                    <Route index element={<Navigate to="/documents"/>} />
                                    <Route path="/users">
                                        <Route index element={<UserList />} />
                                    </Route>

                                    <Route
                                        path="/documents"
                                        element={<DocumentList />}
                                    />

                                    <Route
                                        path="/box-files"
                                        element={<BoxFileList />}
                                    />

                                    <Route
                                        path="/companies"
                                        element={<CompanyList />}
                                    />
                                </Route>

                                <Route
                                    element={
                                        <Authenticated
                                            key="auth-pages"
                                            fallback={<Outlet />}
                                        >
                                            <NavigateToResource resource="document" />
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="/login"
                                        element={
                                            <AuthPage
                                                type="login"
                                                
                                            />
                                        }
                                    />
                                    <Route
                                        path="/register"
                                        element={
                                            <RegisterPage />
                                        }
                                    />
                                    <Route
                                        path="/forgot-password"
                                        element={
                                            <AuthPage
                                                type="forgotPassword"
                                                formProps={{
                                                    defaultValues: {
                                                        email: "demo@refine.dev",
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/update-password"
                                        element={
                                            <AuthPage type="updatePassword" />
                                        }
                                    />
                                </Route>

                                <Route
                                    element={
                                        <Authenticated key="catch-all">
                                            <ThemedLayoutV2
                                                Header={Header}
                                                Title={Title}
                                            >
                                                <Outlet />
                                            </ThemedLayoutV2>
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="*"
                                        element={<ErrorComponent />}
                                    />
                                </Route>
                            </Routes>
                            <UnsavedChangesNotifier />
                            <DocumentTitleHandler />
                        </Refine>
                    </RefineSnackbarProvider>
                </ColorModeContextProvider>
            </KBarProvider>
        </BrowserRouter>
    );
};

export default App;
