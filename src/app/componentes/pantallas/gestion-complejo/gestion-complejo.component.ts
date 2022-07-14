import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gestion-complejo',
  templateUrl: './gestion-complejo.component.html',
  styleUrls: ['./gestion-complejo.component.scss'],
})
export class GestionComplejoComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
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
