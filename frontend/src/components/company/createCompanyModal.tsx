import { HttpError, useTranslate } from "@refinedev/core";
import { SaveButton, useAutocomplete } from "@refinedev/mui";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { UseModalFormReturnType } from "@refinedev/react-hook-form";

import { ICompany, Nullable } from "../../interfaces";

export const CreateCompanyModal: React.FC<
    UseModalFormReturnType<ICompany, HttpError, Nullable<ICompany>>
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
                        id="name"
                        {...register("name", {
                            required: "This field is required",
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        margin="normal"
                        fullWidth
                        label={t("companies.fields.name")}
                        name="name"
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