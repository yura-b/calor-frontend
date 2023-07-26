import { PageEnum } from '@/constants/enums/pages.enum.ts';

export interface PageSection {
  page: PageEnum;
  title: string;
  value: string;
  _id: string;
}