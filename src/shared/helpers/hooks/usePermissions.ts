import { useState, useEffect } from 'react';
import { TRoles } from 'store/slice/task/entities';
import { checkPermission, TPermission, TCan } from 'shared/helpers/permissions';

const permissionsDefine = (
  permissions: TPermission[],
  roles: TRoles[] | undefined,
): TCan => {
  const can: TCan = {};

  permissions.forEach(
    (permName) => { can[permName] = checkPermission(permName, roles); },
  );

  return can;
};

export const usePermissions = (
  permissions: TPermission[],
  roles: TRoles[] | undefined,
) => {
  const [can, setCan] = useState<TCan>(
    permissionsDefine(permissions, roles),
  );

  useEffect(() => {
    setCan(permissionsDefine(permissions, roles));
  }, [roles]);

  return can;
};
