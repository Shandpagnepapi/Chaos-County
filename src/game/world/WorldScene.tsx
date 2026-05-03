import { Decorations } from './Decorations';
import { Lighting } from './Lighting';
import { RoadsAndGround } from './RoadsAndGround';
import { WorldModels } from './WorldModels';

export function WorldScene() {
  return (
    <>
      <Lighting />
      <RoadsAndGround />
      <WorldModels />
      <Decorations />
    </>
  );
}
