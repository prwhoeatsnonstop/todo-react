import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor(){
      super()

      this.state = {
        currentInput: "",
        list: []
      }
    }

    changeHandler(event){
        this.setState({currentInput:event.target.value});
        console.log("change", event.target.value);
    }


    handleClick(){
      var todoList;
        todoList = this.state.list;
        todoList.push(this.state.currentInput);
        this.setState({list:todoList});
        let clearText = '';
        this.setState({currentInput: clearText});
    }
        //need smth that takes the input and push into a list and show it in a <ul></ul>

    render() {
        console.log("rendering");
        return (
          <div className="item">
            <input onChange={(event)=>{this.changeHandler(event);}} value = {this.state.currentInput}/>
            <button onClick={()=>{this.handleClick()}}>Add To List!</button>
            <List todo={this.state.list}/>
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