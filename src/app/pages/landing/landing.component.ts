import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './landing.component.html',
    styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  constructor(private router: Router) { }
  ngOnInit(): void {

  }
}
