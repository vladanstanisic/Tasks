import React from "react";
import { Table, Button, ButtonGroup, Form, Collapse } from "react-bootstrap";

import Axios from "../../apis/TasksAxios";

class Tasks extends React.Component {
  constructor(props){
    super(props);

    let task = {
      name: "",
      employee: "",
      points: "",
      sprintId: -1,
    };

    this.state = {
      task: task,
      tasks: [],
      sprints: [],
      showSearch: false,
      search: { taskName: "", sprintId: -1 },
      pageNo: 0,
      totalPages: 1,
      sprintSum:""
    };
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    await this.getTasks(0);
    await this.getSprints();
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

  async doAdd() {
    try {
      await Axios.post("/tasks/", this.state.task);

      let task = {
        name: "",
        employee: "",
        points: 0,
        sprintId: -1,
      };
      this.setState({ task: task });

      this.getTasks();
    } catch (error) {
      alert("Nije uspelo dodavanje.");
    }
  }

  addValueInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let task = this.state.task;
    task[name] = value;

    this.setState({ task: task });
  }

  searchValueInputChange(event) {
    let control = event.target;

    let name = control.name;
    let value = control.value;

    let search = this.state.search;
    search[name] = value;

    this.setState({ search: search });
  }

  async getTasks(pageNo) {
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

  canCreateTask(){
    const task = this.state.task
    return task.name!="" && 
      (task.points!="" && task.points>=0 && task.points<=20 && task.points%1==0)
       && task.sprintId != -1
  }

  changeState(taskId) {
    Axios.post(`/tasks/${taskId}/change_state`)
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

  doSearch() {
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
            {window.localStorage['role']=="ROLE_ADMIN"?[<button className="btn btn-success" onClick={() => this.edit(task.id)} style={{ marginLeft: 10 }}>Edit</button>,
            <button className="btn btn-danger" onClick={() => this.delete(task.id)} style={{ marginLeft: 10 }}>Delete</button>]:null}
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>
        {/*Deo za ADD*/}
        {window.localStorage['role']=="ROLE_ADMIN"?
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="name"
              value={this.state.task.name}
              as="input"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Employee</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="employee"
              value={this.state.task.employee}
              as="input"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Points</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="points"
              value={this.state.task.points}
              as="input"
              type="number"
              min = "0"
              step = "1"
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              onChange={(event) => this.addValueInputChange(event)}
              name="sprintId"
              value={this.state.task.sprintId}
              as="select"
            >
              <option value={-1}></option>
              {this.state.sprints.map((sprint) => {
                return (
                  <option value={sprint.id} key={sprint.id}>
                    {sprint.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button disabled = {!this.canCreateTask()} variant="primary" onClick={() => this.doAdd()}>
            Add
          </Button>
        </Form>:null}

        {/*Deo za pretragu Task-a*/}
        <Form.Group style={{marginTop:35}}>
          <Form.Check type="checkbox" label="Show search form" onClick={(event) => this.setState({showSearch: event.target.checked})}/>
        </Form.Group>
        <Collapse in={this.state.showSearch}>
        <Form style={{marginTop:10}}>
          <Form.Group>
            <Form.Label>Task name</Form.Label>
            <Form.Control
              value={this.state.search.taskName}
              name="taskName"
              as="input"
              onChange={(e) => this.searchValueInputChange(e)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Sprint</Form.Label>
            <Form.Control
              onChange={(event) => this.searchValueInputChange(event)}
              name="sprintId"
              value={this.state.search.sprintId}
              as="select"
            >
              <option value={-1}></option>
              {this.state.sprints.map((sprint) => {
                return (
                  <option value={sprint.id} key={sprint.id}>
                    {sprint.name}
                  </option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Button onClick={() => this.doSearch()}>Search</Button>
        </Form>
        </Collapse>
  

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
