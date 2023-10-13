import { PageEnum } from '@/constants/enums/pages.enum.ts';
import { EditorState } from 'draft-js';

export interface PageSection {
  page: PageEnum;
  title: string;
  value: string;
  _id: string;
  section: string;
  editorState: EditorState;
}
