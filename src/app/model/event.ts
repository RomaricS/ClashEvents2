import { Player } from './player';
export class Event {
  title: string;
  id: string;
  startsAt: string;
  active: boolean;
  townhall: {
    th13: boolean;
    th12: boolean;
    th11: boolean;
    th10: boolean;
    th9: boolean;
    th8: boolean;
    th7: boolean;
  };
  playersList: Player[];
}
