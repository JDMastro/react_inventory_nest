import React from 'react';
import { check } from '../../utils/auth';

interface CanProps {
  perform: string;
  data?: any;
  yes: any;
  no?: any;
}

const Can: React.FC<CanProps> = ({ perform, data, yes, no }) => {
  const user = {
    id: 1,
    permissions: ['users:create', 'users:update']
  };
  const isAuthorized = check(user, perform, data);
  return isAuthorized ? yes() : no();
};

Can.defaultProps = {
  no: () => null,
};

export default Can;
