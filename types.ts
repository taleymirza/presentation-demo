import type { ReactNode } from 'react';

export interface SlideData {
  id: number;
  title: string;
  content: string | ReactNode | ReactNode[];
  backgroundColor: string;
  textColor: string;
  imageUrl?: string;
  isRevealList?: boolean;
}