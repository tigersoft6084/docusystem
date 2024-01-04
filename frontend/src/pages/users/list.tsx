import React from "react";
import { useModalForm } from "@refinedev/react-hook-form";
import { CreateButton, DeleteButton, EditButton } from "@refinedev/mui";
import Paper from "@mui/material/Paper";
import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    BooleanField,
    DateField,
    List,
    ShowButton,
    useDataGrid,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
    EditUser,
} from "../../components";
import { IUser, IUserFilterVariables, Nullable } from "../../interfaces";

export const UserList: React.FC<IResourceComponentsProps> = () => {
    const t = useTranslate();

    const { dataGridProps } = useDataGrid<
        IUser,
        HttpError,
        IUserFilterVariables
    >({
        initialPageSize: 10
    });

    const editDrawerFormProps = useModalForm<
        IUser,
        HttpError,
        Nullable<IUser>
    >({
        refineCoreProps: { action: "edit" },
    });

    const {
        modal: { show: showEditDrawer },
    } = editDrawerFormProps;

    const columns = React.useMemo<GridColDef<IUser>[]>(
        () => [
            {
                field: "name",
                headerName: t("users.fields.name"),
                minWidth: 150,
                flex: 1,
            },
            {
                field: "email",
                headerName: t("users.fields.email"),
                minWidth: 150,
                flex: 1,
            },
            {
                field: "company",
                headerName: t("users.fields.company"),
                minWidth: 150,
                valueGetter: ({ row }) =>
                    row.company.name,
                flex: 1,
            },
            {
                field: "role",
                headerName: t("users.fields.role.label"),
                valueGetter: ({ row }) =>
                    t(`users.fields.role.${row.role}`),
                flex: 1,
            },
            {
                field: "isEmailVerified",
                headerName: t("users.fields.isEmailVerified.label"),
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <BooleanField
                            svgIconProps={{
                                sx: { width: "16px", height: "16px" },
                            }}
                            value={row.isEmailVerified}
                        />
                    );
                },
                minWidth: 80,
                flex: 0.5,
            },
            {
                field: "isActive",
                headerName: t("users.fields.isActive.label"),
                align: "center",
                headerAlign: "center",
                renderCell: function render({ row }) {
                    return (
                        <BooleanField
                            svgIconProps={{
                                sx: { width: "16px", height: "16px" },
                            }}
                            value={row.isActive}
                        />
                    );
                },
                minWidth: 80,
                flex: 0.5,
            },
            {
                field: "createdAt",
                headerName: t("users.fields.createdAt"),
                renderCell: function render({ row }) {
                    return <DateField value={row.createdAt} format="LLL" />;
                },
                minWidth: 200,
                flex: 1,
            },
            {
                field: "actions",
                headerName: t("table.actions"),
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton
                                size="small"
                                hideText
                                onClick={() => showEditDrawer(row.id)}
                                recordItemId={row.id}
                            />
                            <DeleteButton
                                hideText
                                recordItemId={row.id}
                            />
                        </>

                    );
                },
                align: "center",
                headerAlign: "center",
                flex: 1,
                minWidth: 80,
            },
        ],
        [t],
    );

    return (
        <Paper>
            <EditUser {...editDrawerFormProps} />
            <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
                <DataGrid
                    {...dataGridProps}
                    columns={columns}
                    filterModel={undefined}
                    autoHeight
                    pageSizeOptions={[10, 20, 50, 100]}
                />
            </List>
        </Paper>

    );
};
