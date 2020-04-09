import React, { useState } from 'react';
import { Stack, TextField, } from 'office-ui-fabric-react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';
import { applyStyle } from './Style'
export const App: React.FunctionComponent = () => {
  const [editorText, setEditorText] = useState('');

  function applyEditorStyle(style: string) {
    let editor = document.getElementById('editor') as HTMLTextAreaElement;
    let textSelected = '';
    textSelected = editor.value.substring(editor.selectionStart, editor.selectionEnd);
    console.log(`Start: ${editor.selectionStart}, End: ${editor.selectionEnd}, Text: ${textSelected}`);
    setEditorText(applyStyle(style, editor.selectionStart, editor.selectionEnd, editor.value));
  }
  initializeIcons();
  const _items: ICommandBarItemProps[] = [
    {
      key: 'bold',
      text: 'Bold',
      iconProps: { iconName: 'Bold' },
      onClick: () => {
        console.log('Bold');
        applyEditorStyle('bold');
      },
    },
    {
      key: 'italic',
      text: 'Italic',
      iconProps: { iconName: 'Italic' },
      onClick: () => {
        console.log('Italic');
        applyEditorStyle('italic');
      },

    },
    /*
    {
      key: 'underline',
      text: 'Underline',
      iconProps: { iconName: 'Underline' },
      onClick: () => console.log('Underline'),
    },
    */
  ];

  return (
    <Stack
      horizontal={false}
      verticalAlign='start'
      horizontalAlign='center'
      verticalFill
    >
      <CommandBar
        items={_items}
      />
      <Stack
        style={{ width: '100%', maxWidth: 740 }}
      >
        <EditField label="Editor"
          text={editorText}
          setText={setEditorText}
        />
      </Stack>
    </Stack>
  );

};




type EditFieldProps = {
  label: string
  text: string
  setText: any
}
export const EditField = ({ label, text, setText }: EditFieldProps) => (
  <TextField
    label={label}
    multiline
    autoAdjustHeight
    resizable={false}
    value={text}
    onChange={(event) => setText((event.target as HTMLInputElement).value)}
    id='editor'
  />
);