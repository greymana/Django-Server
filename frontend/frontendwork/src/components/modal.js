import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

export default class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUser: this.props.activeUser,
    };
  }

  handleChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "checkbox") {
      value = e.target.checked;
    }

    const activeUser = { ...this.state.activeUser, [name]: value };

    this.setState({ activeUser });
  };

  render() {
    const { toggle, onSave } = this.props;

    return (
      <Modal isOpen={true} toggle={toggle}>
        <ModalHeader toggle={toggle}>User List</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="user-username">username</Label>
              <Input
                type="text"
                id="user-username"
                name="username"
                value={this.state.activeUser.username}
                onChange={this.handleChange}
                placeholder="Enter User username"
              />
            </FormGroup>
            <FormGroup>
              <Label for="user-email">Email</Label>
              <Input
                type="email"
                id="user-email"
                name="email"
                value={this.state.activeUser.email}
                onChange={this.handleChange}
                placeholder="Enter User's email"
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="is_staff"
                  checked={this.state.activeUser.is_staff}
                  onChange={this.handleChange}
                />
                Is staff
              </Label>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="success"
            onClick={() => onSave(this.state.activeUser)}
          >
            Save
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}