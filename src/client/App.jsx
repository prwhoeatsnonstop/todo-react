import React from 'react';
//import React, {Fragment} from 'react';
import { hot } from 'react-hot-loader';
import Moment from 'moment';


// Given this component hierarchy:
// ItemList should be stored as state at the top level.
// Form can be it's own component, or be integrated into the top level component.
// TodoItem will get passed the method that gets called for item delete.

class Form extends React.Component {
    constructor() {
        super()

        this.state = {
            currentInput: "",
            errorText: "",
        }
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.addNewTodo()
        }
    }

    onInputChange(event) {
        let input = event.target.value
        this.setState( { currentInput: input})
    }

    addNewTodo() {
        if (this.state.currentInput.length > 1 && this.state.currentInput.length < 200) {
            this.props.addTodo(this.state.currentInput)
            this.setState ({ currentInput: "", errorText: ""} )
        } else {
            let errorMessageToUser = "The input must be more than 1 letter and maximum of 200 letters as limit!"
            this.setState ({ errorText: errorMessageToUser, currentInput: ""})
        }
    }

    render() {
        return (
            <div>
                <div className="warning">
                    {this.state.errorText}
                    <input
                        onChange={(event) => {this.onInputChange(event);}}
                        onKeyPress={(event) => {this.handleKeyPress(event);}}
                        value={this.state.currentInput} />
                        <button onClick={() => {this.addNewTodo();}}> Add item
                        </button>
                </div>
            </div>
        )
    }
}

class ItemList extends React.Component {
    constructor() {
        super()
    }

    render() {
        let displayTodos = this.props.list.map((item, index) => {
            return (
                <ToDoItem doneTodo={(id) => {this.props.doneTodo(id)}}
                index={index}
                item={item.item}
                time={item.time}
                key={index}
                />
                )
        })
        return (
            <ol>
                {displayTodos}
            </ol>
            )
        }
}

class ToDoItem extends React.Component {

    doneTodo(event) {
        let num = event.target.id
        this.props.doneTodo(num)
    }

    render() {
        let time = Moment(this.props.time).fromNow()
        return (
            <div key={this.props.index}>
                <div>
                <p>{this.props.item } being added at {time}</p>
                <button id={this.props.index}
                    onClick={(event) => {
                        this.doneTodo(event);
                    }}>Delete
                </button>
                </div>
            </div>
            )
    }

}

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            list: []
        }
    }

    addToList(newTodo) {
        let todo = { todo: newTodo, time: Moment.now() }
        let updatedList = this.state.list
        updatedList.push(todo)
        let finalResult = { list: updatedList }
        this.setState(finalResult)
    }

    deleteTodo(num) {
        let currentArray = this.state.list
        currentArray.splice(num, 1);
        this.setState( {list: currentArray})
    }

    render() {

        return (
            <div>
                <div>
                    <Form addTodo={(newTodo)=> {this.addToList(newTodo)}} />
                </div>
                <div>
                    <ItemList doneTodo={(num) => {this.deleteTodo(num)}}
                    list={this.state.list} />
                </div>
            </div>
            )

    }

}



// class App extends React.Component {
//     constructor(){
//       super()
// // this.state is smth like a global value that you can access
//       this.state = {
//         currentInput: "",
//         list: [],
//         errorText: ""
//       }
//     }

//     handleClick(){
//       let toDo = this.state.currentInput;
//       if (toDo.length > 1 && toDo.length < 200) {
//         let toDoList = this.state.list;
//         toDoList.push({task: toDo});
//         this.setState({list:toDoList, errorText: ''});
//         this.setState({list: toDoList,currentInput: "", errorMessageToUser: ""});
//       }
//       else {
//         let errorMessageToUser = "The input must be more than 1 letter and maximum of 200 letters as limit!";
//         this.setState({errorText: errorMessageToUser, currentInput: " "});
//       }
//     }
//         //need smth that takes the input and push into a list and show it in a <ul></ul>

//     changeHandler(event){
//         this.setState({currentInput: event.target.value});
//         console.log("change", event.target.value);
//     }

//     deleteItem(event) {
//         let todoItems = this.state.list;
//         todoItems.splice(parseInt(event.target.value), 1);
//         this.setState({list: todoItems});
//     }

//     render() {
//         console.log("rendering");
//         let displayErrorMsg;
//             if (this.state.errorText != "") {
//                 displayErrorMsg = (<p className="warning">{this.state.errorText}</p>);
//             } else {
//                 displayErrorMsg = "";
//             }
//     let listOfToDos = this.state.list.map(list=> {
//         return <div>
//                         <li>{list.task}</li>
//                         <button onClick={(event)=>{this.deleteItem(event)}} >Remove</button>
//                         </div>
//     });
//         return (
//           <div className="item">
//             <input onChange={(event)=>{this.changeHandler(event);}} value = {this.state.currentInput}/>
//             <button onClick={()=>{this.handleClick()}}>Add To List!</button>
//             <div>
//                 <ol>
//             {listOfToDos}
//             {displayErrorMsg}
//                 </ol>
//             </div>
//             <div><ItemList/></div>
//           </div>
//         );
//     }
// }

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