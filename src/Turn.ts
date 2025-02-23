import debugGenerator from 'debug';
import { Player } from './Player';
import { deepCopy } from './utilities/collections';
import { defaultGroupedSteps } from './constants/phases-turns';
import type { Phase, Step, GroupedSteps } from './types';

const debug = debugGenerator('magine:turn');

export class Turn {
  player: Player;
  groupedSteps: GroupedSteps;
  phaseIndex: number;
  stepIndex: number;
  ended: boolean = false;
  started: boolean = false;

  /**
   * General construtor to apply properties.
   *
   * TODO: Articulate specific properties to use in constructor
   * and validate.
   *
   * @param {Partial<Turn>} obj - An object with properties to assign.
   */
  constructor(obj: Partial<Turn> = {}) {
    debug('Turn constructor called with %o', obj);
    Object.assign(this, obj);

    // Set default values
    this.phaseIndex = this.phaseIndex || 0;
    this.stepIndex = this.stepIndex || 0;
    this.groupedSteps = this.groupedSteps || deepCopy(defaultGroupedSteps);
  }

  /**
   * Start turn.
   */
  start() {
    this.started = true;
    debug('Start turn');
  }

  /**
   * End turn.
   */
  end() {
    this.ended = true;
    debug('End turn');
  }

  /**
   * Next step in turn.
   */
  stepForward() {
    // Increment step index
    this.stepIndex++;

    // If step index is greater than the number of steps in the phase
    // increment phase index and reset step index
    if (this.stepIndex >= this.groupedSteps[this.phaseIndex].length - 1) {
      // Check if there are more phases
      if (this.phaseIndex < this.groupedSteps.length - 1) {
        this.phaseIndex++;
        this.stepIndex = 0;
      }
      else {
        // End turn
        this.stepIndex--;
        this.end();
      }
    }
  }

  /**
   * Get phase identifier.
   */
  get phase(): Phase {
    const phaseGroup = this.groupedSteps[this.phaseIndex];
    if (!phaseGroup || !Array.isArray(phaseGroup)) {
      throw new Error(`Phase group ${this.phaseIndex} not found`);
    }

    // Get phase from first item in group
    return phaseGroup[0].split('-')[0] as Phase;
  }

  /**
   * Get step identifier.
   */
  get step(): Step {
    return this.groupedSteps[this.phaseIndex][this.stepIndex] as Step;
  }
}
