import { Player } from './player';
import { Hall } from './hall';
export class Event {
  title: string;
  key?: string;
  id: string;
  picture: string;
  startsAt: string;
  active: boolean;
  townhall: Hall[];
  playersList: Player[];
}
