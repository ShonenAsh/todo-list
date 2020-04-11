import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';
import { Todo } from './models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private webReqService: WebRequestService) { }


  getLists() {
    return this.webReqService.get('lists');
  }

  createList(title: string) {
    // We want to send a web request to create a list
    return this.webReqService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${id}`, { title });
  }

  updateTodo(listId: string, todoId: string, title: string) {
    // We want to send a web request to update a list
    return this.webReqService.patch(`lists/${listId}/todos/${todoId}`, { title });
  }

  deleteTodo(listId: string, todoId: string) {
    return this.webReqService.delete(`lists/${listId}/todos/${todoId}`);
  }

  deleteList(id: string) {
    return this.webReqService.delete(`lists/${id}`);
  }

  getTodos(listId: string) {
    return this.webReqService.get(`lists/${listId}/todos`);
  }

  createTodo(title: string, listId: string) {
    // We want to send a web request to create a todo
    return this.webReqService.post(`lists/${listId}/todos`, { title });
  }

  complete(todo: Todo) {
    return this.webReqService.patch(`lists/${todo._listId}/todos/${todo._id}`, {
      completed: !todo.completed
    });
  }
}
