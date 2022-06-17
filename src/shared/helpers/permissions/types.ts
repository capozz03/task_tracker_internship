import { rolesIds } from './rolesIds';
import { rolesMatrix } from './rolesMatrix';

export type TRoleName = keyof typeof rolesIds;

export type TConditions = {
  availableToRoles: Array<TRoleName>;
};

export type TPermission = keyof typeof rolesMatrix;

export type TCan = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof typeof rolesMatrix]?: boolean;
}
