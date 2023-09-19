import draftToHtml from 'draftjs-to-html';
import { convertToRaw } from 'draft-js';

export default (state) => {
  const rawState = convertToRaw(state);
  return draftToHtml(rawState);
};
