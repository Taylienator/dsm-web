import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
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
import { HttpClient } from '@angular/common/http';

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
  ],

})

@Injectable({providedIn: 'root'})

export class DsmWebformComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef = new ElementRef({});

  UserCredentials: FormGroup = new FormGroup({});
  formProgress: number = 0;
  selectedFile: File | null = null;
  fileContent?: string | ArrayBuffer | null | undefined = null;
  filePreview: string = '';
  fileType: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) { }

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
      location: [''],
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
        console.log(key, " what are the keys being generated?");
        let value = this.UserCredentials.value[key];
        if (value !== null && value !== undefined) {
          if (key === 'dueDate' && value instanceof Date) {
            value = value.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
          }
          formData.append(key, value);
        }
      });
      if (this.selectedFile) {
        formData.append('file', this.selectedFile, this.selectedFile.name);
      }

      console.log("Form data being sent:", formData);

      this.http.post('http://localhost:8080/api/submissions', formData).subscribe({
        next: (response) => {
          console.log('Submission successful', response);
          this.resetForm();
          // Show success message to user
        },
        error: (error) => {
          console.error('Submission failed', error);
          // Show error message to user
        },
        complete: () => {
          console.log('Submission process completed');
        }
      });
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