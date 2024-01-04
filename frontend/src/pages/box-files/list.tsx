import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { HttpError, useTranslate } from "@refinedev/core";
import { DeleteButton, EditButton, List, useDataGrid } from "@refinedev/mui";
import { useModalForm } from "@refinedev/react-hook-form";
import React from "react";

import { CreateBoxFileModal, EditBoxFileModal } from "../../components";
import { IBoxFile, Nullable } from "../../interfaces";

export const BoxFileList: React.FC = () => {
    const { dataGridProps } = useDataGrid<IBoxFile>({
        sorters: {
            initial: [{
                field: "no",
                order: "asc"
            }]
        }
    });

    const createModalFormProps = useModalForm<
        IBoxFile,
        HttpError,
        Nullable<IBoxFile>
    >({
        refineCoreProps: { action: "create" },
        syncWithLocation: true,
    });
    const {
        modal: { show: showCreateModal },
    } = createModalFormProps;
    const t = useTranslate();
    const editModalFormProps = useModalForm<IBoxFile, HttpError, Nullable<IBoxFile>>({
        refineCoreProps: { action: "edit" },
        syncWithLocation: true,
    });
    const {
        modal: { show: showEditModal },
    } = editModalFormProps;

    const columns = React.useMemo<GridColDef<IBoxFile>[]>(
        () => [
            { field: "no", headerName: t("boxFiles.fields.no"), minWidth: 100, flex: 1 },
            { field: "name", headerName: t("boxFiles.fields.name"), minWidth: 400, flex: 2 },
            {
                field: "actions",
                headerName: "Actions",
                renderCell: function render({ row }) {
                    return (
                        <>
                            <EditButton
                                hideText
                                onClick={() => showEditModal(row.id)}
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
            <CreateBoxFileModal {...createModalFormProps} />
            <EditBoxFileModal {...editModalFormProps} />
        </>
    );
};