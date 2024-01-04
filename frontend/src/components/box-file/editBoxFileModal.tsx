import { HttpError, useTranslate } from "@refinedev/core";
import { SaveButton, useAutocomplete } from "@refinedev/mui";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";

import { Controller } from "react-hook-form";

import { IBoxFile,Nullable } from "../../interfaces";

export const EditBoxFileModal: React.FC<
    UseModalFormReturnType<IBoxFile, HttpError, Nullable<IBoxFile>>
> = ({
    saveButtonProps,
    modal: { visible, close, title },
    register,
    control,
    formState: { errors },
}) => {
    const t = useTranslate();

    return (
        <Dialog
            open={visible}
            onClose={close}
            PaperProps={{ sx: { minWidth: 500 } }}
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    autoComplete="off"
                    sx={{ display: "flex", flexDirection: "column" }}
                >
                    <TextField
                        id="no"
                        {...register("no", {
                            required: "This field is required",
                        })}
                        error={!!errors.no}
                        helperText={errors.no?.message}
                        margin="normal"
                        fullWidth
                        label={t("boxFiles.fields.no")}
                        name="no"
                    />
                    <TextField
                        id="name"
                        {...register("name", {
                            required: "This field is required",
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        margin="normal"
                        fullWidth
                        label={t("boxFiles.fields.name")}
                        name="name"
                        autoFocus
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <SaveButton {...saveButtonProps} />
            </DialogActions>
        </Dialog>
    );
};