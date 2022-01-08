import { Box, Grid, TableRow, TableCell, IconButton } from '@mui/material';
import { UseForm, SelectWrapperUi, ButtonUi, AccordioUi, TableNormalUi, AlertDialogUi } from "../../components";
import { PersonRequest } from "../../services/personService";
import { StatusRequest } from "../../services/statusService";
import { initialValuesOutputsFilter } from "../../initialValues";
import { initialFValuesTypes } from "../../types/initialFValues";
import { ouputsSchema } from "../../schemas/outputsSchema";

import MenuItem from '@mui/material/MenuItem';
import { FormikHelpers } from "formik";
import { useEffect, useState } from 'react';
import Search from '@mui/icons-material/Search';
import { Status } from "./ChangeStatus";
import EditIcon from '@mui/icons-material/Edit';

export function OutPuts()
{
    const [persons, setPersons] = useState([])
    const [status, setStatus] = useState([])
    const [disablebtns, setDisablebtns] = useState(false)
    const [number_orders, setNumber_orders] = useState([])
    const [orders, setOrders] = useState([])
    const [openModalAdd, setOpenModalAdd] = useState(false);

    const [expanded, setExpanded] = useState<string | false>(false);
    const [data, setdata] = useState({})

    const handleClickOpenModalAdd = (data : any) => {
        setdata(data)
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };



    useEffect(() => {
        PersonRequest.getAll().then(e =>{ setPersons(e) })
        StatusRequest.findStatusEmplyee().then(e => setStatus(e))

    }, [])

    const onSubmit = async (values: initialFValuesTypes, formikHelpers: FormikHelpers<any>) => {
        setDisablebtns(true)

        StatusRequest.getAllNumberOrdersbyStatus(values.status_id, values.person_id)
            .then(e => setNumber_orders(e))

        setDisablebtns(false)
    }

    const formik = UseForm(initialValuesOutputsFilter, ouputsSchema, onSubmit)

    const handleChangeAccordion =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
            console.log(panel)
            StatusRequest.getAllnumberOrders(panel).then(e =>{ setOrders(e); console.log(e) })
        };

    return (
        <div>
            {/* <SelectWrapperUi
                name={SelectData}
                label='Estados'
                value={SelectData}
                onChange={handleChange}
                error={false}
                menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name} ${data.description}`}</MenuItem>)}
            />*/}
            <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={5}>
                        <SelectWrapperUi
                            name="status_id"
                            label='Estados'
                            value={formik.values.status_id}
                            onChange={formik.handleChange}
                            error={formik.errors.status_id}
                            menuItems={status.map((data: any, i: any) => <MenuItem value={data.id} key={i}>{`${data.name}`}</MenuItem>)}

                        />                    </Grid>
                    <Grid item xs={5}>
                        <SelectWrapperUi
                            name="person_id"
                            label='Personas'
                            value={formik.values.person_id}
                            onChange={formik.handleChange}
                            error={formik.errors.person_id}
                            menuItems={persons.map((data: any, i: any) => <MenuItem value={data.p_id} key={i}>{`${data.p_fullname}`}</MenuItem>)}

                        />
                    </Grid>
                    <Grid item xs={2}>
                        <ButtonUi variant="contained" disabled={disablebtns} text="Buscar" type="submit" Icon={<Search fontSize="small" />} />
                    </Grid>

                </Grid>

            </Box>
            <Box mt={2}>
                {
                    number_orders.map((e: any) =>
                        <AccordioUi
                            tittle={e.h_number_order}
                            tittleSecond={e.ps_fullname}
                            panel={e.h_number_order}
                            content={
                                <TableNormalUi
                                    tableHead={
                                        <TableRow >

                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Nombre</TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Fecha de Creación</TableCell>
                                            <TableCell align="left" style={{ fontWeight: 'bold' }}>Acción</TableCell>
                                        </TableRow>
                                    }
                                    tableBody={
                                       orders.map((e:any, i:any)=>
                                       <TableRow
                                       key={i}
                                       sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                   >
                                       <TableCell align="left">{e.p_name}</TableCell>
                                       {/*<TableCell align="left">{e.Header.KindMovements.name}</TableCell>*/}
                                       <TableCell align="left">{e.m_quantity}</TableCell>
                                       <TableCell align="left">{e.creation_at}</TableCell>
                                       <TableCell align="left"><IconButton aria-label="update" onClick={() => handleClickOpenModalAdd(e)}><EditIcon color="primary" fontSize="small" /></IconButton></TableCell>
                                      
                                   </TableRow>
                                       )
                                    }
                                />
                            }
                            handleChange={handleChangeAccordion(e.h_number_order)}
                            expanded={expanded}
                        />
                    )
                }

            </Box>

            <AlertDialogUi
                maxWidth="md"
                handleClose={handleCloseModalAdd}
                content={<Status status_id={formik.values.status_id} person_id={formik.values.person_id} setNumber_orders={setNumber_orders} setExpanded={setExpanded} data={data} status={status} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </div>
    )

}