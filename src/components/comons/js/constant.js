export const TOC_HE = {
  NORMAL: "normal",
  FIRE: "fire",
  WATER: "water",
  GRASS: "grass",
  ELECTRIC: "electric",
  ICE: "ice",
  FIGHTING: "fighting",
  POISON: "poison",
  GROUND: "ground",
  FLYING: "flying",
  PSYCHIQUE: "psychique",
  BUG: "bug",
  ROCK: "rock",
  GHOST: "ghost",
  DRAGON: "dragon",
  DARK: "dark",
  STEEL: "steel",
  FAIRY: "fairy",
};

export const {
  NORMAL,
  FIRE,
  WATER,
  GRASS,
  ELECTRIC,
  ICE,
  FIGHTING,
  POISON,
  GROUND,
  FLYING,
  PSYCHIQUE,
  BUG,
  ROCK,
  GHOST,
  DRAGON,
  DARK,
  STEEL,
  FAIRY,
} = TOC_HE;

export const DOI_DAU = {
  [NORMAL]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 0.5,
    [GHOST]: 0,
    [DRAGON]: 1,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
  [FIRE]: {
    [NORMAL]: 1,
    [FIRE]: 0.5,
    [WATER]: 0.5,
    [GRASS]: 2,
    [ELECTRIC]: 1,
    [ICE]: 2,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 2,
    [ROCK]: 0.5,
    [GHOST]: 1,
    [DRAGON]: 0.5,
    [DARK]: 1,
    [STEEL]: 2,
    [FAIRY]: 1,
  },
  [WATER]: {
    [NORMAL]: 1,
    [FIRE]: 2,
    [WATER]: 0.5,
    [GRASS]: 0.5,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 2,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 2,
    [GHOST]: 1,
    [DRAGON]: 0.5,
    [DARK]: 1,
    [STEEL]: 1,
    [FAIRY]: 1,
  },
  [GRASS]: {
    [NORMAL]: 1,
    [FIRE]: 0.5,
    [WATER]: 2,
    [GRASS]: 0.5,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 0.5,
    [GROUND]: 2,
    [FLYING]: 0.5,
    [PSYCHIQUE]: 1,
    [BUG]: 0.5,
    [ROCK]: 2,
    [GHOST]: 1,
    [DRAGON]: 0.5,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
  [ELECTRIC]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 2,
    [GRASS]: 0.5,
    [ELECTRIC]: 0.5,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 0,
    [FLYING]: 2,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 1,
    [DRAGON]: 0.5,
    [DARK]: 1,
    [STEEL]: 1,
    [FAIRY]: 1,
  },
  [ICE]: {
    [NORMAL]: 1,
    [FIRE]: 0.5,
    [WATER]: 0.5,
    [GRASS]: 2,
    [ELECTRIC]: 1,
    [ICE]: 0.5,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 2,
    [FLYING]: 2,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 1,
    [DRAGON]: 2,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
  [FIGHTING]: {
    [NORMAL]: 2,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 2,
    [FIGHTING]: 1,
    [POISON]: 0.5,
    [GROUND]: 1,
    [FLYING]: 0.5,
    [PSYCHIQUE]: 0.5,
    [BUG]: 0.5,
    [ROCK]: 2,
    [GHOST]: 0,
    [DRAGON]: 1,
    [DARK]: 2,
    [STEEL]: 2,
    [FAIRY]: 0.5,
  },
  [POISON]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 2,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 0.5,
    [GROUND]: 0.5,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 0.5,
    [GHOST]: 0.5,
    [DRAGON]: 1,
    [DARK]: 1,
    [STEEL]: 0,
    [FAIRY]: 2,
  },
  [GROUND]: {
    [NORMAL]: 1,
    [FIRE]: 2,
    [WATER]: 1,
    [GRASS]: 0.5,
    [ELECTRIC]: 2,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 2,
    [GROUND]: 1,
    [FLYING]: 0,
    [PSYCHIQUE]: 1,
    [BUG]: 0.5,
    [ROCK]: 2,
    [GHOST]: 1,
    [DRAGON]: 1,
    [DARK]: 1,
    [STEEL]: 2,
    [FAIRY]: 1,
  },
  [FLYING]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 2,
    [ELECTRIC]: 0.5,
    [ICE]: 1,
    [FIGHTING]: 2,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 2,
    [ROCK]: 0.5,
    [GHOST]: 1,
    [DRAGON]: 1,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
  [PSYCHIQUE]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 2,
    [POISON]: 2,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 0.5,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 1,
    [DRAGON]: 1,
    [DARK]: 0,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
  [BUG]: {
    [NORMAL]: 1,
    [FIRE]: 0.5,
    [WATER]: 1,
    [GRASS]: 2,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 0.5,
    [POISON]: 0.5,
    [GROUND]: 1,
    [FLYING]: 0.5,
    [PSYCHIQUE]: 2,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 0.5,
    [DRAGON]: 1,
    [DARK]: 2,
    [STEEL]: 0.5,
    [FAIRY]: 0.5,
  },
  [ROCK]: {
    [NORMAL]: 1,
    [FIRE]: 2,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 2,
    [FIGHTING]: 0.5,
    [POISON]: 1,
    [GROUND]: 0.5,
    [FLYING]: 2,
    [PSYCHIQUE]: 1,
    [BUG]: 2,
    [ROCK]: 1,
    [GHOST]: 1,
    [DRAGON]: 1,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
  [GHOST]: {
    [NORMAL]: 0,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 2,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 2,
    [DRAGON]: 1,
    [DARK]: 0.5,
    [STEEL]: 1,
    [FAIRY]: 1,
  },
  [DRAGON]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 1,
    [DRAGON]: 2,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 0,
  },
  [DARK]: {
    [NORMAL]: 1,
    [FIRE]: 1,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 0.5,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 2,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 2,
    [DRAGON]: 1,
    [DARK]: 0.5,
    [STEEL]: 1,
    [FAIRY]: 0.5,
  },
  [STEEL]: {
    [NORMAL]: 1,
    [FIRE]: 0.5,
    [WATER]: 0.5,
    [GRASS]: 1,
    [ELECTRIC]: 0.5,
    [ICE]: 2,
    [FIGHTING]: 1,
    [POISON]: 1,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 2,
    [GHOST]: 1,
    [DRAGON]: 1,
    [DARK]: 1,
    [STEEL]: 0.5,
    [FAIRY]: 2,
  },
  [FAIRY]: {
    [NORMAL]: 1,
    [FIRE]: 0.5,
    [WATER]: 1,
    [GRASS]: 1,
    [ELECTRIC]: 1,
    [ICE]: 1,
    [FIGHTING]: 2,
    [POISON]: 0.5,
    [GROUND]: 1,
    [FLYING]: 1,
    [PSYCHIQUE]: 1,
    [BUG]: 1,
    [ROCK]: 1,
    [GHOST]: 1,
    [DRAGON]: 2,
    [DARK]: 2,
    [STEEL]: 0.5,
    [FAIRY]: 1,
  },
};
