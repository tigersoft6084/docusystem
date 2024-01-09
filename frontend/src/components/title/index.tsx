import { Link } from "react-router-dom";
import Box from "@mui/material/Box";

import { A4BoxFilesIcon, DocumentManagementIcon } from "../../components/icons";

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <Link to="/documents">
            <Box
                sx={{
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "text.primary",
                }}
            >
                {collapsed ? <A4BoxFilesIcon /> : <DocumentManagementIcon />}
            </Box>
        </Link>
    );
};
