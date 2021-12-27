// @ts-nocheck
/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Box, IconButton } from '@mui/material';
import MUIDataTable from '../../components/table';
import PapperBlock from '../../components/papper-block';
import ProductionFilterForm from './ProductionFilterForm';
// import MUIDataTable from 'mui-datatables';
import { AlertDialogUi } from "../../components/";

import { ProductsRequest } from "../../services/productsService";

import { AddProduction } from "./AddProduction";
import { KindMovementsRequest } from "../../services/kindmovementsService";
import SettingsIcon from '@mui/icons-material/Settings';


const Production: React.FC = () => {
    const refDatatable: any = React.useRef();
    const [productDerivate, setproductDerivate] = useState([])
    const [openModalAdd, setOpenModalAdd] = React.useState(false);
    const [productChild, setproductChild] = React.useState({});
    const [productParent, setproductParent] = React.useState({});
    const [existence_converted, setexistence_converted] = React.useState(0);
    const [kind_movement, setkind_movement] = useState([])
    const [isEnable, setisEnable] = useState(true)

    const [number_order, setnumber_order] = useState<any>("")

    const [kind_mov, setkind_mov] = useState<any>(null)
    const [disable_number_order, setdisable_number_order] = useState<any>(false)

    const [obsertvation, setobsertvation] = useState("")




    useEffect(()=>{  KindMovementsRequest.findWithOnlyProduction().then(e => setkind_movement(e) ) },[])
    

    const handleClickOpenModalAdd = (data) => {
        setproductChild(data)
        setOpenModalAdd(true);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    const columns = [
        { name: "p_id", label: "Id" },
        { name: "p_name", label: "Producto" },
        { name: "purchase_unit", label: "Unidad de compra" },
        { name: "sale_unit", label: "Unidad de venta" },
        {
            name: "Actions",
            options: {
                filter: false,
                sort: false,
                empty: true,
                customBodyRenderLite: (value, tableMeta, updateValue) => {
                    return (

                        <IconButton disabled={isEnable} aria-label="update" onClick={() => handleClickOpenModalAdd(JSON.parse(JSON.stringify(productDerivate[value]))) }><SettingsIcon color="primary" fontSize="small" /></IconButton>
                    );
                }
            }
        },
    ];

    const handleFormFilterSubmit = async (data: any) => {
        //await refDatatable.current.filter({});
        const res = await ProductsRequest.getDerivate(data.product.p_id)
        //await refDatatable.fetchData(res)
        setproductParent(data.product)
        setproductDerivate(res)
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

                        <ProductionFilterForm obsertvation={obsertvation} setobsertvation={setobsertvation} disable_number_order={disable_number_order} setdisable_number_order={setdisable_number_order} kind_mov={kind_mov} setkind_mov={setkind_mov} number_order={number_order} setnumber_order={setnumber_order} setisEnable={setisEnable} handleSubmit={handleFormFilterSubmit} />

                    }

                    hasInitialLoad={false}
                    openFilterForm
                />
            </PapperBlock>
            <AlertDialogUi
            maxWidth="md"
                handleClose={handleCloseModalAdd}
                content={<AddProduction setnumber_order={setnumber_order} number_order={number_order} kind_mov={kind_mov} obsertvation={obsertvation} kind_movement={kind_movement} existence_converted={existence_converted} productparent={productParent} productchild={productChild} handleClose={handleCloseModalAdd} />}
                open={openModalAdd}
                title=""
            />
        </Box>
    );
};

export default Production;

//handleClickOpenModalAdd(JSON.parse(JSON.stringify(productDerivate[value])))