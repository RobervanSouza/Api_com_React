import { Api } from './Api';

const parseResponse = (response) => response.json();

export const TodoServices = {
  getList: () => fetch(Api.todo(), { method: 'GET' }).then(parseResponse),
  getById: (id) =>
    fetch(Api.todoById(id), { method: 'GET' }).then(parseResponse),
  create: (todo) =>
    fetch(Api.todo(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(todo),
    }).then(parseResponse),

  updateById: (id, editedTodo) =>
    fetch(Api.todoById(id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(editedTodo),
    }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.todoById(id), { method: 'DELETE' }).then(parseResponse),
};
