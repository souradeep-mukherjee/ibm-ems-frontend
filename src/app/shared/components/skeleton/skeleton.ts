import { NgFor } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [NgFor],
  templateUrl: './skeleton.html',
  styleUrl: './skeleton.css'
})
export class SkeletonComponent {
  readonly rows = input(4);
  readonly items = computed(() => Array.from({ length: this.rows() }));
}
