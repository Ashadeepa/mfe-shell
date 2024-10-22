import { Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { TodosFilter, TodosStore } from './todo/todos.store';
import { JsonPipe, NgFor, NgIf, NgStyle } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatButtonToggleChange,
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-signal-store-example',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    NgStyle,
    RouterOutlet,
    JsonPipe,
    MatListModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
  ],
  templateUrl: './signal-store-example.component.html',
  styleUrl: './signal-store-example.component.css',
})
export class SignalStoreExampleComponent implements OnInit {
  store = inject(TodosStore);
  filter = viewChild.required(MatButtonToggleGroup);

  constructor() {
    console.log('SignalStoreExampleComponent created');

    effect(() => {
      const filter = this.filter();
      filter.value = this.store.filter();
    });
  }

  ngOnInit(): void {
    this.loadTodos().then(() => {
      console.log('Todos loaded');
    });
  }

  async loadTodos() {
    await this.store.loadAll();
  }

  async onAddTodo(title: string) {
    await this.store.addTodo(title);
  }

  async onDeleteTodo(id: number, event: MouseEvent) {
    event.stopPropagation();
    await this.store.deleteTodo(id);
  }

  async onTodoToggled(id: number, completed: boolean) {
    await this.store.completeTodo(id, completed);
  }

  onFilterChange(filter: MatButtonToggleChange) {
    const filterValue = filter.value as TodosFilter;
    this.store.updateFilter(filterValue);
  }
}
