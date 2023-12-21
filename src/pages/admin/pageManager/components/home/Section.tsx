import React, { memo, useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks.ts';
import { setSpecificField } from '@/store/admin/PageManagerReducer.ts';
import { EditorState, ContentState, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

const Section: React.FC<{ value: string; title: string | null; id: string }> = ({ value, id, title }) => {
  const { isDisable } = useAppSelector((state) => state.pageManager);
  const dispatch = useAppDispatch();
  const [editorState, setEditorState] = useState(() => {
    const blocksFromHTML = convertFromHTML(value);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    return EditorState.createWithContent(contentState);
  });

  useEffect(() => {
    const blocksFromHTML = convertFromHTML(value);
    const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
    setEditorState(EditorState.createWithContent(contentState));
  }, [value]);

  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const htmlContent = stateToHTML(contentState);
    dispatch(setSpecificField({ id, value: htmlContent }));
  };

  return (
    <div className={'w-[45%]'}>
      {title && <p className={'font-medium'}>{title}</p>}

      {isDisable ? (
        <div dangerouslySetInnerHTML={{ __html: value }} />
      ) : (
        <Editor
          defaultEditorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarHidden={isDisable}
          wrapperStyle={{ border: '2px solid #CBD2E0' }}
          handlePastedText={() => false}
          toolbar={{
            options: ['inline', 'blockType', 'list', 'textAlign', 'history'],
          }}
          editorStyle={{ paddingLeft: '15px', paddingRight: '15px' }}
        />
      )}
    </div>
  );
};

export default memo(Section);
