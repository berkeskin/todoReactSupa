import { useState } from 'react';
import './styles.css'; // CSS dosyasını ekliyoruz

export default function TodoList() {
  const [todos, setTodoList] = useState([
    { id: 1, title: 'BUGÜN KENDİN İÇİN BİR ŞEYLER YAP!', completed: false, edit: false, timestamp: new Date().toLocaleString() },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [newId, setNewId] = useState(2);
  const [editTodoInput, setEditTodoInput] = useState('');

  function addTodo() {
    const newTodoItem = {
      id: giveId(),
      title: newTodo,
      completed: false,
      edit: false,
      timestamp: new Date().toLocaleString(),
    };

    setTodoList([...todos, newTodoItem]);
    setNewTodo('');
  }

  function giveId() {
    setNewId(newId + 1);
    return newId;
  }

  function changeTodo(todoId) {
    setTodoList(
      todos.map((x) => (x.id == todoId ? { ...x, completed: !x.completed } : x))
    );
  }

  function deleteTodo(todoId) {
    const updateTodoList = todos.filter((x) => x.id !== todoId);
    setTodoList(updateTodoList);
  }

  function saveEditTodo(todoId) {
    const updateTodoList = todos.map((todo) =>
      todo.id == todoId ? { ...todo, title: editTodoInput, edit: false, timestamp: new Date().toLocaleString() } : todo
    );
    setTodoList(updateTodoList);
  }

  function editTodo(todoId) {
    const updateTodos = todos.map((todo) =>
      todo.id == todoId ? { ...todo, edit: true } : todo
    );
    setTodoList(updateTodos);
  }
  console.log(todos);
  return (
    <div className="todo-container">
      <input
        type='text'
        placeholder='Yapman Gereken Görevi Yaz.'
        value={newTodo}
        onChange={(e) => {
          setNewTodo(e.target.value);
        }}
      />
      <button onClick={addTodo}>Görev Ekle</button>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.edit ? (
              <input
                type='text'
                placeholder='Düzenlediğin Görevi Gir.'
                onChange={(e) => setEditTodoInput(e.target.value)}
              />
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                  }}
                  onClick={() => changeTodo(todo.id)}
                >
                  {todo.title}
                </span>
                <span className="timestamp">{todo.timestamp}</span>
              </>
            )}

            <button
              onClick={() => deleteTodo(todo.id)}
            >
              Sil
            </button>
            {todo.edit ? (
              <button onClick={() => saveEditTodo(todo.id)}>Kaydet</button>
            ) : (
              <button onClick={() => editTodo(todo.id)}>Düzenle</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
