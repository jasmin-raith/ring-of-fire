import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dialog-select-avatar',
  standalone: true,
  imports: [
    NgFor, 
    MatButtonModule, 
    MatDialogActions, 
    MatDialogClose, 
    MatDialogTitle, 
    MatDialogContent
  ],
  templateUrl: './dialog-select-avatar.component.html',
  styleUrl: './dialog-select-avatar.component.scss',

})
export class DialogSelectAvatarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogSelectAvatarComponent>) { }

  ngOnInit(): void {
    
  }
}
