// eslint-disable-next-line import/prefer-default-export
export const check = (user: any, perform: any, data: any) => {
    return user.permissions.indexOf(perform) >= 0;
};
