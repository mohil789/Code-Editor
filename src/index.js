import React, { Component } from 'react';
import { render } from 'react-dom';
import CodeMirror from 'react-codemirror';
import Hello from './App';
import 'codemirror/lib/codemirror.css';
import Select from "react-dropdown-select";

const questions = [
  { label: "Problem A", value: 1},
  { label: "Problem B", value: 2},
  { label: "Problem C", value: 3},
  { label: "Problem D", value: 4},
  { label: "Problem E", value: 5},
  { label: "Problem F", value: 6},
  { label: "Problem G", value: 7}
];

const languages = [
  { label: "C++", value: 1},
  { label: "Java", value: 2},
  { label: "Python", value: 3}
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: '2021',
      code: '// Start your Code from here',
      selectedQuestion: null,
      selectedFile: null,
      selectedLanguage: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onFileChange = event => {
    this.setState({selectedFile: event.target.files[0]});
  };

  onFileUpload = () => {
    const formData = new FormData();

    formData.append(
      "myFile",
      this.state.selectedFile,
      this.state.selectedFile.name
    );
    console.log(this.state.selectedFile);
  };

  fileData = () => {
    if(this.state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
        </div>
      );
    }
  };

  updateCode(newCode) {
		this.setState({
			code: newCode,
		});
  }
  
  selectedProblemHandler = (selectedQuestion) => {
    this.setState({selectedQuestion});
  }

  selectedLanguageHandler = (selectedLanguage) => {
    this.setState({selectedLanguage});
  }

  handleSubmit(event) {
    alert('Selected Question : '+ this.state.selectedQuestion[0].label);
    alert('Selected Language : '+ this.state.selectedLanguage[0].label);
    alert('Code : '+ this.state.code);
    event.preventDefault();
  }

  render() {
    let options = {
			lineNumbers: true,
		};
    return (
      <div>
      <div classname = 'container'>
        <Hello name={this.state.name} />
        <h3>Submit Solution :</h3>
        <p>
          Select Problem :)
        </p>
        <form onSubmit={this.handleSubmit.Submit}>
          <Select options={questions} onChange={this.selectedProblemHandler}/>
          <br/>
          <p>
            Select Language :
          </p>
          <Select options={languages} onChange={this.selectedLanguageHandler}/>
          <br/>
          <label>
            <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <div>
          <p>Or Choose File :</p>
          <input type="file" onChange={this.onFileChange} />
          <button onClick={this.onFileUpload}>
            Submit
          </button>
        </div>
        {this.fileData()}
        <CodeMirror value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
      </div>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
