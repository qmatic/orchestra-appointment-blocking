export interface IAccount {
  modules: string[];
  permissions: string[];
  id: number;
  branchIds: number[];
  userName: string;
  firstName: string;
  lastName: string;
  locale: string;
  direction: string;
  status: string;
  fullName: string;
}
