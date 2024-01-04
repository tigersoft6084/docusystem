import { useState } from "react";
import { useTranslate, BaseKey, useApiUrl } from "@refinedev/core";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

import { IDocument } from "../../interfaces";
import { DateField, DeleteButton } from "@refinedev/mui";

type DocumentItem = {
    document: IDocument;
    show: (id: BaseKey) => void;
};

export const DocumentItem: React.FC<DocumentItem> = ({
    document,
    show,
}) => {
    const t = useTranslate();
    const { id, name, title, images, boxFile, createdAt } = document;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const apiUrl = useApiUrl();
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? "simple-popover" : undefined;

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
                height: "100%",
            }}
        >
            <CardHeader
                action={
                    <Box component="div">
                        <IconButton
                            aria-describedby={popoverId}
                            onClick={handleClick}
                            sx={{ marginRight: "10px", marginTop: "4px" }}
                            aria-label="settings"
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Popover
                            id={popoverId}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                        >
                            <Button
                                onClick={() => {
                                    show(id);
                                    setAnchorEl(null);
                                }}
                                size="small"
                                startIcon={<EditIcon />}
                                sx={{
                                    padding: "5px 10px",
                                }}
                            >
                                {t("documents.buttons.edit")}
                            </Button>
                            <DeleteButton title={t("documents.buttons.delete")} recordItemId={id}/>
                        </Popover>
                    </Box>
                }
                sx={{ padding: 0 }}
                title={
                    <Tooltip title={name}>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                fontSize: "18px",
                                overflow: "hidden",
                                whiteSpace: "nowrap",
                                textOverflow: "ellipsis",
                                paddingLeft: 2
                            }}
                        >
                            {name}
                        </Typography>
                    </Tooltip>
                }
            />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <CardMedia
                    component="img"
                    sx={{
                        width: { xs: 84, sm: 120, lg: 180, xl: 240 },
                        height: { xs: 84, sm: 120, lg: 180, xl: 240 },
                        borderRadius: "10%",
                    }}
                    alt={name}
                    image={`${apiUrl}/uploads/${images[0].url}`}
                />
            </Box>
            <CardContent
                sx={{
                    paddingX: 2,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <Tooltip title={title}>
                    <Typography
                        variant="body2"
                        sx={{
                            mt: 0,
                            fontSize: "16px",
                            overflowWrap: "break-word",
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: "3",
                            WebkitBoxOrient: "vertical",
                            flex: 1,
                        }}
                    >
                        {title}
                    </Typography>
                </Tooltip>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Tooltip title={`${boxFile.no}`} placement="top">
                        <Typography
                            sx={{
                                fontWeight: 500,
                                fontSize: "20px",
                                overflowWrap: "break-word",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                            }}
                        >{`File: ${boxFile.no}`}
                        </Typography>
                    </Tooltip>
                    <div style={{ textAlign: "right" }}>
                        <DateField sx={{
                            fontWeight: 700,
                            color: "#999999",
                            my: 1,
                            float: "right"
                        }} align="right" value={createdAt} format="LL" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
