import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineTestComponent } from './online-test/online-test.component';
import { RegisterAppComponent } from './register-app/register-app.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterAppComponent,
  },
  {
    path: 'onlineTest/:language',
    component: OnlineTestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
