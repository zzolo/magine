export const defaultPhases = [
  'beginning',
  'pre_combat_main',
  'combat',
  'post_combat_main',
  'ending'
];

export const defaultPhaseBeginningSteps = ['beginning-untap', 'beginning-upkeep', 'beginning-draw'];
export const defaultPhasePreCombatMainSteps = ['pre_combat_main'];
export const defaultPhaseCombatSteps = [
  'combat-beginning',
  'combat-attackers',
  'combat-blockers',
  'combat-damage'
];
export const defaultPhasePostCombatMainSteps = ['post_combat_main'];
export const defaultPhaseEndingSteps = ['ending-end', 'ending-cleanup'];

export const defaultSteps = [
  ...defaultPhaseBeginningSteps,
  ...defaultPhasePreCombatMainSteps,
  ...defaultPhaseCombatSteps,
  ...defaultPhasePostCombatMainSteps,
  ...defaultPhaseEndingSteps
];

export const defaultGroupedSteps = [
  defaultPhaseBeginningSteps,
  defaultPhasePreCombatMainSteps,
  defaultPhaseCombatSteps,
  defaultPhasePostCombatMainSteps,
  defaultPhaseEndingSteps
];
