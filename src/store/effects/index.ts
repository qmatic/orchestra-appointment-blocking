import { BranchEffects } from './branch.effects';
import { SystemInfoEffects } from './systemInfo.effects';
import { BlockerEffects } from './blocker.effects';
import { AccountEffects } from './account.effects';

export const effects: any[] = [
  BlockerEffects,
  BranchEffects,
  SystemInfoEffects,
  AccountEffects,
];

export * from './branch.effects';
export * from './systemInfo.effects';
export * from './blocker.effects';
export * from './account.effects';
