import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'file-attachment',
  templateUrl: './file-attachment.component.html',
  styleUrls: ['./file-attachment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileAttachmentComponent),
      multi: true,
    }
  ]
})
export class FileAttachmentComponent implements OnInit, ControlValueAccessor {
  @ViewChild('fileUploadInput') fileUploadInput: ElementRef;

  loadingFile = false;
  dropZoneActive = false;
  extensions = ['.pdf', '.docx', '.jpeg', '.jpg', '.png'];
  files: {filename: string, path: string}[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
  }

  propagateChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(files: {filename: string, path: string}[]): void {
    this.files = files || [];
    this.cdr.markForCheck();
  }

  removeFile(index :number) {
    this.files.splice(index, 1)
    this.propagateChange(this.files)
  }

  uploadFile(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.fileUploadInput.nativeElement.click();
  }

  fileUploaded(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    const target = <HTMLInputElement>e.target
    if (target.files && target.files.length) {
      const file = target.files[0];
      const fileSize = file.size/1024/1024;
      if (fileSize < 10) {
        this.getFileUrl(file)
      } else {
        this.snackBar.open($localize`:Exceeded file size notification:Faila izmērs ir pārāk liels.`, null, {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 2500,
        });
      }
    }
  }

  getFileUrl(file: File) {
    this.loadingFile = true;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.files.push({
        filename: file.name,
        path: reader.result as string,
      });
      this.loadingFile = false;
      this.propagateChange(this.files)
      this.cdr.markForCheck();
    }
  }

}
