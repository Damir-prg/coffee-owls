import { createContext } from 'react';
import { TGameContext } from '../types/GameContextTypes';

export const GameContextInstance = createContext<TGameContext | null>(null);
GameContextInstance.displayName = 'GameContext';
