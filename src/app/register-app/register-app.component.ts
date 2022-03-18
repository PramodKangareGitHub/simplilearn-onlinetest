import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import olData from '../../assets/QAData.json';
@Component({
  selector: 'app-register-app',
  templateUrl: './register-app.component.html',
  styleUrls: ['./register-app.component.css'],
})
export class RegisterAppComponent implements OnInit {
  languages: { language: string; selected: boolean }[] = [];
  submitted: boolean = false;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  regForm: FormGroup;

  get f() {
    return this.regForm.controls;
  }

  ngOnInit(): void {
    olData.forEach((element) => {
      this.languages.push({ language: element.LanguageName, selected: false });
    });
    this.languages[0].selected = true;

    this.regForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    sessionStorage.removeItem('email');
  }

  startExam() {
    this.submitted = true;
    if (this.regForm.invalid) {
      return;
    }

    sessionStorage.setItem('email', this.regForm.controls.email.value);

    let selectedLang = this.languages.find((x) => x.selected);
    this.router.navigateByUrl(`onlineTest/${selectedLang?.language}`);
  }

  onChange(event: any) {
    this.languages.forEach((lang) => {
      lang.selected = false;
    });
    if (event.target.value != '') {
      let selectedLang = this.languages.find(
        (x) => x.language == event.target.value
      );
      if (selectedLang) {
        selectedLang.selected = true;
      }
    }
  }
}
