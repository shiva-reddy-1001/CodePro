

const Editor = ({ placeHolder, onChange, onKeyDown }) => {

    function handleChange(editor, data, value) {
        onChange(value)
    }

    return (
        <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        className="code-mirror-wrapper"
        options={{
          lineWrapping: true,
          lint: true,
          mode: language,
          theme: 'material',
          lineNumbers: true
        }}
      />
    );
  };

export default Editor;