import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  templateUrl: './edit-player.component.html',
  styleUrls: ['./edit-player.component.scss']
})
export class EditPlayerComponent implements OnInit {

  allProfilePictures = ['m1.png' , 'f1.png', 'm2.png' , 'f2.png', 'm3.png' , 'f3.png'];

  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { }

  ngOnInit(): void {
  }

}
