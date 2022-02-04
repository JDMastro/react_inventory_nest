import React from "react";
import MUIDataTable from "../../components/table";
import { KindMovementsRequest } from "../../services/kindmovementsService";
import { StatusRequest } from "../../services/statusService";
//import { RolesRequest } from "../../services/roleService";
import { ClassificationkindmovementRequest } from "../../services/classificationkindmovementService";
import { classificationPeopleRequest } from "../../services/classificationPeopleService";
import { ConsecutiveRequest } from "../../services/consecutiveService";
import { AlertDialogUi, FabUi } from "../../components";

import { Addkindmovements } from "./add";
import AddIcon from "@mui/icons-material/Add";
import Can from "../../components/can";
import { IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { UpdateMovements } from "./update";
import { Deletemovements } from "./delete";

export function KindMovementsTable() {

    const refDatatable: any = React.useRef();
    const [kindMov, setKindMov] = React.useState({})
    //const[roles, setRoles] = React.useState([])
    const[classificationPeople, setClassificationPeople] = React.useState([])
    const[classificationkindMove, setClassificationkindMove] = React.useState([])
    const[consecutive, setConsecutive] = React.useState([])
    const[status, setStatus] = React.useState([])
    const [openAddDialogForm, setOpenAddDialogForm] = React.useState<boolean>(false);
    const [openEditDialogForm, setOpenEditDialogForm] = React.useState<boolean>(false);
    const [openDeleteDialogForm, setOpenDeleteDialogForm] = React.useState<boolean>(false);

    React.useEffect(() => {
        StatusRequest.getAll()
            .then(e => setStatus(e))
    }, [])

    React.useEffect(() => {
        classificationPeopleRequest.getAll().then(e => setClassificationPeople(e) )
    }, [])

    React.useEffect(() => {
        ClassificationkindmovementRequest.getAll().then(e => setClassificationkindMove(e) )
    }, [])

    React.useEffect(() => {
        ConsecutiveRequest.getAll().then(e => setConsecutive(e) )
    }, [])


    const columns = [
        {
            name: 'id',
            label: 'Id',
            options: {
                filter: true,
            },
        },
        {
            name: 'name',
            label: 'Nombre',
            options: {
                filter: true,
            },
        },
        {
            name: 'description',
            label: 'Descripción',
            options: {
                filter: true,
            },
        },
        {
            name: 'actions',
            label: 'Acciones',
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (dataIndex: number) => {
                    const kindMovementSelected = refDatatable.current.findData(dataIndex);
                    return(
                        <>
                         <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="update"
                                        onClick={() => {
                                            setKindMov(kindMovementSelected);
                                            setOpenEditDialogForm(true);
                                        }}
                                    >
                                        <EditIcon fontSize="small" color="primary" />
                                    </IconButton>
                                )}
                            />
                            <Can
                                perform="users:create"
                                yes={() => (
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            setKindMov(kindMovementSelected);
                                            setOpenDeleteDialogForm(true);
                                        }}
                                    >
                                        <DeleteIcon fontSize="small" color="error" />
                                    </IconButton>
                                )}
                                    />
                        </>
                    )
                }
            }
        }
    ]

    const options = {
        serverSide: true,
        print: true,
        download: true,
    };

    const handleProductSaveClick = (oper: string, updatedConsecutive: any) => {
        switch (oper) {
            case "CREATED":
                refDatatable.current.createRecord(updatedConsecutive)
                break;
            case "UPDATED":
                refDatatable.current.updateRecord(updatedConsecutive.id, updatedConsecutive)
                break;
            case "DELETED":
                refDatatable.current.deleteRecord(updatedConsecutive.id);
                break;
            default: break;
        }
        //refDatatable.current.updateRecord(updatedProduct.id, updatedProduct);
    };

    return (
        <>
         <MUIDataTable
                ref={refDatatable}
                fetchData={KindMovementsRequest.getAll}
                title={"Lista de Tipos de Movimientos"}
                // filterForm={<UserTableFilterForm handleSubmit={() => (console.log(''))}/>}
                columns={columns}
                options={options}
            />
             <FabUi
                size="small"
                color="primary"
                onClick={() => setOpenAddDialogForm(true)}
                ariaLabel="add"
                icon={<AddIcon />}
            />
            <AlertDialogUi
                handleClose={() => setOpenAddDialogForm(false)}
                content={
                    <Addkindmovements
                        onClose={() => setOpenAddDialogForm(false)}
                        onSubmit={handleProductSaveClick}
                        classificationPeople={classificationPeople}
                        consecutives={consecutive} 
                        Classificationkindmovement={classificationkindMove}
                        status={status}
                    />
                }
                open={openAddDialogForm}
                title=""
            />

<AlertDialogUi
                handleClose={() => setOpenEditDialogForm(false)}
                content={
                    <UpdateMovements
                    onClose={() => setOpenEditDialogForm(false)}
                    onSubmit={handleProductSaveClick}
                    classificationPeople={classificationPeople}
                    consecutives={consecutive} 
                    Classificationkindmovement={classificationkindMove}
                    status={status}
                    data={kindMov}
                    />}
                open={openEditDialogForm}
                title=""
            />
            <AlertDialogUi
                handleClose={() => setOpenDeleteDialogForm(false)}
                content={
                    <Deletemovements
                    data={kindMov}
                    onClose={() => setOpenDeleteDialogForm(false)}
                    onSubmit={handleProductSaveClick}
                    />
                }
                open={openDeleteDialogForm}
                title=""
            />

        </>
    )
}