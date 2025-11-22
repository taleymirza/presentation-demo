import type { ReactNode } from 'react';

export interface SlideData {
  id: number;
  title: string;
  content: React.ReactNode | React.ReactNode[];
  instructions?: string;
  backgroundColor: string;
  textColor: string;
  isRevealList?: boolean;
}