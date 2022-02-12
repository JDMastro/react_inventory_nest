// eslint-disable-next-line import/prefer-default-export
export const check = (user: any, perform: any, data: any = {}) => {
    //return user.permissions.indexOf(perform) >= 0;
    return user && user.permissions ? user.permissions.indexOf(perform) >= 0 : false
    //return !user ? false : !user.permissions ? false : user.permissions.indexOf(perform)
    //return Object.keys(user).length === 0 || !user ? false : user.permissions.indexOf(perform) >= 0
};
