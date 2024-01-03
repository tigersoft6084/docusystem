import { useState, useEffect, useContext } from "react";
import {
    useList,
    useTranslate,
    useGetIdentity,
    useGetLocale,
    useSetLocale,
} from "@refinedev/core";
import { RefineThemedLayoutV2HeaderProps, HamburgerMenu } from "@refinedev/mui";

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";

import i18n from "../../i18n";
import { IOrder, IStore, ICourier, IIdentity } from "../../interfaces";
import { ColorModeContext } from "../../contexts";

interface IOptions {
    label: string;
    url: string;
    link: string;
    category: string;
}

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = () => {
    const [value, setValue] = useState("");
    const [options, setOptions] = useState<IOptions[]>([]);

    const { mode, setMode } = useContext(ColorModeContext);

    const changeLanguage = useSetLocale();
    const locale = useGetLocale();
    const currentLocale = locale();
    const { data: user } = useGetIdentity<IIdentity | null>();

    const t = useTranslate();

   
    useEffect(() => {
        setOptions([]);
    }, [value]);

    return (
        <AppBar color="default" position="sticky" elevation={1}>
            <Toolbar
                sx={{
                    paddingLeft: {
                        sm: "24px",
                        md: "24px",
                    },
                }}
            >
                <HamburgerMenu />

                <Stack
                    direction="row"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Stack direction="row" flex={1}>
                    </Stack>
                    <Stack direction="row" alignItems="center">
                        <IconButton
                            onClick={() => {
                                setMode();
                            }}
                        >
                            {mode === "dark" ? (
                                <LightModeOutlined />
                            ) : (
                                <DarkModeOutlined />
                            )}
                        </IconButton>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                disableUnderline
                                defaultValue={currentLocale}
                                inputProps={{ "aria-label": "Without label" }}
                                variant="standard"
                            >
                                {[...(i18n.languages ?? [])]
                                    .sort()
                                    .map((lang: string) => (
                                        <MenuItem
                                            selected={currentLocale === lang}
                                            key={lang}
                                            defaultValue={lang}
                                            onClick={() => {
                                                changeLanguage(lang);
                                            }}
                                            value={lang}
                                        >
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: "16px",
                                                        height: "16px",
                                                        marginRight: "5px",
                                                    }}
                                                    src={`/images/flags/${lang}.svg`}
                                                />
                                                {lang === "en"
                                                    ? "English"
                                                    : "German"}
                                            </Stack>
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <Stack
                            direction="row"
                            gap="4px"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Typography variant="subtitle2">
                                {user?.email}
                            </Typography>
                            <Avatar src={""} alt={user?.email} />
                        </Stack>
                    </Stack>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
