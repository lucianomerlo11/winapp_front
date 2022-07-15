import { Component, OnInit } from '@angular/core';

import {
  LAYOUT_VERTICAL, LAYOUT_HORIZONTAL, LAYOUT_TWOCOLUMN, LAYOUT_MODE, LAYOUT_WIDTH,
  LAYOUT_POSITION, SIDEBAR_SIZE, SIDEBAR_COLOR, TOPBAR
} from './layout.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  layoutType!: string;

  constructor() { }

  ngOnInit(): void {
    this.layoutType = LAYOUT_VERTICAL;
  }

  /**
  * Check if the vertical layout is requested
  */
  isVerticalLayoutRequested() {
    return this.layoutType === LAYOUT_VERTICAL;
  }

}
