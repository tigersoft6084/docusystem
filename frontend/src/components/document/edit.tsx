import React from "react";
import axios from "axios";
import { useTranslate, useApiUrl, HttpError } from "@refinedev/core";
import { useAutocomplete, Edit } from "@refinedev/mui";
import { UseModalFormReturnType } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";

import Drawer from "@mui/material/Drawer";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import Autocomplete from "@mui/material/Autocomplete";
import CloseIcon from "@mui/icons-material/Close";

import { IBoxFile, IFile, IDocument, Nullable } from "../../interfaces";

export const EditDocument: React.FC<
    UseModalFormReturnType<IDocument, HttpError, Nullable<IDocument>>
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

        const { autocompleteProps } = useAutocomplete<IBoxFile>({
            resource: "box-files",
            onSearch: (value) => [{
                field: "no",
                operator: "contains",
                value
            }],
            sorters: [
                {
                    field: 'no',
                    order: 'asc'
                }
            ]
        });

        const imageInput = watch("images");
        const onChangeHandler = async (
            event: React.ChangeEvent<HTMLInputElement>,
        ) => {
            const formData = new FormData();

            const files = event.target.files ?? [];
            for (let i = 0; i < files.length; i++) {
                const file: File = files[i];
                formData.append("file", file);
            }

            const res = await axios.post<{ url: string }>(
                `${apiUrl}/media/upload`,
                formData,
                {
                    withCredentials: false,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                    },
                },
            );


            const imagePayload: any = [];
            for (let i = 0; i < files.length; i++) {
                const { name, size, type, lastModified } = files[i];
                imagePayload.push(
                    {
                        name,
                        size,
                        lastModified,
                        url: res.data.url[i],
                    },
                )
            }
            console.log(imagePayload);
            setValue("images", imagePayload, { shouldValidate: true });
        };

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
                                sx={{
                                    width: "30px",
                                    height: "30px",
                                    mb: "5px",
                                }}
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
                            paddingX="50px"
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                paddingX: {
                                    xs: 1,
                                    md: 6,
                                },
                            }}
                        >
                            <form onSubmit={handleSubmit(onFinish)}>
                                <FormControl sx={{ width: "100%" }}>
                                    <FormLabel required>
                                        {t("documents.fields.images.label")}
                                    </FormLabel>
                                    <Stack
                                        display="flex"
                                        alignItems="center"
                                        border="1px dashed  "
                                        borderColor="primary.main"
                                        borderRadius="5px"
                                        padding="10px"
                                        marginTop="5px"
                                    >
                                        <label htmlFor="images-input">
                                            <Input
                                                id="images-input"
                                                type="file"
                                                sx={{
                                                    display: "none",
                                                }}
                                                inputProps={{ multiple: true }}
                                                onChange={onChangeHandler}
                                            />
                                            <input
                                                id="file"
                                                {...register("images", {
                                                    required: t(
                                                        "errors.required.field",
                                                        { field: "Image" },
                                                    ),
                                                })}
                                                type="hidden"
                                            />
                                            {
                                                typeof imageInput != "string" && imageInput?.map((item: IFile, index) => (
                                                    <>
                                                        <Avatar
                                                            sx={{
                                                                cursor: "pointer",
                                                                width: {
                                                                    xs: 100,
                                                                    md: 180,
                                                                },
                                                                height: {
                                                                    xs: 100,
                                                                    md: 180,
                                                                },
                                                                borderRadius: 1,
                                                            }}
                                                            onClick={() => window.open(apiUrl + '/uploads/' + item.url)}
                                                            src={
                                                                apiUrl + '/uploads/' + item.url
                                                            }
                                                            alt="Document Scanned Image"
                                                        />
                                                    </>
                                                ))
                                            }
                                            {
                                                imageInput?.length ? null : (
                                                    <Avatar
                                                        sx={{
                                                            cursor: "pointer",
                                                            width: {
                                                                xs: 100,
                                                                md: 180,
                                                            },
                                                            height: {
                                                                xs: 100,
                                                                md: 180,
                                                            },
                                                            borderRadius: 1
                                                        }}
                                                        alt="Document Scanned Image"
                                                    />
                                                )
                                            }
                                            <Box sx={{ cursor: "pointer" }}>
                                                <Typography
                                                    variant="body2"
                                                    style={{
                                                        fontWeight: 800,
                                                        marginTop: "8px",
                                                        textAlign: "center"
                                                    }}
                                                >
                                                    {t(
                                                        "documents.fields.images.description",
                                                    )}
                                                </Typography>
                                                <Typography style={{ fontSize: "12px", textAlign: "center" }}>
                                                    {t("documents.fields.images.validation")}
                                                </Typography>
                                            </Box>
                                        </label>


                                    </Stack>
                                    {errors.images && (
                                        <FormHelperText error>
                                            {errors.images.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                                <Stack gap="10px" marginTop="10px">
                                    <FormControl>
                                        <FormLabel required>
                                            {t("documents.fields.name")}
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
                                            {t("documents.fields.title")}
                                        </FormLabel>
                                        <OutlinedInput
                                            id="title"
                                            {...register("title", {
                                                required: t(
                                                    "errors.required.field",
                                                    { field: "Description" },
                                                ),
                                            })}
                                            multiline
                                            minRows={5}
                                            maxRows={5}
                                        />
                                        {errors.title && (
                                            <FormHelperText error>
                                                {errors.title.message}
                                            </FormHelperText>
                                        )}
                                    </FormControl>
                                    <FormControl>
                                        <Controller
                                            control={control}
                                            name="boxFile"
                                            rules={{
                                                required: t(
                                                    "errors.required.field",
                                                    { field: "BoxFile" },
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
                                                        return item.no
                                                            ? `${item.no}`
                                                            : autocompleteProps?.options?.find(
                                                                (p) =>
                                                                    p.id.toString() ===
                                                                    item.toString(),
                                                            )?.no.toString() ?? "";
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
                                                            label="BoxFile"
                                                            variant="outlined"
                                                            error={
                                                                !!errors.boxFile
                                                                    ?.message
                                                            }
                                                            required
                                                        />
                                                    )}
                                                />
                                            )}
                                        />
                                        {errors.boxFile && (
                                            <FormHelperText error>
                                                {errors.boxFile.message}
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
