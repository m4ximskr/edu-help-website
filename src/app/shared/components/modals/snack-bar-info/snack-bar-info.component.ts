import { Component, OnInit, Inject } from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from '@angular/material/snack-bar';

@Component({
  selector: 'snack-bar-info',
  templateUrl: './snack-bar-info.component.html',
  styleUrls: ['./snack-bar-info.component.scss']
})
export class SnackBarInfoComponent implements OnInit {

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data,
    private snackBarRef: MatSnackBarRef<SnackBarInfoComponent>) { }

  ngOnInit(): void {
  }

  close() {
    this.snackBarRef.dismiss();
  }
}
