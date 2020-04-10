import React, { useState } from 'react';
import { Link, Text, Stack, TextField } from 'office-ui-fabric-react';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { Depths } from '@uifabric/fluent-theme/lib/fluent/FluentDepths';
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
    {
      key: 'clear',
      text: 'Clear',
      iconProps: { iconName: 'ClearFormatting' },
      onClick: () => {
        console.log('ClearFormatting');
        applyEditorStyle('regular');
      },
    },
    /*
    {
      key: 'help',
      text: 'Help',
      iconProps: { iconName: 'Help' },
      onClick: () => {
        console.log('Help');
      },
    },
    */
  ];

  return (
    <Stack
      horizontal={false}
      verticalAlign='start'
      horizontalAlign='center'
      padding='10px'
    >
      <Stack
        padding='30px'
        style={{ width: '100%', maxWidth: 840, boxShadow: Depths.depth8 }}
      >
        <Stack style={{ textAlign: 'center' }}>
          <Text variant='mega'>Standout</Text>
          <Text>Type profile text into editor box, highlight text to bold or italicize and click the button to apply.</Text>

        </Stack>
        <CommandBar
          items={_items}
          style={{ boxShadow: Depths.depth4 }}
        />
        < Stack

        >
          <EditField label="Editor"
            text={editorText}
            setText={setEditorText}
          />

        </Stack>


        <Stack
          horizontalAlign='center'>
          <Stack
            style={{ height: 20 }}
          >
          </Stack>
          <Text>Designed by <Link target='_blank' href='https://www.linkedin.com/in/ibnzterrell/'>Terrell Ibanez</Link></Text>
          <Link target='_blank' href='https://github.com/ibnzterrell/standout/'>Source Code on Github</Link>
        </Stack>
      </Stack>
    </Stack >
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
    rows={10}
    autoAdjustHeight
    resizable={false}
    value={text}
    onChange={(event) => setText((event.target as HTMLInputElement).value)}
    id='editor'
  />
);
