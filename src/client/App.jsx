import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor(){
      super()

      this.state = {
        currentInput: "",
        list: [],
        errorText: ""
      }
    }

    changeHandler(event){
        this.setState({currentInput: event.target.value});
        console.log("change", event.target.value);
    }


    handleClick(){
      var todoList;
      if (this.state.currentInput.length > 1 && this.state.currentInput.length < 200) {
        todoList = this.state.list;
        todoList.push(this.state.currentInput);
        this.setState({list:todoList, errorText: ''});
        let clearText = '';
        this.setState({currentInput: clearText});
      }
      else {
        let errorMessageToUser = "The input must be more than 1 letter and maximum of 200 letters as limit!"
        this.setState({errorText: errorMessageToUser, currentInput: ''});
      }
    }
        //need smth that takes the input and push into a list and show it in a <ul></ul>

    render() {
        console.log("rendering");
        return (
          <div className="item">
            <input onChange={(event)=>{this.changeHandler(event);}} value = {this.state.currentInput}/>
            <button onClick={()=>{this.handleClick()}}>Add To List!</button>
            <List todo={this.state.list}/>
            <p className="warning">{this.state.errorText}</p>
          </div>
        );
    }
}

class List extends React.Component {
    render() {
        let listOfItem = this.props.todo.map( item => {
            return <li>{item}</li>
        })
        return (
            <ol>
            {listOfItem}
            </ol>
            )
        }
}

export default hot(module)(App);