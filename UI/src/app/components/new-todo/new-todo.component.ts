import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo.model';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss']
})
export class NewTodoComponent implements OnInit {

  constructor(private todoService: TodoService, private route: ActivatedRoute, private router: Router) { }

  listId: string;
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
      }
    )
  }

  createTodo(title: string) {
    this.todoService.createTodo(title, this.listId).subscribe((newTodo: Todo) => {
      this.router.navigate(['../'], { relativeTo: this.route });
    })
  }

}
