import { useState, useEffect } from "react";
import {
    CrudFilters,
    getDefaultFilter,
    useList,
    useTranslate,
} from "@refinedev/core";
import LoadingButton from "@mui/lab/LoadingButton";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import { IBoxFile } from "../../interfaces";

type ProductItemProps = {
    setFilters: (filters: CrudFilters) => void;
    filters: CrudFilters;
};

export const BoxFileFilter: React.FC<ProductItemProps> = ({
    setFilters,
    filters,
}) => {
    const t = useTranslate();

    const [filterBoxFiles, setFilterBoxFiles] = useState<string[]>(
        getDefaultFilter("boxFile", filters, "in") ?? [],
    );

    const { data: boxFiles, isLoading } = useList<IBoxFile>({
        resource: "box-files",
        sorters: [
            {
                field: "no",
                order: "asc"
            }
        ]
    });

    useEffect(() => {
        setFilters?.([
            {
                field: "boxFile",
                operator: "in",
                value:
                    filterBoxFiles.length > 0 ? filterBoxFiles : undefined,
            },
        ]);
    }, [filterBoxFiles]);

    const toggleFilterBoxFile = (clickedBoxFile: string) => {
        const target = filterBoxFiles.findIndex(
            (boxFile) => boxFile === clickedBoxFile,
        );

        if (target < 0) {
            setFilterBoxFiles((prevBoxFiles) => {
                return [...prevBoxFiles, clickedBoxFile];
            });
        } else {
            const copyFilterBoxFiles = [...filterBoxFiles];

            copyFilterBoxFiles.splice(target, 1);

            setFilterBoxFiles(copyFilterBoxFiles);
        }
    };

    return (
        <Stack>
            <Grid container columns={6} marginTop="10px">
                <Grid item p={0.5}>
                    <LoadingButton
                        onClick={() => setFilterBoxFiles([])}
                        variant={
                            filterBoxFiles.length === 0
                                ? "contained"
                                : "outlined"
                        }
                        size="small"
                        loading={isLoading}
                        sx={{
                            borderRadius: "50px",
                        }}
                    >
                        {t("stores.all")}
                    </LoadingButton>
                </Grid>
                {boxFiles?.data.map((boxFile: IBoxFile) => (
                    <Grid item key={boxFile.id} p={0.5}>
                        <LoadingButton
                            variant={
                                filterBoxFiles.includes(
                                    boxFile.id.toString(),
                                )
                                    ? "contained"
                                    : "outlined"
                            }
                            size="small"
                            loading={isLoading}
                            sx={{
                                borderRadius: "50px",
                            }}
                            onClick={() =>
                                toggleFilterBoxFile(boxFile.id.toString())
                            }
                        >
                            {boxFile.no}
                        </LoadingButton>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
};
