import { DashboardRoute } from "../../routes/routes";
import React from "react";
import { DrawerUi, AppbarUi } from "../../components";

import { SideBarList } from "../sidebarList";

export function Main() {
    const [mobileOpen, setMobileOpen] = React.useState(false);


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    }
    return (
        <div>
            <DrawerUi
                handleDrawerToggle={handleDrawerToggle}
                mobileOpen={mobileOpen}
                main={<DashboardRoute />}
                appBar={<AppbarUi handleDrawerToggle={handleDrawerToggle} />}
                listItems={<SideBarList />}
            />

        </div>

    )
}