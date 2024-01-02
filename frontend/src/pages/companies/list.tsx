import React, { useCallback } from "react";
import {
    HttpError,
    IResourceComponentsProps,
    useTranslate,
} from "@refinedev/core";
import {
    BooleanField,
    DateField,
    EditButton,
    List,
    NumberField,
    SaveButton,
    useDataGrid,
} from "@refinedev/mui";
import { useForm, useModalForm } from "@refinedev/react-hook-form";
import { useTable } from "@refinedev/react-table";
import { ColumnDef, flexRender, Row } from "@tanstack/react-table";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import Edit from "@mui/icons-material/Edit";
import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";

import { EditProduct } from "../../components";
import { ICompany, IProduct, Nullable } from "../../interfaces";

export const CompanyList: React.FC<IResourceComponentsProps> = () => {
    const {
        refineCore: { onFinish, id, setId },
        register,
        handleSubmit,
    } = useForm<ICompany>({
        refineCoreProps: {
            redirect: false,
            action: "edit",
        },
    });

    const t = useTranslate();

    const columns = React.useMemo<ColumnDef<ICompany>[]>(
        () => [
            {
                id: "name",
                accessorKey: "name",
                header: t("companies.fields.name"),
                cell: function render({ row, getValue }) {
                    return (
                        <Stack direction="row" alignItems="center" spacing={3}>
                            <Typography>{getValue() as string}</Typography>
                        </Stack>
                    );
                },
            },
            {
                id: "actions",
                header: t("table.actions"),
                accessorKey: "id",
                cell: function render({ getValue }) {
                    return (
                        <Stack direction="row">
                            {id ? (
                                <>
                                    <EditButton
                                        onClick={() => {
                                            handleEditButtonClick(
                                                getValue() as string,
                                            );
                                        }}
                                    >
                                        Edit
                                    </EditButton>
                                    <div>Cancel</div>
                                </>
                            ) : (
                                <IconButton
                                    onClick={() => {
                                        setId(getValue() as string);
                                    }}
                                >
                                    <Edit fontSize="small" />
                                </IconButton>
                            )}
                        </Stack>
                    );
                },
            },
        ],
        [t],
    );

    const {
        options: {
            state: { pagination },
            pageCount,
        },
        getHeaderGroups,
        getRowModel,
        setPageIndex,
        setPageSize,
        refineCore: { tableQueryResult },
    } = useTable<ICompany>({
        columns,
        initialState: {
            sorting: [{ id: "name", desc: false }],
        },
    });

    const handleEditButtonClick = (editId: string) => {
        setId(editId);
    };

    const renderEditRow = useCallback((row: Row<ICompany>) => {
        const { id, name } = row.original;

        return (
            <TableRow key={`edit-${id}-inputs`}>
                <TableCell
                    sx={{
                        flex: "1",
                    }}
                >
                    <Stack
                        direction="row"
                        spacing={3}
                        alignContent="center"
                        alignItems="center"
                    >
                        <TextField
                            fullWidth
                            id="title"
                            type="text"
                            size="small"
                            defaultValue={name}
                            {...register("name", {
                                required: t("errors.required.field", {
                                    field: "Name",
                                }),
                            })}
                        />
                    </Stack>
                </TableCell>
                <TableCell
                    sx={{
                        maxWidth: "150px",
                    }}
                >
                    <SaveButton type="submit">{t("buttons.save")}</SaveButton>
                    <Button onClick={() => setId(undefined)}>
                        {t("buttons.cancel")}
                    </Button>
                </TableCell>
            </TableRow>
        );
    }, []);

    return (
        <List wrapperProps={{ sx: { paddingX: { xs: 2, md: 0 } } }}>
            <form onSubmit={handleSubmit(onFinish)}>
                <TableContainer>
                    <Table size="small">
                        <TableHead>
                            {getHeaderGroups().map((headerGroup) => (
                                <TableRow
                                    key={`header-group-${headerGroup.id}`}
                                >
                                    {headerGroup.headers.map((header) => (
                                        <TableCell
                                            key={`header-group-cell-${header.id}`}
                                        >
                                            {flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHead>
                        <TableBody>
                            {getRowModel().rows.map((row) => {
                                return (
                                    <React.Fragment key={row.id}>
                                        {id ===
                                            (row.original as ICompany).id ? (
                                            renderEditRow(row)
                                        ) : (
                                            <TableRow>
                                                {row
                                                    .getAllCells()
                                                    .map((cell) => {
                                                        return (
                                                            <TableCell
                                                                key={cell.id}
                                                            >
                                                                {flexRender(
                                                                    cell.column
                                                                        .columnDef
                                                                        .cell,
                                                                    cell.getContext(),
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    rowsPerPageOptions={[
                        5,
                        10,
                        25,
                        {
                            label: "All",
                            value: tableQueryResult.data?.total ?? 100,
                        },
                    ]}
                    showFirstButton
                    showLastButton
                    count={pageCount || 0}
                    rowsPerPage={pagination?.pageSize || 10}
                    page={pagination?.pageIndex || 0}
                    onPageChange={(_, newPage: number) => setPageIndex(newPage)}
                    onRowsPerPageChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                    ) => {
                        setPageSize(parseInt(event.target.value, 10));
                        setPageIndex(0);
                    }}
                />
            </form>
        </List>
    );
};
