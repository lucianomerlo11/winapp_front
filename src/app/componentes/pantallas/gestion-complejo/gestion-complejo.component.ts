import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-complejo',
  templateUrl: './gestion-complejo.component.html',
  styleUrls: ['./gestion-complejo.component.scss'],
})
export class GestionComplejoComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  constructor() {}

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'File Upload', active: true }
    ];
  }
  // success
  mesas = 0;
  mesadecrement() {
    this.mesas--;
  }

  mesaincrement() {
    this.mesas++;
  }

  parrillas = 0;
  parrilladecrement() {
    this.parrillas--;
  }

  parrillaincrement() {
    this.parrillas++;
  }

  banos = 0;
  banodecrement() {
    this.banos--;
  }

  banoincrement() {
    this.banos++;
  }

  duchas = 0;
  duchadecrement() {
    this.duchas--;
  }

  duchaincrement() {
    this.duchas++;
  }
}
