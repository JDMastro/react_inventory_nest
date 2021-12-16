export interface drawerProps{
    window?: () => Window;
    mobileOpen : boolean;
    handleDrawerToggle : () => void
    appBar : React.ReactChild[] | any;
    main : React.ReactChild[] | any;
    listItems : React.ReactChild[] | any;
}