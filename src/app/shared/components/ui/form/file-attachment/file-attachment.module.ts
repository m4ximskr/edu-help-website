import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FileAttachmentComponent} from "./file-attachment.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatChipsModule} from "@angular/material/chips";
import {ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  declarations: [FileAttachmentComponent],
  imports: [
    CommonModule,
    MatExpansionModule,
    MatIconModule,
    MatButtonModule,

    MatChipsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  exports: [FileAttachmentComponent],
})
export class FileAttachmentModule { }
