import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { Divider, List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import { Link } from 'react-router-dom';
import InventoryIcon from '@mui/icons-material/Inventory';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
//import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
//import AssignmentIcon from '@mui/icons-material/Assignment';
//import PersonIcon from '@mui/icons-material/Person';




export function SideBarList() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [openInventary, setOpenInventary] = React.useState(false);
 const [openConsultas, setConsultas] = React.useState(false);


    const handleClick = () => {
        setOpen(!open);
    };

    const handleClickInventary = () => {
        setOpenInventary(!openInventary);
    };

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedIndex(index);
    };

    const handleClickConsultas = () => {
        setConsultas(!openConsultas);
      };


    return (
        <div>
            <Toolbar />
            <Divider />
            <List component="nav" aria-label="main mailbox folders" >
                <ListItemButton
                    selected={selectedIndex === 0}
                    onClick={(event: any) => handleListItemClick(event, 0)}
                    component={Link}
                    to={`/dashboard/`}
                >
                    <ListItemIcon style={{ marginRight: '-25px' }} >
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Inicio" />
                </ListItemButton>


                <ListItemButton onClick={handleClick} >
                    <ListItemIcon style={{ marginRight: '-25px' }} >
                        <InventoryIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Maestro" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>

                    <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 15}
                            onClick={(event: any) => handleListItemClick(event, 15)}
                            component={Link}
                            to={`/dashboard/maestro/settings`}
                        >

                            <ListItemText primary="Configuración" />
                        </ListItemButton>

                    <ListItemButton sx={{ pl: 5 }}
                                        selected={selectedIndex === 12}
                                        onClick={(event: any) => handleListItemClick(event, 12)}
                                        component={Link}
                                        to={`/dashboard/maestro/conversion`}
                        >

                            <ListItemText primary="Conversión" />
                        </ListItemButton>


                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 10}
                            onClick={(event: any) => handleListItemClick(event, 10)}
                            component={Link}
                            to={`/dashboard/inventary/consecutive`}>

                            <ListItemText primary="Consecutivo" />
                        </ListItemButton>


                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 9}
                            onClick={(event: any) => handleListItemClick(event, 9)}
                            component={Link}
                            to={`/dashboard/maestro/status`}>

                            <ListItemText primary="Estados" />
                        </ListItemButton>


                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 4}
                            onClick={(event: any) => handleListItemClick(event, 4)}
                            component={Link}
                            to={`/dashboard/maestro/units`}>

                            <ListItemText primary="Unidades" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 1}
                            onClick={(event: any) => handleListItemClick(event, 1)}
                            component={Link}
                            to={`/dashboard/maestro/product`}>

                            <ListItemText primary="Productos" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 5 }}
                                        selected={selectedIndex === 1}
                                        onClick={(event: any) => handleListItemClick(event, 1)}
                                        component={Link}
                                        to={`/dashboard/maestro/products/v2`}>

                            <ListItemText primary="Productos V2" />
                        </ListItemButton>


                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 3}
                            onClick={(event: any) => handleListItemClick(event, 3)}
                            component={Link}
                            to={`/dashboard/maestro/kindid`}>

                            <ListItemText primary="Tipo de identificación" />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 5}
                            onClick={(event: any) => handleListItemClick(event, 5)}
                            component={Link}
                            to={`/dashboard/maestro/person`}>

                            <ListItemText primary="Proveedores y clientes" />
                        </ListItemButton>








                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 6}
                            onClick={(event: any) => handleListItemClick(event, 6)}
                            component={Link}
                            to={`/dashboard/maestro/kindmovements`}
                        >

                            <ListItemText primary="Tipos de movimiento" />
                        </ListItemButton>

                        


                       
                     




                    </List>
                </Collapse>

                
                <ListItemButton onClick={handleClickConsultas}>
          
          <ListItemIcon style={{ marginRight: '-25px' }} >
                <DashboardIcon fontSize="small" />
              </ListItemIcon>

          <ListItemText
            primary="Consultas"
          />
          {openConsultas ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openConsultas} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 5 }}
              selected={selectedIndex === 14}
              onClick={(event: any) => handleListItemClick(event, 14)}
              component={Link}
              to={`/dashboard/inventary/outputs`}>

              <ListItemText
                disableTypography
                primary="Por estado"
              />
            </ListItemButton>




          </List>
        </Collapse>



                <ListItemButton onClick={handleClickInventary}>
                    <ListItemIcon style={{ marginRight: '-25px' }}>
                        <InventoryIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText
                        primary="Inventario"
                    />
                    {openInventary ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openInventary} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 5 }}
                            selected={selectedIndex === 7}
                            onClick={(event: any) => handleListItemClick(event, 7)}
                            component={Link}
                            to={`/dashboard/inventary/movements`}>

                            <ListItemText
                                disableTypography
                                primary="Movimiento"
                            />
                        </ListItemButton>

                        <ListItemButton sx={{ pl: 5 }}
                                        selected={selectedIndex === 11}
                                        onClick={(event: any) => handleListItemClick(event, 11)}
                                        component={Link}
                                        to={`/dashboard/maestro/productions`}
                        >

                            <ListItemText primary="Produccion" />
                        </ListItemButton>




                    </List>
                </Collapse>


                <ListItemButton
                    selected={selectedIndex === 8}
                    onClick={(event: any) => handleListItemClick(event, 8)}
                    component={Link}
                    to={`/dashboard/security/users`}
                >
                    <ListItemIcon style={{ marginRight: '-25px' }} >
                        <DashboardIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Usuarios" />
                </ListItemButton>



            </List>

        </div>
    )
}
