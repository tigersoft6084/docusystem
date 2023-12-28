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
import dataProvider from "@refinedev/simple-rest";
import routerProvider, {
    CatchAllNavigate,
    NavigateToResource,
    UnsavedChangesNotifier,
    DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import LocalPizzaOutlined from "@mui/icons-material/LocalPizzaOutlined";
import PeopleOutlineOutlined from "@mui/icons-material/PeopleOutlineOutlined";
import Dashboard from "@mui/icons-material/Dashboard";

import { authProvider, TOKEN_KEY, API_URL, SERVER_URL } from "./authProvider";
import { DashboardPage } from "./pages/dashboard";
import { UserList, UserShow } from "./pages/users";
import {
    CourierList,
    CourierShow,
    CourierCreate,
    CourierEdit,
} from "./pages/couriers";
import { AuthPage } from "./pages/auth";
import { ProductList } from "./pages/products";
import { CategoryList } from "./pages/categories";
import { ColorModeContextProvider } from "./contexts";
import { Header, Title } from "./components";
import { BikeWhiteIcon } from "./components/icons/bike-white";
import axios from "axios";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    const auth = JSON.parse(token);
    const accessToken = auth.accessToken;
    config.headers["x-access-token"] = `${token}`;
  }
  return config;
});

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
                            dataProvider={dataProvider(API_URL)}
                            authProvider={authProvider}
                            i18nProvider={i18nProvider}
                            options={{
                                syncWithLocation: true,
                                warnWhenUnsavedChanges: true,
                            }}
                            notificationProvider={notificationProvider}
                            resources={[
                                {
                                    name: "dashboard",
                                    list: "/",
                                    meta: {
                                        label: "Dashboard",
                                        icon: <Dashboard />,
                                    },
                                },
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
                                    name: "categories",
                                    list: "/files",
                                    meta: {
                                        icon: <FolderOpenOutlinedIcon />,
                                    },
                                },
                                {
                                    name: "couriers",
                                    list: "/couriers",
                                    create: "/couriers/create",
                                    edit: "/couriers/edit/:id",
                                    show: "/couriers/show/:id",
                                    meta: {
                                        icon: <BikeWhiteIcon />,
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
                                    <Route index element={<DashboardPage />} />

                                    <Route path="/users">
                                        <Route index element={<UserList />} />
                                        <Route
                                            path="show/:id"
                                            element={<UserShow />}
                                        />
                                    </Route>

                                    <Route
                                        path="/documents"
                                        element={<ProductList />}
                                    />

                                    <Route
                                        path="/files"
                                        element={<CategoryList />}
                                    />

                                    <Route path="/couriers">
                                        <Route
                                            index
                                            element={<CourierList />}
                                        />
                                        <Route
                                            path="create"
                                            element={<CourierCreate />}
                                        />
                                        <Route
                                            path="edit/:id"
                                            element={<CourierEdit />}
                                        />
                                        <Route
                                            path="show/:id"
                                            element={<CourierShow />}
                                        />
                                    </Route>
                                </Route>

                                <Route
                                    element={
                                        <Authenticated
                                            key="auth-pages"
                                            fallback={<Outlet />}
                                        >
                                            <NavigateToResource resource="dashboard" />
                                        </Authenticated>
                                    }
                                >
                                    <Route
                                        path="/login"
                                        element={
                                            <AuthPage
                                                type="login"
                                                formProps={{
                                                    defaultValues: {
                                                        email: "demo@refine.dev",
                                                        password: "demodemo",
                                                    },
                                                }}
                                            />
                                        }
                                    />
                                    <Route
                                        path="/register"
                                        element={
                                            <AuthPage
                                                type="register"
                                                formProps={{
                                                    defaultValues: {
                                                        email: "demo@refine.dev",
                                                        password: "demodemo",
                                                    },
                                                }}
                                            />
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
