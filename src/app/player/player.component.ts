import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  @Input() name: any;
  @Input() image = 'f1';
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
