import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  FormControl,
  InputGroup,
  ToggleButtonGroup,
  ToggleButton,
  Modal,
  Alert,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  changeViewMode,
  completeTask,
  deleteTask,
} from "../redux/features/taskSlice";

let tasksPerPage = 2;
const TodoListPage = () => {
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [taskState, setTaskState] = useState([]); // State to store the current tasks
  const [currentPage, setCurrentPage] = useState(1); // State to store the current page number
  const [modalDetail, setModalDetail] = useState({
    // State to store the modal details
    isVisible: false,
    title: "",
    description: "",
    id: "",
  });

  const [newTask, setNewTask] = useState({
    // State to store the new task details
    title: "",
    description: "",
    error: "",
  });

  const {
    authReducer: { user }, // User information from the Redux store
    taskReducer: { viewMode, tasks, taskUpdated }, // Task information from the Redux store
  } = useSelector((state) => state); // Accesses the Redux store and extracts the user and task information

  const dispatch = useDispatch(); // Accesses the dispatch function from Redux

  useEffect(() => {
    // Updates the taskState when the tasks or currentPage change
    if (tasks[user] && tasks[user]?.length !== 0) {
      let tasksArr = tasks[user]?.slice(0, currentPage * tasksPerPage);
      setTaskState(tasksArr);
    } else {
      setTaskState([]);
    }
  }, [tasks[user]?.length, currentPage, tasksPerPage, taskUpdated]);

  const handleTitleChange = (e) => {
    // Updates the title of the new task
    setNewTask((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };

  const handleDescriptionChange = (e) => {
    // Updates the description of the new task
    setNewTask((prev) => ({
      ...prev,
      description: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    // Handles the submission of a new task
    e.preventDefault();
    if (newTask.title.trim() === "") {
      // Validates if the title is empty
      return setNewTask((prev) => ({
        ...prev,
        error: "Please Provide Title of the tasks",
      }));
    }

    if (newTask?.title?.length < 10) {
      // Validates if the title is
      return setNewTask((prev) => ({
        ...prev,
        error: "Title should be minimum of 10 Character",
      }));
    }

    const { error, ...others } = newTask;

    const id = Date.now();

    dispatch(addTask({ ...others, id: `ID_${id}`, user })); // Dispatches the addTask action with the new task details

    setNewTask({ title: "", description: "", error: "" }); // Resets the new task form
  };

  const handleSearch = (e) => {
    // Handles the change in the search term
    setSearchTerm(e.target.value);
  };

  const handleViewModeChange = (value) => {
    // Handles the change in the view mode (list/grid)
    dispatch(changeViewMode(value)); // Dispatches the changeViewMode action
  };

  const handleClose = () => {
    // Closes the task modal
    setModalDetail({
      isVisible: false,
      title: "",
      description: "",
    });
  };

  const showModal = (value) => {
    // Shows the task modal with the provided task details
    setModalDetail({
      isVisible: true,
      title: value?.title || "",
      description: value?.description || "",
      id: value?.id,
    });
  };

  const handleDelete = () => {
    // Handles the deletion of a task
    dispatch(
      deleteTask({
        user,
        id: modalDetail?.id,
      })
    );

    handleClose(); // Closes the task modal
  };

  const onSearch = () => {
    // Performs the search operation based on the search term
    if (tasks[user] && tasks[user]?.length > 0) {
      if (searchTerm === "") {
        let tasksArr = tasks[user]?.slice(0, currentPage * tasksPerPage);
        return setTaskState(tasksArr);
      }

      let filteredArr = tasks[user]?.filter(
        (task) =>
          task?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task?.description.toLowerCase().includes(searchTerm.toLowerCase())
      );

      setTaskState(filteredArr || []);
    }
  };

  const handleComplete = (id) => {
    // Handles the completion of a task
    dispatch(
      completeTask({
        user,
        id,
      })
    );

    setTimeout(() => {
      dispatch(
        deleteTask({
          user,
          id,
        })
      );
    }, 30000); // Calls handleDelete after a delay of 30 second
  };

  const renderTasks = () => {
    // Renders the list of tasks
    if (taskState?.length === 0) {
      return <p>No tasks found.</p>; // Displays a message when no tasks are found
    }

    return (
      <div
        className={`list-container ${viewMode === "grid" ? "grid-view" : ""} `}
      >
        {taskState?.map((ele, index) => (
          <div className={`list`} key={ele?.id?.toString()}>
            <div className="heading">
              {" "}
              <div className="left">
                <input
                  type={"checkbox"}
                  value={ele.completed ? true : false}
                  onChange={() => handleComplete(ele?.id)}
                />{" "}
                <h3
                  className={`taskTitle ${ele?.completed ? "completed" : ""}`}
                >
                  {ele?.title || ""}
                </h3>
              </div>
              <div onClick={() => showModal(ele)} className="delete-icon">
                <img src={require("../assets/delete.png")} alt="delete" />
              </div>
            </div>
            <p className="elipsed-text mb-0">{ele?.description}</p>
          </div>
        ))}
      </div>
    );
  };

  const LoadMore = () => {
    // Loads more tasks on clicking the Load More button
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Container className="min-vh-100">
      <Row>
        <Col xs={12} md={4}>
          <h2 className="title">Add Task</h2>
          {newTask?.error && <Alert variant="danger">{newTask?.error}</Alert>}
          <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={newTask?.title}
                onChange={handleTitleChange}
              />
            </Form.Group>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={newTask?.description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Add Task
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={8}>
          <div>
            <h2 className="title">Tasks List</h2>

            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <InputGroup style={{ maxWidth: "300px" }}>
                  <FormControl
                    placeholder="Search Tasks"
                    value={searchTerm}
                    onChange={handleSearch}
                    aria-label="Search Tasks"
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={onSearch}
                    className="rounded-end"
                  >
                    Search
                  </Button>
                </InputGroup>
              </div>

              <div>
                <ToggleButtonGroup
                  type="radio"
                  name="radio"
                  value={viewMode}
                  onChange={handleViewModeChange}
                >
                  <ToggleButton id="tbg-btn-1" value={"list"}>
                    <img
                      className="icon"
                      src={require("../assets/list.png")}
                      alt="List View"
                    />
                  </ToggleButton>
                  <ToggleButton id="tbg-btn-2" value={"grid"}>
                    <img
                      className="icon"
                      src={require("../assets/grid.png")}
                      alt="Grid View"
                    />
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
            </div>
          </div>

          <div className="list-main-container">{renderTasks()}</div>

          {tasks[user] && tasks[user]?.length !== taskState.length && (
            <Button onClick={() => LoadMore()}>Load More</Button>
          )}
        </Col>
      </Row>

      <Modal show={modalDetail?.isVisible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalDetail?.title || ""}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalDetail?.description || ""}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TodoListPage;
