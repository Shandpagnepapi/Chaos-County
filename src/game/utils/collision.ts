import { worldBounds, type RectCollider, type Vec2 } from '../config/world';

const playerRadius = 0.3;

export function resolvePlayerCollision(position: Vec2, colliders: RectCollider[]): Vec2 {
  let resolved = {
    x: Math.min(worldBounds.maxX, Math.max(worldBounds.minX, position.x)),
    z: Math.min(worldBounds.maxZ, Math.max(worldBounds.minZ, position.z))
  };

  for (const collider of colliders) {
    resolved = pushCircleOutOfRect(resolved, playerRadius, collider);
  }

  return resolved;
}

function pushCircleOutOfRect(position: Vec2, radius: number, rect: RectCollider): Vec2 {
  const halfWidth = rect.width / 2;
  const halfDepth = rect.depth / 2;
  const nearestX = clamp(position.x, rect.x - halfWidth, rect.x + halfWidth);
  const nearestZ = clamp(position.z, rect.z - halfDepth, rect.z + halfDepth);
  const deltaX = position.x - nearestX;
  const deltaZ = position.z - nearestZ;
  const distanceSquared = deltaX * deltaX + deltaZ * deltaZ;

  if (distanceSquared >= radius * radius) {
    return position;
  }

  if (distanceSquared === 0) {
    const pushX = halfWidth - Math.abs(position.x - rect.x);
    const pushZ = halfDepth - Math.abs(position.z - rect.z);
    if (pushX < pushZ) {
      return { x: rect.x + Math.sign(position.x - rect.x || 1) * (halfWidth + radius), z: position.z };
    }
    return { x: position.x, z: rect.z + Math.sign(position.z - rect.z || 1) * (halfDepth + radius) };
  }

  const distance = Math.sqrt(distanceSquared);
  const push = radius - distance;
  return {
    x: position.x + (deltaX / distance) * push,
    z: position.z + (deltaZ / distance) * push
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
