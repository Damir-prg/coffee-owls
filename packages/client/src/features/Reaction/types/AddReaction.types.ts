export enum EREACTION {
  LOVE = 'love',
  CRY = 'cry',
  EYES = 'eyes',
  FIRE = 'fire',
  LAUGH = 'laugh',
}

export const REACTION_ICON: Record<EREACTION, string> = {
  [EREACTION.LOVE]: String.fromCodePoint(0x1f495),
  [EREACTION.CRY]: String.fromCodePoint(0x1f62d),
  [EREACTION.EYES]: String.fromCodePoint(0x1f440),
  [EREACTION.FIRE]: String.fromCodePoint(0x1f525),
  [EREACTION.LAUGH]: String.fromCodePoint(0x1f602),
};
