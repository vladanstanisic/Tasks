import axios from 'axios';

var TasksAxios = axios.create({
  baseURL: 'http://localhost:8080/api',
  
});

export default TasksAxios;