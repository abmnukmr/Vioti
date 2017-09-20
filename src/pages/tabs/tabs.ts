import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {WalletPage} from "../wallet/wallet";
import {ChatlistPagePage} from "../chatlist/chatlist";


@Component({
  templateUrl: 'tabs.html'
})

export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page

  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = WalletPage
  tab5Root: any = ChatlistPagePage;

  tabBarElement:any;

  constructor() {
    this.tabBarElement = document.querySelector('#tabs ion-tabbar-section');

  }
  onPageDidEnter()
  {

    this.tabBarElement.style.display = 'block';

  }
}
