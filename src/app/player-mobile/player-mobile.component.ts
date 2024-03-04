import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent implements OnInit {

  @Input() name: any;
  @Input() image = 'f1';
  @Input() playerActive: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
