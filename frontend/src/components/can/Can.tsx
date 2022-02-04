import React from 'react';
import useUser from '../../hooks/useUser';
import { check } from '../../utils/auth';

interface CanProps {
  perform: string;
  data?: any;
  yes: any;
  no?: any;
}

const Can: React.FC<CanProps> = ({ perform, data, yes, no }) => {
  const { user } = useUser();
  const isAuthorized = check(user.data, perform, data);
  return isAuthorized ? yes() : no();
};

Can.defaultProps = {
  no: () => null,
};

export default Can;
