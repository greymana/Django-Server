// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";

import Modal from "./components/modal";
import axios from "axios";

const token = "d3e1373ed18628323b03a636b9f577e03444b816";
const headers = {
  Authorization: "Token d3e1373ed18628323b03a636b9f577e03444b816",
  'Content-Type': 'application/json',
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffStatus: false,
      userList:[],
      modal: false,
      activeUser: {
        username: "",
        email: "",
        is_staff: false,
      },
    };
  }
  componentDidMount(){
    this.refreshList();
  }

  refreshList = () => {
    axios.get("/users/")
    .then((res)=>this.setState({userList:res.data}))
    .catch((err)=>console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (user) => {
    this.toggle();

    if(user.id){
      axios.put("/users/${user.id}/", user, {headers})
      .then((res)=>this.refreshList());
      return;
    }
    axios.post("/users/", user, {headers})
    .then((res)=>this.refreshList());
  };

  handleDelete = (user) => {
    axios.delete("/users/${user.id}/", {headers})
    .then((res)=>this.refreshList());
  };

  createUser = () => {
    const user = { username: "", email: "", is_staff: false };

    this.setState({ activeUser: user, modal: !this.state.modal });
  };

  editUser = (user) => {
    this.setState({ activeUser: user, modal: !this.state.modal });
  };

  displayStaffStatus = (status) => {
    if (status) {
      return this.setState({ staffStatus: true });
    }

    return this.setState({ staffStatus: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.staffStatus ? "nav-link active" : "nav-link"}
          onClick={() => this.displayStaffStatus(true)}
        >
          is a staff
        </span>
        <span
          className={this.state.staffStatus ? "nav-link" : "nav-link active"}
          onClick={() => this.displayStaffStatus(false)}
        >
          not a staff
        </span>
      </div>
    );
  };

  renderUsers = () => {
    const { staffStatus } = this.state;
    const newUsers = this.state.userList.filter(
      (user) => user.is_staff == staffStatus
    );

    return newUsers.map((user) => (
      <li
        key={user.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.staffStatus ? "completed-todo" : ""
          }`}
          title={user.username}
        >
          {user.username}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editUser(user)}

          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(user)}

          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-white text-uppercase text-center my-4">User app</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createUser}

                >
                  Add User
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderUsers()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeUser={this.state.activeUser}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
      </main>
    );
  }
}

export default App;