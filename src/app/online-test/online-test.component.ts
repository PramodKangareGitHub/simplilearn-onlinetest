import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import olData from '../../assets/QAData.json';
@Component({
  selector: 'app-online-test',
  templateUrl: './online-test.component.html',
  styleUrls: ['./online-test.component.css'],
})
export class OnlineTestComponent implements OnInit {
  selectedLang: any;
  email: string;
  QSet: any = [];
  fscore: number;
  submitted: boolean = false;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.selectedLang = params.get('language');
      if (this.selectedLang) {
        this.LoadQSet();
      }
    });

    let email = sessionStorage.getItem('email');
    if (!email) {
      this.router.navigateByUrl('');
    } else {
      this.email = email;
    }
  }

  LoadQSet() {
    this.QSet = olData.find((x) => x.LanguageName == this.selectedLang)?.QAData;
  }

  onChange(questionItem: any, selectedOption: string) {
    if (questionItem) {
      let QItem = this.QSet.find(
        (x: any) => x.Question == questionItem.Question
      );
      QItem.Options.forEach((option: any) => {
        option.selected = false;
      });

      let option = QItem.Options.find((x: any) => x.Option == selectedOption);
      option.selected = true;
    }
  }

  submitSet() {
    let score = 0;
    this.QSet.forEach((QSetItem: any) => {
      let isCorrectAns = QSetItem.Options.find(
        (x: any) => x.selected && x.IsCorrect
      );
      if (isCorrectAns) {
        score = score + 1;
      }
    });

    this.fscore = score;
    this.submitted = true;
  }
}
