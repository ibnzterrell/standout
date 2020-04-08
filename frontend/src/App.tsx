import React, { useState } from 'react';
import { Stack, TextField, } from 'office-ui-fabric-react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { initializeIcons } from '@uifabric/icons';
export const App: React.FunctionComponent = () => {
  const [text, setText] = useState('');

  initializeIcons();
  return (
    <Stack
      horizontal={false}
      verticalAlign='start'
      verticalFill
      disableShrink
      horizontalAlign='center'
    >
      <CommandBar
        items={_items}
      />
      <Stack
        style={{ width: 740 }}
      >
        <EditField label="Editor"
          text={text}
          setText={setText}
        />
      </Stack>
    </Stack>
  );
};

const _items: ICommandBarItemProps[] = [
  {
    key: 'bold',
    text: 'Bold',
    iconProps: { iconName: 'Bold' },
    onClick: () => {
      console.log('Bold');
      let editor = document.getElementById('editor') as HTMLTextAreaElement;
      let textSelected = '';
      textSelected = editor.value.substring(editor.selectionStart, editor.selectionEnd);
      console.log(`Start: ${editor.selectionStart}, End: ${editor.selectionEnd}, Text: ${textSelected}`);
    },
  },
  {
    key: 'italic',
    text: 'Italic',
    iconProps: { iconName: 'Italic' },
    onClick: () => console.log('Italic'),
  },
  {
    key: 'underline',
    text: 'Underline',
    iconProps: { iconName: 'Underline' },
    onClick: () => console.log('Underline'),
  },
];

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