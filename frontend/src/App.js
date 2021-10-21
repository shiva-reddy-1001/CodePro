import './App.css';
import CodeInput from './Components/CodeInput'


function App() {
  return (
    <div className="App">
      <CodeInput language="javascript"></CodeInput>
      <CodeInput language="xml"></CodeInput>
      <CodeInput language="css"></CodeInput>
    </div>
  );
}

export default App;
