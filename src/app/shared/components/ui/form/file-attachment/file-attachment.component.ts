import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR} from "@angular/forms";
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

  @Input() formControl: FormControl

  @ViewChild('fileUploadInput') fileUploadInput: ElementRef;

  loadingFile = false;
  dropZoneActive = false;
  extensions = ['.pdf', '.docx', '.jpeg', '.jpg', '.png'];
  filesFormArray: FormArray = new FormArray([]);

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

  writeValue(obj: any): void {
  }

  removeFile(index:number) {
    this.filesFormArray.removeAt(index);
    this.propagateChange(this.filesFormArray.value)
  }

  uploadFile(e) {
    e.stopPropagation();
    e.preventDefault();
    this.fileUploadInput.nativeElement.click();
  }

  fileUploaded(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
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

  getFileUrl(file) {
    this.loadingFile = true;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.filesFormArray.push(new FormControl({
        filename: file.name,
        path: reader.result,
      }));
      this.loadingFile = false;
      this.propagateChange(this.filesFormArray.value)
      this.cdr.markForCheck();
    }
  }

}
