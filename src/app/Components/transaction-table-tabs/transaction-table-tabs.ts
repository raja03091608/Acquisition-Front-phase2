import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-table-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-table-tabs.html',
  styleUrl: './transaction-table-tabs.css',
})
export class TransactionTableTabs implements OnChanges {
  @Input() tabs: any[] = [];
  @Input() activeTab!: string;

  @Output() tabChange = new EventEmitter<string>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabs']) {
    }
  }

  selectTab(tab: string) {
    this.tabChange.emit(tab);
  }
}
