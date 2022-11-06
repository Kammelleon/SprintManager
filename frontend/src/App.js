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
                todoTasks.push({...this.state.allTasks[i]})
            }else if(this.state.allTasks[i]["status"] === 1){
                inProgressTasks.push({...this.state.allTasks[i]})
            }else if(this.state.allTasks[i]["status"] === 2){
                readyToVerifyTasks.push({...this.state.allTasks[i]})
            }else if(this.state.allTasks[i]["status"] === 3){
                doneTasks.push({...this.state.allTasks[i]})
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
    drop = (e) => {
          e.preventDefault();
          const div_id = e.dataTransfer.getData("div_id");
          var task_id = div_id.replace(/\D/g, "");
          for(let i=0; i < this.state.allTasks.length; i++){
              if(task_id === String(this.state.allTasks[i]["id"])){
                  console.log("Znaleziono taska:",this.state.allTasks[i])
                  var task_to_change = this.state.allTasks[i]
              }
          }
          const block = document.getElementById(div_id);
          let dropIndex = Array.from(e.target.children).findIndex(
            (child) => child.getBoundingClientRect().bottom > e.clientY
          );
          if (dropIndex === -1) {
            e.target.appendChild(block);
          } else {
            e.target.insertBefore(block, e.target.children[dropIndex]);
          }
          console.log("Target ID:", e.target.id)
          var new_task_status = e.target.id.replace(/\D/g, "");
          var url = `http://127.0.0.1:8000/api/task-update/${task_to_change["id"]}/`
          console.log("Task to change before:", task_to_change)
          task_to_change["status"] = Number(new_task_status)
          console.log("Task to change after:", task_to_change)
          var csrf_token = this.getCookie('csrftoken')
          fetch(url, {
            method: 'POST',
            headers: {
              'Content-type':'application/json',
              'X-CSRFToken': csrf_token

            },
            body: JSON.stringify(task_to_change)
          })
        };

    dragOver1 = (e) => {
          e.preventDefault();
        };

    dragStart = (e) => {
          const target = e.target;
          e.dataTransfer.setData("div_id", target.id);
        };

    dragOver = (e) => {
          e.stopPropagation();
        };

  createCard(text, task_id){
        var id_text = "task-id-"+String(task_id);
        return <div id={id_text} className="card mb-3 bg-light" draggable
                onDragStart={this.dragStart}
                onDragOver={this.dragOver}>
            <div className="card-body p-3">
                <p>{text}</p>
                <div className="float-right mt-n1">
                    <img src="https://bootdey.com/img/Content/avatar/avatar4.png" width="32"
                         height="32" className="rounded-circle" alt="Avatar"/>
                </div>
                <a className="btn btn-outline-primary btn-sm" href="#">View</a>
            </div>
        </div>
  }
  handleSubmit(e){
        e.preventDefault()
        var csrf_token = this.getCookie('csrftoken')
        var url = 'http://127.0.0.1:8000/api/task-create/'
  }
  showTaskCreator(){
        document.getElementById("overlay").style.display = "block";
  }
  hideTaskCreator(){
        document.getElementById("overlay").style.display = "none";
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
                        <div id="overlay">
                            <div className="mt-5 card card-border-primary text-center col-sm-6 mx-auto col-lg-3">
                                <div id="task-creator">
                                    <h4 className="task-creator-header">Create task</h4>
                                    <hr/>
                                    <p>Title</p>
                                    <input type="text" placeholder="Title..."/>
                                    <p>Description</p>
                                    <textarea type="text" placeholder="Description..."></textarea>
                                    <p>Planned ORDs</p>
                                    <input type="number"/>
                                    <p>Storypoints</p>
                                    <input type="number"/>
                                    <p>Real ORDs</p>
                                    <input type="number"/>

                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-6 col-xl-3">
                            <div className="card card-border-primary">
                                <div className="card-header">
                                    <span className="h5 card-title">Todo</span>
                                    <button onClick={this.showTaskCreator} className="btn btn-primary float-right">Add</button>
                                </div>
                                <div id="0-tasks" className="card-body p-3" onDrop={this.drop} onDragOver={this.dragOver1}>
                                    {todoTasks.map(function(task, i){
                                        return self.createCard(task.title, task.id);
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
                                <div id="1-tasks" className="card-body"  onDrop={this.drop} onDragOver={this.dragOver1}>
                                    {inProgressTasks.map(function(task, i){
                                        return self.createCard(task.title, task.id);
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
                                <div id="2-tasks" className="card-body" onDrop={this.drop} onDragOver={this.dragOver1}>

                                    {readyToVerifyTasks.map(function(task, i){
                                        return self.createCard(task.title, task.id);
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
                                <div id="3-tasks" className="card-body" onDrop={this.drop} onDragOver={this.dragOver1}>
                                    {doneTasks.map(function(task, i){
                                        return self.createCard(task.title, task.id);
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
