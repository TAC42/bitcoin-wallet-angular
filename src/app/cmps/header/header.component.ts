import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = 'BitNation Store'
  logo = '../../assets/images/bitcoin.png'
  home = '../../assets/images/home.png'
  contact = '../../assets/images/contact.png'

}
