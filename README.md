# Todolist app

This is the basic project for displaying all the todo list item fetched from jsonplaceholder. 




## API Reference

#### Get all Todo List

```https
  GET jsonplaceholder.typicode.com/todos
```

#### Add new Todo Task

```https
  POST jsonplaceholder.typicode.com/todos
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**.  Title to add in the list. |
| `Description`      | `string` | **Required**. Description to add in the list. |
| `userId`      | `number` | **Required**. Id of item to add |

#### Update Todo Task
```https
  PUT jsonplaceholder.typicode.com/todos/${ID}
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Required**.  Title to update in the list. |
| `id`      | `string` | **Required**. id to update in the list. |
| `userId`      | `number` | **Required**. Id of item to update |

#### Delete Todo Task

```https
  DELETE jsonplaceholder.typicode.com/todos/${id}
```
#### add(num1, num2)

Takes two numbers and returns the sum.


## Screenshots

#### Todo List Screen Shot
![App Screenshot](https://snipboard.io/EeWR8J.jpg)

#### Adding New Todo Task
![App Screenshot](https://snipboard.io/t1yDn0.jpg)

#### Update and Delete Todo Task
![App Screenshot](https://snipboard.io/a0YdFP.jpg)
## Tech Stack

**Client:** React, Redux, TailwindCSS



## Run Locally

Clone the project

```bash
  git clone https://github.com/niteenkum/todo-list
```

Go to the project directory

```bash
  cd todo-list
```

Install dependencies

```bash
  Yarn
```

Start the server

```bash
  yarn start
```

# Folder Structure

#### Component
Contain all the components used in Project.

#### Pages
Contain All the pages used in project like Todo List which is homepage,
todo update page, add new todo page.

#### Hooks

Contain useApiCall.ts Hook to call all the requests.

#### utils
Contain constant.ts file which contain baseurl 
