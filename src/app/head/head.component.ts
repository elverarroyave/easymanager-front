import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit {

  isCollapsed: boolean;
  constructor() { }

  ngOnInit(): void {
    this.isCollapsed = false;
  }

  collapsedMenu() {
    this.isCollapsed = !this.isCollapsed;
    console.log('isCollapsed-->', this.isCollapsed);
  }

}
