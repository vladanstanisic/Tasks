import React from "react";
import { Table, Button, ButtonGroup, Form } from "react-bootstrap";

import Axios from "../../apis/TasksAxios";

class Tasks extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
      tasks: [],
      sprints:[],
      search: {taskName:"", sprintId: null},
      pageNo: 0, 
      totalPages: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.getTasks(0);
    this.getSprints();
  }

  getSprints() {
    Axios.get('/sprints')
    .then(res => {
      // handle success
      console.log(res);
      this.setState({sprints: res.data});
    })
    .catch(error => {
      // handle error
      console.log(error);
      alert('Error occured please try again!');
    });
}

  searchValueChange(e) {
    let control = e.target;

    let name = control.name
    let value = control.value

    let search = this.state.search

    search[name] = value

    this.setState({search:search})
    console.log(this.state.search)

  }

  getTasks(pageNo) {
    let config = {
      params: {
        pageNo: pageNo
      },
    }

    if (this.state.search.taskName != "") {
      config.params.taskName = this.state.search.taskName;
    }  
    if (this.state.search.sprintId != -1) {
      config.params.sprintId = this.state.search.sprintId;
    }  

    Axios.get('/tasks', config)
    .then(res => {
      // handle success
      console.log(res);
      this.setState({
        tasks: res.data,
        totalPages:res.headers["total-pages"]
      });
    })
    .catch(error => {
      // handle error
      console.log(error);
      alert('Error occured please try again!');
    });
  }

  changeState(taskId) {
    Axios.post('/tasks/' + taskId + 'change_state')
    .then(res => {
        // handle success
        console.log(res.data)
        alert('Task state successfully changed!');
        window.location.reload()
    })
    .catch(error => {
        // handle error
        console.log(error);
        alert('Task state is not changed');
     });
  } 

  delete(taskId) {
    Axios.delete('/tasks/' + taskId)
    .then(res => {
        console.log(res);
        alert("Task is deleted!")
        window.location.reload()
    })
    .catch(error => {
        console.log(error);
        alert("Task is not deleted!")
    })
  }

  edit(taskId) {
    this.props.history.push('/tasks/edit/'+ taskId);
  }

  search() {
    this.getTasks();
  }

  renderTasks() {
    return this.state.tasks.map ((task) => {
      return (
        <tr key={task.id}>
          <td>{task.name}</td>
          <td>{task.employee}</td>
          <td>{task.points}</td>
          <td>{task.stateName}</td>
          <td>{task.sprintName}</td>
          <td>
            <button disabled={task.stateId === 3} className="btn btn-primary" onClick={() => this.changeState(task.id)}>Change state</button>
            <button className="btn btn-success" onClick={() => this.edit(task.id)} style={{ marginLeft: 10 }}>Edit</button>
            <button className="btn btn-danger" onClick={() => this.delete(task.id)} style={{ marginLeft: 10 }}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        <Form>
          <Form.Label htmlFor="tName">Task name</Form.Label><br/>
          <Form.Control id="tName" name="name" type="text" onChange={(e) => this.searchValueChange(e)}/><br/>
          <Form.Label htmlFor="tSprintId">Sprint</Form.Label><br/>
          <Form.Control as="select" id="tSprintId" name="sprintId" onChange={(e) => this.searchValueChange(e)}>
            <option></option>
            {
              this.state.sprints.map((sprint) => {
                return (
                  <option key={sprint.id} value={sprint.id}>
                  {sprint.name}
                  </option>
                )
              })
            }
          </Form.Control><br/>
                    
          <Button style={{ marginTop: "1px" }} className="btn btn-primary" onClick={()=>{this.search();}}>Search</Button>
        </Form>
  

        {/*Deo za prikaz Task-a*/}
        <ButtonGroup style={{ marginTop: 25, float:"right"}}>
          <Button 
            style={{ margin: 3, width: 90}}
            disabled={this.state.pageNo==0} onClick={() =>this.getTasks(this.state.pageNo = this.state.pageNo - 1)}>
            Previous
          </Button>
          <Button
            style={{ margin: 3, width: 90}}
            disabled={this.state.pageNo==this.state.totalPages-1}  onClick={() =>this.getTasks(this.state.pageNo = this.state.pageNo + 1)}>
            Next
          </Button>
        </ButtonGroup>

        <Table bordered striped style={{ marginTop: 5 }}>
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Employees</th>
              <th>Points</th>
              <th>State</th>
              <th>Sprint</th>
              <th colSpan={2}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTasks()}
          </tbody>
        </Table>
        </div>
    );
  }
}

export default Tasks;
