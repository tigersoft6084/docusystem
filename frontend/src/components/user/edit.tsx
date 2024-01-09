import React from "react";
import axios from "axios";
import { useTranslate, useApiUrl, HttpError } from "@refinedev/core";
import { useAutocomplete, Edit } from "@refinedev/mui";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import Drawer from "@mui/material/Drawer";
import FormControlLabel from "@mui/material/FormControlLabel";
import Input from "@mui/material/Input";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";

import CloseIcon from "@mui/icons-material/Close";

import { ICompany, IUser, Nullable } from "../../interfaces";
import { MenuItem, Select } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

export const EditUser: React.FC<
    UseModalFormReturnType<IUser, HttpError, Nullable<IUser>>
> = ({
    watch,
    setValue,
    register,
    formState: { errors },
    control,
    refineCore: { onFinish },
    handleSubmit,
    modal: { visible, close },
    saveButtonProps,
    getValues,
}) => {
        const t = useTranslate();

        const apiUrl = useApiUrl();

        const { autocompleteProps } = useAutocomplete<ICompany>({
            resource: "companies",
            onSearch: (value) => [{
                field: "name",
                operator: "contains",
                value
            }]
        });

        return (
            <Drawer
                sx={{ zIndex: "1301" }}
                PaperProps={{ sx: { width: { sm: "100%", md: 500 } } }}
                open={visible}
                onClose={close}
                anchor="right"
            >
                <Edit
                    saveButtonProps={saveButtonProps}
                    headerProps={{
                        avatar: (
                            <IconButton
                                onClick={() => close()}
                                sx={{ width: "30px", height: "30px", mb: "5px" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        ),
                        action: null,
                    }}
                    wrapperProps={{ sx: { overflowY: "scroll", height: "100vh" } }}
                >
                    <Stack>
                        <Box
                            justifyContent="center"
                            alignItems="center"
                            marginBottom="50px"
                            sx={{
                                paddingX: {
                                    xs: 1,
                                    md: 6,
                                },
                            }}
                        >
                            <form onSubmit={handleSubmit(onFinish)}>
                                <Stack gap="10px" marginTop="10px">
                                    <FormControl>
                                        <FormLabel required>
                                            {t("users.fields.name")}
                                        </FormLabel>
                                        <OutlinedInput
                                            id="name"
                                            {...register("name", {
                                                required: t(
                                                    "errors.required.field",
                                                    { field: "Name" },
                                                ),
                                            })}
                                            style={{ height: "40px" }}
                                        />
                                        {errors.name && (
                                            <FormHelperText error>
                                                {errors.name.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel required>
                                            {t("users.fields.email")}
                                        </FormLabel>
                                        <OutlinedInput
                                            id="email"
                                            {...register("email", {
                                                required: t(
                                                    "errors.required.field",
                                                    { field: "Email" },
                                                ),
                                            })}
                                        />
                                        {errors.email && (
                                            <FormHelperText error>
                                                {errors.email.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ marginTop: "10px" }}>
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
                                                            label={t("users.fields.company")}
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
                                        {errors.company && (
                                            <FormHelperText error>
                                                {errors.company.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl sx={{ marginTop: "10px" }}>
                                        <FormLabel required>
                                            {t("users.fields.role.label")}
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            name="role"
                                            rules={{
                                                required: t(
                                                    "errors.required.field",
                                                    { field: "Role" },
                                                ),
                                            }}
                                            defaultValue={null as any}
                                            render={({ field }) => (
                                                <Autocomplete
                                                    disablePortal
                                                    {...field}
                                                    onChange={(
                                                        _,
                                                        value,
                                                    ) => {
                                                        field.onChange(
                                                            value,
                                                        );
                                                    }}
                                                    options={[
                                                        "user",
                                                        "admin",
                                                    ]}
                                                    renderInput={(
                                                        params,
                                                    ) => (
                                                        <TextField
                                                            {...params}
                                                            variant="outlined"
                                                            error={
                                                                !!errors.role
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.role && (
                                            <FormHelperText error>
                                                {errors.role.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel required>
                                            {t("users.fields.isEmailVerified.label")}
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            {...register("isEmailVerified")}
                                            defaultValue={false}
                                            render={({ field }) => {
                                                return (
                                                    <RadioGroup
                                                        id="isEmailVerified"
                                                        defaultValue={getValues(
                                                            "isEmailVerified",
                                                        )}
                                                        {...field}
                                                        onChange={(event) => {
                                                            const value =
                                                                event.target
                                                                    .value ===
                                                                "true";

                                                            setValue(
                                                                "isEmailVerified",
                                                                value,
                                                                {
                                                                    shouldValidate:
                                                                        true,
                                                                },
                                                            );

                                                            return value;
                                                        }}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value={true}
                                                            control={<Radio />}
                                                            label={t(
                                                                "status.verified",
                                                            )}
                                                        />
                                                        <FormControlLabel
                                                            value={false}
                                                            control={<Radio />}
                                                            label={t(
                                                                "status.not_verified",
                                                            )}
                                                        />
                                                    </RadioGroup>
                                                );
                                            }}
                                        />
                                        {errors.isEmailVerified && (
                                            <FormHelperText error>
                                                {errors.isEmailVerified.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel required>
                                            {t("users.fields.isActive.label")}
                                        </FormLabel>
                                        <Controller
                                            control={control}
                                            {...register("isActive")}
                                            defaultValue={false}
                                            render={({ field }) => {
                                                return (
                                                    <RadioGroup
                                                        id="isActive"
                                                        defaultValue={getValues(
                                                            "isActive",
                                                        )}
                                                        {...field}
                                                        onChange={(event) => {
                                                            const value =
                                                                event.target
                                                                    .value ===
                                                                "true";

                                                            setValue(
                                                                "isActive",
                                                                value,
                                                                {
                                                                    shouldValidate:
                                                                        true,
                                                                },
                                                            );

                                                            return value;
                                                        }}
                                                        row
                                                    >
                                                        <FormControlLabel
                                                            value={true}
                                                            control={<Radio />}
                                                            label={t(
                                                                "status.enable",
                                                            )}
                                                        />
                                                        <FormControlLabel
                                                            value={false}
                                                            control={<Radio />}
                                                            label={t(
                                                                "status.disable",
                                                            )}
                                                        />
                                                    </RadioGroup>
                                                );
                                            }}
                                        />
                                        {errors.isActive && (
                                            <FormHelperText error>
                                                {errors.isActive.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                </Stack>
                            </form>
                        </Box>
                    </Stack>
                </Edit>
            </Drawer>
        );
    };
