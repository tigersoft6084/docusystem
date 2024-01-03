import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { HttpError, useTranslate } from "@refinedev/core";
import { EditButton, List, useDataGrid } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import React from "react";

import { CreateCompanyModal, EditCompanyModal } from "../../components";
import { ICompany, Nullable } from "../../interfaces";

export const CompanyList: React.FC = () => {
    const { dataGridProps } = useDataGrid<ICompany>();

    const createModalFormProps = useModalForm<
        ICompany,
        HttpError,
        Nullable<ICompany>
    >({
        refineCoreProps: { action: "create" },
        syncWithLocation: true,
    });
    const {
        modal: { show: showCreateModal },
    } = createModalFormProps;
    const t = useTranslate();
    const editModalFormProps = useModalForm<ICompany, HttpError, Nullable<ICompany>>({
        refineCoreProps: { action: "edit" },
        syncWithLocation: true,
    });
    const {
        modal: { show: showEditModal },
    } = editModalFormProps;

    const columns = React.useMemo<GridColDef<ICompany>[]>(
        () => [
            { field: "name", headerName: t("company.fields.name"), minWidth: 400, flex: 1 },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <EditButton
                            hideText
                            onClick={() => showEditModal(row.id)}
                        />
                    );
                },
                align: "center",
                headerAlign: "center",
                minWidth: 80,
            },
        ],
        [],
    );

    return (
        <>
            <List createButtonProps={{ onClick: () => showCreateModal() }}>
                <DataGrid {...dataGridProps} columns={columns} autoHeight />
            </List>
            <CreateCompanyModal {...createModalFormProps} />
            <EditCompanyModal {...editModalFormProps} />
        </>
    );
};