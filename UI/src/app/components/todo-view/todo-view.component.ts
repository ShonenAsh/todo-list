import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.scss']
})
export class TodoViewComponent implements OnInit {

  lists: List[];
  todos: Todo[];

  selectedListId: string;

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params.listId) {
          this.selectedListId = params.listId;
          this.todoService.getTodos(params.listId).subscribe((todos: Todo[]) => {
            this.todos = todos;
          })
        } else {
          this.todos = undefined;
        }
      }
    )

    this.todoService.getLists().subscribe((lists: List[]) => {
      this.lists = lists;
    })
    
  }

  onTodoClick(todo: Todo) {
    // we want to set the todo to completed
    this.todoService.complete(todo).subscribe(() => {
      // the todo has been set to completed successfully
      console.log("Completed successully!");
      todo.completed = !todo.completed;
    })
  }

  onDeleteListClick() {
    this.todoService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTodoClick(id: string) {
    this.todoService.deleteTodo(this.selectedListId, id).subscribe((res: any) => {
      this.todos = this.todos.filter(val => val._id !== id);
      console.log(res);
    })
  }

}
