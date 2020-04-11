import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { NewListComponent } from './components/new-list/new-list.component';
import { NewTodoComponent } from './components/new-todo/new-todo.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SignupPageComponent } from './components/signup-page/signup-page.component';
import { EditListComponent } from './components/edit-list/edit-list.component';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

const routes: Routes = [
  { path: '', redirectTo: '/lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'edit-list/:listId', component: EditListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'lists', component: TodoViewComponent },
  { path: 'lists/:listId', component: TodoViewComponent },
  { path: 'lists/:listId/new-todo', component: NewTodoComponent },
  { path: 'lists/:listId/edit-todo/:todoId', component: EditTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
