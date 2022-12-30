import { signJWT } from 'utils/helper';

export const signIn = (_id: string): string => {
  return signJWT({ _id });
};
