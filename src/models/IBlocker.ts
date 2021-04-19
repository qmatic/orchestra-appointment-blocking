import { IBranch } from './IBranch';
export interface IBlocker {
  publicId?: string;
  status?: number;
  created?: number;
  updated?: number;
  start?: string;
  custom?: string;
  branch?: IBranch;
  title?: string;
  notes?: string;
  allDay?: boolean;
  blocking?: boolean;
  end?: string;
  deleted?: boolean;
  qpId?: number;
  id?: number;
}
