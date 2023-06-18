# Todo App

## Description

Todo App is a web application that allows users to manage their tasks and todos. Users can add tasks, mark tasks as complete, delete tasks, and change the view mode of the task list.

## Table of Contents

- [Todo App](#todo-app)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
    - [Add Task](#add-task)
    - [Mark Task as Complete](#mark-task-as-complete)
    - [Delete Task](#delete-task)
    - [Change View Mode](#change-view-mode)
  - [Technologies Used](#technologies-used)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

1. Clone the repository to your local machine.
2. Install the required dependencies by running the command `npm install`.
3. Start the development server using the command `npm start`.

## Usage

To use the Todo App:

1. Open the application in your web browser.
2. Register for a new account or log in with your existing credentials.
3. Once logged in, you will be redirected to the task management dashboard.
4. Add new tasks by filling in the task details and clicking the "Add Task" button.
5. To mark a task as complete, click the checkbox next to the task.
6. To delete a task, click the delete button associated with the task.
7. Use the view mode toggle to switch between different task list display modes.

## Features

### Add Task

- Description: Allows users to add a new task to their task list.
- Usage: Fill in the task details (title, description, etc.) and click the "Add Task" button.
- Code: The `addTask` function in `path/to/taskSlice.js` handles adding a task. It updates the state by appending the new task to the existing list of tasks.

### Mark Task as Complete

- Description: Enables users to mark a task as complete.
- Usage: Click the checkbox next to the task to mark it as complete.
- Code: The `completeTask` function in `path/to/taskSlice.js` is responsible for marking a task as complete. It updates the `completed` property of the selected task to `true`, indicating that the task is completed.

### Delete Task

- Description: Allows users to delete a task from their task list.
- Usage: Click the delete button associated with the task to remove it.
- Code: The `deleteTask` function in `path/to/taskSlice.js` handles the deletion of a task. It filters out the selected task from the list of tasks, effectively removing it from the state.

### Change View Mode

- Description: Enables users to switch between different task list display modes.
- Usage: Use the view mode toggle to select the desired view mode (e.g., list, grid, etc.).
- Code: The `changeViewMode` function in `path/to/taskSlice.js` updates the `viewMode` property in the state, allowing the user interface to switch between different task list display modes.

## Technologies Used

- React
- React Bootstrap
- Redux
- Redux Toolkit
- React Router
- Redux Persist

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
