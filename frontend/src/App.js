import React from 'react';
import './App.css';


class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            allTasks: [],
            todoTasks: [],
            inProgressTasks: [],
            readyToVerifyTasks: [],
            doneTasks: [],
            activeTask: {
                id: null,
                title: '',
                description: '',
                status: 0,
                planned_ords: null,
                real_ords: null,
                storypoints: null
            }
        }
        this.fetchTasks = this.fetchTasks.bind(this)
        this.getCookie = this.getCookie.bind(this)
    }
  componentWillMount() {
    this.fetchTasks()
  }

    getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

assignTasks(){
        let todoTasks = []
        let inProgressTasks = []
        let readyToVerifyTasks = []
        let doneTasks = []
                //     this.setState({
                //     todoTasks: [...this.state.todoTasks, this.state.allTasks[i]]
                // }, () => console.log("W SRODKU", this.state.todoTasks))
        for(let i=0; i < this.state.allTasks.length; i++){
            if(this.state.allTasks[i]["status"] === 0){
                todoTasks.push(this.state.allTasks[i])
            }else if(this.state.allTasks[i]["status"] === 1){
                inProgressTasks.push(this.state.allTasks[i])
            }else if(this.state.allTasks[i]["status"] === 2){
                readyToVerifyTasks.push(this.state.allTasks[i])
            }else if(this.state.allTasks[i]["status"] === 3){
                doneTasks.push(this.state.allTasks[i])
            }
        }
        this.setState({
            todoTasks: todoTasks,
            inProgressTasks: inProgressTasks,
            readyToVerifyTasks: readyToVerifyTasks,
            doneTasks: doneTasks
        })
}

  fetchTasks(){
    console.log("Fetching...")

    fetch("http://127.0.0.1:8000/api/tasks-list/")
        .then(response => response.json())
        .then(data =>
            this.setState(
    {
            allTasks: data,
        },
    () => {
        this.assignTasks()
        }
        )

        )
  }

  createCard(text){
        console.log("Creating task")
        return <div className="card mb-3 bg-light">
            <div className="card-body p-3">
                <div className="float-right mr-n2">
                    <label className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input"/>
                        <span className="custom-control-label"></span>
                    </label>
                </div>
                <p>{text}</p>
                <div className="float-right mt-n1">
                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png" width="32"
                         height="32" className="rounded-circle" alt="Avatar"/>
                </div>
                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
            </div>
        </div>
  }

    render(){
        var todoTasks = this.state.todoTasks
        var inProgressTasks = this.state.inProgressTasks
        var readyToVerifyTasks = this.state.readyToVerifyTasks
        var doneTasks = this.state.doneTasks
        var self = this

        return(
            <main className="content">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
                      integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N"
                      crossOrigin="anonymous"/>
                <div className="container p-0">
                    <h1 className="h3 mb-3">Sprint Manager</h1>

                    <div className="row">
                        <div className="col-12 col-lg-6 col-xl-3">
                            <div className="card card-border-primary">
                                <div className="card-header">
                                    <span className="h5 card-title">Todo</span>
                                    <a href="#" className="btn btn-primary float-right">Add</a>
                                </div>
                                <div className="card-body p-3">
                                    {todoTasks.map(function(task, i){
                                        return self.createCard(task.title);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-3">
                            <div className="card card-border-warning">
                                <div className="card-header">
                                    <span className="h5 card-title">In Progress</span>
                                    <a href="#" className="btn btn-primary float-right">Add</a>
                                </div>
                                <div className="card-body">
                                    {inProgressTasks.map(function(task, i){
                                        return self.createCard(task.title);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-3">
                            <div className="card card-border-danger">
                                <div className="card-header">
                                    <span className="h5 card-title">Ready to verify</span>
                                    <a href="#" className="btn btn-primary float-right">Add</a>
                                </div>
                                <div className="card-body">

                                    {readyToVerifyTasks.map(function(task, i){
                                        return self.createCard(task.title);
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-3">
                            <div className="card card-border-success">
                                <div className="card-header">
                                    <span className="h5 card-title">Done</span>
                                    <a href="#" className="btn btn-primary float-right">Add</a>
                                </div>
                                <div className="card-body">
                                    {doneTasks.map(function(task, i){
                                        return self.createCard(task.title);
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

        )
    }


}

export default App;
