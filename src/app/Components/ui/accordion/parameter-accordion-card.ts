import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parameter-accordion-card.html',
})
export class ParameterAccordionCardComponent {
  isOpen = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
}
