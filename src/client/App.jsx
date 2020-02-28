import React from 'react';
import { hot } from 'react-hot-loader';

class App extends React.Component {
    constructor(){
      super()
// this.state is smth like a global value that you can access
      this.state = {
        currentInput: "",
        list: [],
        errorText: ""
      }
    }

    handleClick(){
      let toDo = this.state.currentInput;
      if (toDo.length > 1 && toDo.length < 200) {
        let toDoList = this.state.list;
        toDoList.push({task: toDo});
        this.setState({list:toDoList, errorText: ''});
        this.setState({list: toDoList,currentInput: "", errorMessageToUser: ""});
      }
      else {
        let errorMessageToUser = "The input must be more than 1 letter and maximum of 200 letters as limit!";
        this.setState({errorText: errorMessageToUser, currentInput: " "});
      }
    }
        //need smth that takes the input and push into a list and show it in a <ul></ul>

    changeHandler(event){
        this.setState({currentInput: event.target.value});
        console.log("change", event.target.value);
    }

    deleteItem(event) {
        let todoItems = this.state.list;
        todoItems.splice(parseInt(event.target.value), 1);
        this.setState({list: todoItems});
    }

    render() {
        console.log("rendering");
        let displayErrorMsg;
            if (this.state.errorText != "") {
                displayErrorMsg = (<p className="warning">{this.state.errorText}</p>);
            } else {
                displayErrorMsg = "";
            }
    let listOfToDos = this.state.list.map(list=> {
        return <div>
                        <li>{list.task}</li>
                        <button onClick={(event)=>{this.deleteItem(event)}} >Remove</button>
                        </div>
    });
        return (
          <div className="item">
            <input onChange={(event)=>{this.changeHandler(event);}} value = {this.state.currentInput}/>
            <button onClick={()=>{this.handleClick()}}>Add To List!</button>
            <div>
                <ol>
            {listOfToDos}
            {displayErrorMsg}
                </ol>
            </div>
          </div>
        );
    }
}

// class List extends React.Component {
//     render() {
//         let listOfItem = this.props.todo.map( item => {
//             return <li>{item}</li>
//         })
//         return (
//             <ol>
//             {listOfItem}
//             </ol>
//             )
//         }
// }

export default hot(module)(App);