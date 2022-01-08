// @ts-nocheck
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Box, IconButton, Stack } from '@mui/material';
import MUIDataTable from '../../components/table';
import PapperBlock from '../../components/papper-block';
import ProductionFilterForm from './ProductionFilterForm';
// import MUIDataTable from 'mui-datatables';
import { AlertDialogUi } from "../../components/";

import { ProductsRequest } from "../../services/productsService";

import { AddProduction } from "./AddProduction";
import { KindMovementsRequest } from "../../services/kindmovementsService";
import SettingsIcon from '@mui/icons-material/Settings';
//import { blue, yellow } from '@mui/material/colors';
import ReplayIcon from '@mui/icons-material/Replay';
import { ProductionRejected } from "./ProductionRejected";




const Production: React.FC = () => {
    const refDatatable: any = React.useRef();
    const [productDerivate, setproductDerivate] = useState([])
    const [openModalRejected, setOpenModalRejected] = React.useState(false);
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [productChild, setproductChild] = React.useState({});
    const [productParent, setproductParent] = React.useState({});
    const [productRejected, setproductRejected] = React.useState({});
    const [existence_converted, setexistence_converted] = React.useState(0);
    const [kind_movement, setkind_movement] = useState([])
    const [isEnable, setisEnable] = useState(true)

    const [number_order, setnumber_order] = useState<any>("")

    const [kind_mov, setkind_mov] = useState<any>(null)
    const [disable_number_order, setdisable_number_order] = useState<any>(false)

    const [obsertvation, setobsertvation] = useState("")

    const [reserved_quantity, setreserved_quantity] = useState<any>("")



    useEffect(() => { KindMovementsRequest.findWithOnlyProduction().then(e => setkind_movement(e)) }, [])


    const handleClickOpenModalAdd = (data) => {
        setproductChild(data)
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    const handleClickOpenModalRejected = (data) => {
        setproductRejected(data)
        setOpenModalRejected(true);
    };

    const handleCloseModalRejected = () => {
        setOpenModalRejected(false);
    };

    const columns = [
        { name: "p_id", label: "Id" },
        { name: "p_name", label: "Producto" },
        { name: "m_suggest_units", label: "Unid. sugeridas" },
        { name: "m_suggest_generated", label: "Unid. generadas" },
        { name: "m_amount_used", label: "Cant. usada" },
        { name: "m_waste_quantity", label: "Merma" },
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (value, tableMeta, updateValue) => {
                    return (
                        <Stack
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            spacing={2}
                        >
                            <IconButton disabled={isEnable} aria-label="update" onClick={() => handleClickOpenModalAdd(productDerivate[value])}><SettingsIcon style={{ color: productDerivate[value] ? productDerivate[value].amount_used > 0 ? "#FBFF18" : "#0378B2" : "#0378B2" }} color="primary" fontSize="small" /></IconButton>
                            <IconButton disabled={productDerivate[value] ? productDerivate[value].amount_used > 0 ? false: true : false} aria-label="update" onClick={() =>{handleClickOpenModalRejected(productDerivate[value]); }}><ReplayIcon  /></IconButton>
                    </Stack>

                    );
                }
            }
        },
    ];

    {/* 

        productDerivate[value].m_amount_used > 0 ?  "#FBFF18"  :  "#0378B2"
    <IconButton disabled={isEnable} aria-label="update" onClick={() => handleClickOpenModalAdd(JSON.parse(JSON.stringify(productDerivate[value])))}><SettingsIcon color="primary" fontSize="small" /></IconButton>
    
    
    <IconButton disabled={isEnable} aria-label="update" onClick={() => handleClickOpenModalAdd(JSON.parse(JSON.stringify(productDerivate[value]))) }><SettingsIcon color="primary" fontSize="small" /></IconButton> 
    sx={JSON.parse(JSON.stringify(productDerivate[value])).m_amount_used > 0 ? { color: yellow[700] } : { color: blue[700] } }
  
    style={{ color : JSON.parse(JSON.stringify(productDerivate[value])).m_amount_used > 0 ?  "#FBFF18"  :  "#0378B2" }}
    */}


    const handleFormFilterSubmit = async (data: any) => {
        //await refDatatable.current.filter({});
        //const res = await ProductsRequest.getDerivate(data.product.p_id)
        //await refDatatable.fetchData(res)
        const res = await ProductsRequest.getByStatusSuggest(data.product.p_id)
        setproductParent(data.product)
        setproductDerivate(res)

        console.log(res)
        
        if(res.length > 0)
        //res[0]?.h_number_order ? "" : 
        res[0].h_number_order ? setnumber_order(res[0].h_number_order) : setnumber_order("")
           //setnumber_order(res[0].h_number_order)
        //console.log("----",res)
        setexistence_converted(data.existence_converted)
    }

    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <PapperBlock
                title="Produccion"
                desc="..."
            >
                <MUIDataTable
                    ref={refDatatable}
                    title={"Lista de productos derivados"}
                    columns={columns}
                    data={productDerivate}
                    options={{
                        serverSide: true,
                        print: true,
                        download: true,
                        pagination: false,
                    }}
                    additionalDataByRow={{
                        isNewRecord: false,
                    }}
                    filterForm={

                        <ProductionFilterForm reserved_quantity={reserved_quantity} setreserved_quantity={setreserved_quantity} obsertvation={obsertvation} setobsertvation={setobsertvation} disable_number_order={disable_number_order} setdisable_number_order={setdisable_number_order} kind_mov={kind_mov} setkind_mov={setkind_mov} number_order={number_order} setnumber_order={setnumber_order} setisEnable={setisEnable} handleSubmit={handleFormFilterSubmit} />

                    }

                    hasInitialLoad={false}
                    openFilterForm
                />
            </PapperBlock>
            <AlertDialogUi
                maxWidth="md"
                handleClose={handleCloseModalAdd}
                content={<AddProduction reserved_quantity={reserved_quantity} setnumber_order={setnumber_order} number_order={number_order} kind_mov={kind_mov} obsertvation={obsertvation} kind_movement={kind_movement} existence_converted={existence_converted} productparent={productParent} productchild={productChild} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />

<AlertDialogUi
                maxWidth="md"
                handleClose={handleCloseModalRejected}
                content={<ProductionRejected handleClose={handleCloseModalRejected} productRejected={productRejected} />}
                open={openModalRejected}
                title=""
            />
        </Box>
    );
};

export default Production;

//handleClickOpenModalAdd(JSON.parse(JSON.stringify(productDerivate[value])))