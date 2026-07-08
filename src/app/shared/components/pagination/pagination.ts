import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './pagination.html',
  styleUrl: './pagination.css'
})
export class PaginationComponent {
  readonly page = input(0);
  readonly totalPages = input(0);
  readonly totalElements = input(0);
  readonly pageChange = output<number>();
  readonly label = computed(() => (this.totalPages() === 0 ? 'No pages' : `Page ${this.page() + 1} of ${this.totalPages()}`));

  previous(): void {
    if (this.page() > 0) this.pageChange.emit(this.page() - 1);
  }

  next(): void {
    if (this.page() + 1 < this.totalPages()) this.pageChange.emit(this.page() + 1);
  }
}
