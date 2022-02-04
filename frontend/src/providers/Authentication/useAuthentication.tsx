import { useContext } from 'react';
import { AuthContext } from './context';

const useAuthentication: Function = () => useContext(AuthContext);
export default useAuthentication;
