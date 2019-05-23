import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  @Input() type: number = 1;
  @Output() typeChange = new EventEmitter();
  ngOnInit() {
  }

  updateType(newType: number) {
    this.type = newType;
    this.typeChange.emit(this.type.toString());
  }

}
