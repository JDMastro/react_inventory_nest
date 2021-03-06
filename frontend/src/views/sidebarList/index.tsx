import * as React from 'react';
//import Toolbar from '@mui/material/Toolbar';
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
import SettingsIcon from '@mui/icons-material/Settings';
import { Profile } from "../profile";
import Can from "../../components/can";
import CloseIcon from '@mui/icons-material/Close';
import useAuth from '../../hooks/useAuth';




export function SideBarList() {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [open, setOpen] = React.useState(false);
    const [openInventary, setOpenInventary] = React.useState(false);
    const [openConsultas, setConsultas] = React.useState(false);
    const [settings, setSettings] = React.useState(false);

    const { logout } = useAuth();


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

    const handleClickSettings = () => {
        setSettings(!settings);
    };


    return (
        <div>
            {/*<Toolbar />*/}
            <Divider />
            <List component="nav" aria-label="main mailbox folders">
                <Profile />
            </List>
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
                        <Can
                            perform="maestro:consecutive:view"
                            yes={() => (
                                <ListItemButton
                                    sx={{ pl: 5 }}
                                    selected={selectedIndex === 10}
                                    onClick={(event: any) => handleListItemClick(event, 10)}
                                    component={Link}
                                    to={`/dashboard/inventary/consecutive`}
                                >
                                    <ListItemText primary="Consecutivo" />
                                </ListItemButton>
                            )}
                        />

                        <Can
                            perform="maestro:status:view"
                            yes={() => (
                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 9}
                                    onClick={(event: any) => handleListItemClick(event, 9)}
                                    component={Link}
                                    to={`/dashboard/maestro/status`}>

                                    <ListItemText primary="Estados" />
                                </ListItemButton>
                            )}
                        />



                        <Can
                            perform="maestro:units:view"
                            yes={() => (
                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 4}
                                    onClick={(event: any) => handleListItemClick(event, 4)}
                                    component={Link}
                                    to={`/dashboard/maestro/units`}>

                                    <ListItemText primary="Unidades" />
                                </ListItemButton>
                            )}
                        />

                        <Can
                            perform="maestro:products:view"
                            yes={() => (
                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 1}
                                    onClick={(event: any) => handleListItemClick(event, 1)}
                                    component={Link}
                                    to={`/dashboard/maestro/product`}>

                                    <ListItemText primary="Productos" />
                                </ListItemButton>
                            )}
                        />


                        <Can
                            perform="maestro:kindids:view"
                            yes={() => (
                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 3}
                                    onClick={(event: any) => handleListItemClick(event, 3)}
                                    component={Link}
                                    to={`/dashboard/maestro/kindid`}>

                                    <ListItemText primary="Tipo de identificaci??n" />
                                </ListItemButton>
                            )}
                        />


                        <Can
                            perform="maestro:providers:view"
                            yes={() => (

                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 5}
                                    onClick={(event: any) => handleListItemClick(event, 5)}
                                    component={Link}
                                    to={`/dashboard/maestro/person`}>

                                    <ListItemText primary="Proveedores" />
                                </ListItemButton>
                            )}
                        />


                        <Can
                            perform="maestro:kindmov:view"
                            yes={() => (

                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 6}
                                    onClick={(event: any) => handleListItemClick(event, 6)}
                                    component={Link}
                                    to={`/dashboard/maestro/kindmovements`}
                                >

                                    <ListItemText primary="Tipos de movimiento" />
                                </ListItemButton>
                            )}
                        />

























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
                        <Can
                            perform="consultas:bystatus:view"
                            yes={() => (

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





                            )}
                        />

                    </List>

                    <List component="div" disablePadding>
                        <Can
                            perform="consultas:reports:view"
                            yes={() => (

                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 18}
                                    onClick={(event: any) => handleListItemClick(event, 18)}
                                    component={Link}
                                    to={`/dashboard/inventary/reports`}>

                                    <ListItemText
                                        disableTypography
                                        primary="Reportes"
                                    />
                                </ListItemButton>





                            )}
                        />

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


                        <Can
                            perform="inventario:mov:view"
                            yes={() => (

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
                            )}
                        />


                        <Can
                            perform="inventario:prod:view"
                            yes={() => (
                                <ListItemButton sx={{ pl: 5 }}
                                    selected={selectedIndex === 11}
                                    onClick={(event: any) => handleListItemClick(event, 11)}
                                    component={Link}
                                    to={`/dashboard/maestro/productions`}
                                >

                                    <ListItemText primary="Produccion" />
                                </ListItemButton>
                            )}
                        />











                    </List>
                </Collapse>

                <Can
                    perform="usuarios:accounts:view"
                    yes={() => (
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
                    )}
                />



                <ListItemButton onClick={handleClickSettings}>
                    <ListItemIcon style={{ marginRight: '-25px' }}>
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>

                    <ListItemText
                        primary="Configuraci??n"
                    />
                    {settings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={settings} timeout="auto" unmountOnExit>



                    <Can
                        perform="configuracion:var:view"
                        yes={() => (
                            <ListItemButton
                                sx={{ pl: 5 }}
                                selected={selectedIndex === 15}
                                onClick={(event: any) => handleListItemClick(event, 15)}
                                component={Link}
                                to={`/dashboard/maestro/settings`}
                            >
                                <ListItemText primary="Configuraci??n" />
                            </ListItemButton>
                        )}
                    />

                    <Can
                        perform="configuracion:permi:view"
                        yes={() => (
                            <ListItemButton
                                sx={{ pl: 5 }}
                                selected={selectedIndex === 16}
                                onClick={(event: any) => handleListItemClick(event, 16)}
                                component={Link}
                                to={`/dashboard/maestro/settings/permission`}
                            >
                                <ListItemText primary="Permisos" />
                            </ListItemButton>
                        )}
                    />




                    <Can
                        perform="configuracion:status:view"
                        yes={() => (
                            <ListItemButton
                                sx={{ pl: 5 }}
                                selected={selectedIndex === 17}
                                onClick={(event: any) => handleListItemClick(event, 17)}
                                component={Link}
                                to={`/dashboard/maestro/settings/status`}
                            >
                                <ListItemText primary="Estado" />
                            </ListItemButton>
                        )}
                    />







                </Collapse>


                <ListItemButton
                    selected={selectedIndex === 17}
                    onClick={(event: any) => logout()}

                >
                    <ListItemIcon style={{ marginRight: '-25px' }} >
                        <CloseIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Cerrar sesi??n" />
                </ListItemButton>
                )



                {/* <ListItemButton
                            selected={selectedIndex === 15}
                            onClick={(event: any) => handleListItemClick(event, 15)}
                            component={Link}
                            to={`/dashboard/maestro/settings`}
                        >
                            <ListItemIcon style={{ marginRight: '-25px' }} >
                        <SettingsIcon fontSize="small" />
                    </ListItemIcon>
                            <ListItemText primary="Configuraci??n" />
               </ListItemButton>*/}



            </List>

        </div>
    )
}
