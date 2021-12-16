import React, { useEffect } from "react";
import { FabUi, AlertDialogUi } from '../../components';
import AddIcon from '@mui/icons-material/Add';
import { AddMovements } from "./add";
import { KindMovementsRequest } from "../../services/kindmovementsService";

export function Movements() {
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [refresh, setRefresh] = React.useState(false)
    const [kindmov, setkindmov] = React.useState([]);

    const handleClickOpenModalAdd = () => {
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    useEffect(() => {
        KindMovementsRequest.getAll().then(e => setkindmov(e))
    }, [])

    return (
        <div>
            <FabUi

                size="small"
                color="primary" onClick={handleClickOpenModalAdd}
                ariaLabel="add"
                icon={<AddIcon />}
            />

            <AlertDialogUi
                maxWidth="md"
                handleClose={handleCloseModalAdd}
                content={<AddMovements kindmov={kindmov} refresh={refresh} setRefresh={setRefresh} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </div>
    )
}