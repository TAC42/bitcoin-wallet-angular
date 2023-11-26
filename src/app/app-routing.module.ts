import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { HomeComponent } from './pages/home/home.component'
import { ContactComponent } from './pages/contact/contact.component'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component'
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component'
import { contactResolver } from './resolvers/contact.resolver'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'contact', component: ContactComponent, children: [
      { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver } },
      { path: 'edit', component: ContactEditComponent }
    ]
  },
  { path: 'contact-details/:id', component: ContactDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // { path: 'statistics', component: StatisticsComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
