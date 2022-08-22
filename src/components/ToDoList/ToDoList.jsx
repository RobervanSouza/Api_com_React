import { useState, useEffect } from 'react';
import { LabelInputButton } from '../LabelInputButton/LabelInputButton';
import { TodoServices } from '../../helpers/TodoServices';

export function ToDoList() {
  // Task list (todoList.map(()=>())
  const [todoList, setTodoList] = useState([]);

  const [todo, setTodo] = useState({
    todo_id: '',
  });

  const [newTodoList, setNewTodoList] = useState({
    text: '',
  });

  const [showEditForm, setShowEditForm] = useState(false);

  const [newEditedTodoTask, setNewEditedTodoTask] = useState({
    text: '',
    id: '',
  });

  const [showDeleteAsk, setShowDeleteAsk] = useState(false);

  async function Create(todo) {
    const novaTodo = TodoServices.create(todo);
    window.location.reload(true);
    // setTodoList([novaTodo]);
    // readTaskById([novaTodo.id])
  }

  const handleSetTodoCriar = (event) => {
    setNewTodoList({
      ...newTodoList,
      [event.target.name]: event.target.value,
    });
  };
  const handleCreateTodo = () => {
    const todoBeingCreated = { ...newTodoList };
    Create(todoBeingCreated);
    setNewTodoList({
      text: '',
    });
  };

  async function readAllTasks() {
    const todos = await TodoServices.getList();
    setTodoList(todos);
  }
  useEffect(() => {
    readAllTasks();
  }, []);

  async function readTaskById(id) {
    // console.log("API return: ", todo);
    const todo = await TodoServices.getById(id);
    setTodoList([todo]);
  }
  const handleSearchClickButton = (event) => {
    const searchTodo_id = todo.todo_id;
    readTaskById(searchTodo_id);
  };
  const handleSetTodo = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const onChangeInputEdit = (event) => {
    setNewEditedTodoTask({
      ...newEditedTodoTask,
      // [event.target.name]: event.target.value
      text: event.target.value,
    });
    console.log(event.target.name);
  };
  async function editTodo(id, editedTodo) {
    const response_editedTodo = await TodoServices.updateById(id, editedTodo);
    setNewEditedTodoTask({ ...response_editedTodo });
  }
  const onClickButtonEdit = (event) => {
    console.log(event.target.id);
    const editedTodo = { ...newEditedTodoTask };
    const id = editedTodo.id;
    console.log(id);
    delete editedTodo.id;
    setShowEditForm(false);
    editTodo(id, editedTodo);
    window.location.reload(true);
  };

  async function deleteTodo(id) {
    const responseFromDelete = await TodoServices.deleteById(id);
  }
  const whenClickDelete = (e) => {
    setShowDeleteAsk(true);
    setTodo({ todo_id: e.target.id });
  };
  const pleaseDeleteIt = () => {
    deleteTodo(todo.todo_id);
    window.location.reload(true);
  };

  return (
    <div>
      <a className="button-home" href="http://localhost:3000/">
        <button type="button" className="button">
          HOME
        </button>
      </a>

      <LabelInputButton
        classNameDiv="adicionar"
        classNameLabel="adicionar-text"
        htmlForLabel="criar_todo"
        labelText="Nova Tarefa:"
        classNameInput="input"
        idInput="criar_todo"
        onChangeInput={handleSetTodoCriar}
        inputValue={newTodoList.text}
        onClickButton={handleCreateTodo}
        nameInput="text"
        buttonText="Adicionar"
      />

      <div className="button-label-input procurar">
        <label htmlFor="pesquisar_todo" className="button-label procurar-text">
          Pesquise sua terefa por ID
        </label>
        <input
          type="text"
          className="input"
          id="pesquisar_todo"
          onChange={handleSetTodo}
          name="todo_id"
          // value={todo.todo_id}
          // value={newTodoList.text}
        />
        <button
          type="button"
          className="button"
          onClick={handleSearchClickButton}
        >
          Pesquisar
        </button>
      </div>

      {showEditForm ? (
        <div className={'button-label-input update'}>
          <label htmlFor="update_todo" className={'button-label'}>
            Adicione Suas Alterações:
          </label>
          <input
            type="text"
            className="input"
            id="update_todo"
            onChange={onChangeInputEdit}
            name="text"
            value={newEditedTodoTask.text}
            // value={newTodoList.text}
          />
          <button
            id={todoList.id}
            type="button"
            className="button-blue"
            onClick={onClickButtonEdit}
          >
            Editar.
          </button>
        </div>
      ) : null}

      {showDeleteAsk ? (
        <div className={'button-label-input update'}>
          <span className={'button-label'}>
            Deseja excluir a terefa da lista?
          </span>
          <button className="button-red" onClick={pleaseDeleteIt}>
            Sim
          </button>
        </div>
      ) : null}

      <div className="readAllMap">
        {todoList.map((todo, index) => (
          <div className="todoListReadAll" key={index}>
            <input type="checkbox" />
            <span className="todo-text">
              {todo.text} ~ ID: "{todo.id}"
            </span>
            <button
              className="button-blue-map"
              onClick={() => {
                setShowEditForm(true);
                setNewEditedTodoTask({ ...newEditedTodoTask, id: todo.id });
              }}
            >
              Editar
            </button>
            <button
              className="button-red-map"
              type="button"
              id={todo.id}
              onClick={whenClickDelete}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
