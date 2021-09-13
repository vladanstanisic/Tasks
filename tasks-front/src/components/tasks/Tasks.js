import React from "react";
import { Table, Button, ButtonGroup } from "react-bootstrap";

import Axios from "../../apis/TasksAxios";

class Tasks extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
        tasks: [],
        sprints:[],
        search: {name:"", sprintId: null},
        pageNo: 0, 
        totalPages: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.getTasks(0);
  }

  getTasks(pageNo) {
    let config = {
        params: {
            pageNo: pageNo
        },
      }

    Axios.get('/tasks', config)
        .then(res => {
             // handle success
             console.log(res);
             this.setState({
                tasks: res.data,
                totalPages:res.headers["total-pages"]});
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

  renderTasks() {
    return this.state.tasks.map ((task) => {
        return (
            <tr key={task.id}>
                <td>{task.name}</td>
                <td>{task.employee}</td>
                <td>{task.points}</td>
                <td>{task.stateName}</td>
                <td>{task.sprintName}</td>
                <td><button disabled={task.stateId === 3} className="btn btn-primary" onClick={() => this.changeState(task.id)}>Change state</button>
                    <button className="btn btn-success" onClick={() => this.edit(task.id)} style={{ marginLeft: 10 }}>Edit</button>
                    <button className="btn btn-danger" onClick={() => this.delete(task.id)} style={{ marginLeft: 10 }}>Delete</button></td>
            </tr>
        )
    })
  }

  render() {
    return (
      <div>
        <h1>Tasks</h1>

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
