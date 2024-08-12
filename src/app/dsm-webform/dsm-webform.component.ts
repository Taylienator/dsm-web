import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-dsm-webform',
  templateUrl: './dsm-webform.component.html',
  styleUrls: ['./dsm-webform.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ]
})
export class DsmWebformComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef({});

  UserCredentials: FormGroup = new FormGroup({});
  formProgress: number = 0;
  selectedFile: File | null = null;
  fileContent?: string | ArrayBuffer | null | undefined = null;
  filePreview: string = '';
  fileType: string = '';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.UserCredentials = this.fb.group({
      requestUser: ['', Validators.required],
      summary: ['', Validators.required],  // Added this line
      description: [''],
      dueDate: [null],
      externalRequestType: [''],
      otherPersonName: [''],
    });

    this.UserCredentials.valueChanges.subscribe(() => {
      this.updateFormProgress();
    });
  }

  updateFormProgress() {
    const controls = this.UserCredentials.controls;
    const totalControls = Object.keys(controls).length;
    const filledControls = Object.values(controls).filter(control => control.valid).length;
    this.formProgress = (filledControls / totalControls) * 100;
  }

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      this.fileType = this.selectedFile.type;
      this.previewFile();
    }
  }

  previewFile() {
    if (!this.selectedFile) return;

    if (this.fileType.startsWith('image/')) {
      this.previewImage();
    } else if (this.fileType === 'application/pdf') {
      this.filePreview = 'PDF file selected. Preview not available.';
    } else if (this.fileType.startsWith('text/') || this.fileType === 'application/json') {
      this.previewText();
    } else {
      this.filePreview = `File type ${this.fileType} selected. Preview not available.`;
    }
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.filePreview = `<img src="${e.target?.result}" alt="File preview" style="max-width: 100%; max-height: 200px;">`;
    };
    reader.readAsDataURL(this.selectedFile!);
  }

  previewText() {
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      const content = e.target?.result as string;
      this.filePreview = content.slice(0, 200) + (content.length > 200 ? '...' : '');
    };
    reader.readAsText(this.selectedFile!);
  }

  readFile() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.fileContent = e.target?.result;
        console.log('File content:', this.fileContent);
      };
      reader.readAsText(this.selectedFile);
    }
  }

  onSubmit() {
    if (this.UserCredentials.valid) {
      const formData = new FormData();
      Object.keys(this.UserCredentials.value).forEach(key => {
        formData.append(key, this.UserCredentials.value[key]);
      });
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }
      console.log('Form Data:', formData);

      // Log the contents of formData
      formData.forEach((value, key) => {
        console.log(key, value);
      });
      this.resetForm();
      // Here you would typically send the formData to your backend
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Dropped file:', this.selectedFile);
      this.readFile();
    }
  }

  getFileContentPreview(): string {
    if (typeof this.fileContent === 'string') {
      return this.fileContent.slice(0, 200);
    } else if (this.fileContent instanceof ArrayBuffer) {
      const textDecoder = new TextDecoder('utf-8');
      const text = textDecoder.decode(this.fileContent);
      return text.slice(0, 200);
    }
    return '';
  }

  resetForm() {
    // Reset the form to its initial state
    this.UserCredentials.reset();

    // Clear the file input
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }

    // Reset file-related properties
    this.selectedFile = null;
    this.fileContent = null;

    // Reset the form progress
    this.formProgress = 0;

    // Re-initialize the form
    this.initForm();

    this.filePreview = '';
    this.fileType = '';
  }
}