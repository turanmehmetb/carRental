import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { OverlayPanel } from 'primeng/overlaypanel';
import { LanguageMessagesService } from './packages/util/languageMessagesService';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { LoadingService } from './packages/loading/loading.service';

@Component({
  selector: 'carRental-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('menuOverlayPanel')
  menuOverlayPanel: OverlayPanel;
  @ViewChild('avatarOverlayPanel')
  avatarOverlayPanel: OverlayPanel;
  studentLoggedIn: boolean = false;
  instructorLoggedIn: boolean = false;
  selectableLangPreferences: SelectItem[];
  selectableThemePreferences: SelectItem[];
  isThemeLight: boolean;
  selectedLangPreference:string;
  
  constructor(
    private readonly languageMessagesService: LanguageMessagesService,
    public readonly router: Router,
    public readonly loadingService: LoadingService,
  ) {
    
  }

  ngOnInit() {
    this.languageMessagesService.setLanguage();

    this.selectableLangPreferences = [
      { label: 'TR', value: 'tr' },
      { label: 'EN', value: 'en' },
    ];
    this.selectableThemePreferences = [
      { label: this.languageMessagesService.msgjson.lightTheme, value: 'light' },
      { label: this.languageMessagesService.msgjson.darkTheme, value: 'dark' },
    ];

  }

  ngAfterViewInit(): void {
    window.onscroll = () => {
      // if (window.scrollY > 60) {
      //   $('#navbar').addClass('duration-700');
      //   $('#navbar').removeClass('duration-200');
      //   $('#navbar').css('top', -80)
      // } else {
      //   $('#navbar').removeClass('duration-700');
      //   $('#navbar').addClass('duration-200');
      //   $('#navbar').css('top', 0)
      // }
    }
  }

  burgerButtonClickHandler(e: MouseEvent) {
    const btn = (document.getElementById('navbar-burger-button') as HTMLElement);
    if (btn.classList.contains('burger-button-active')) {
      btn.classList.remove('burger-button-active')
      this.menuOverlayPanel.hide();
    } else {
      btn.classList.add('burger-button-active')
      this.menuOverlayPanel.show(e);
    }
  }

  menuOverlayOnHide() {
    const btn = (document.getElementById('navbar-burger-button') as HTMLElement);
    btn.classList.remove('burger-button-active')
  }

  onClick() {
    
  }

  onLangPreferenceChanged() {
    this.languageMessagesService.changeLanguage(this.selectedLangPreference);
    location.reload();
  }

  onThemePreferenceChanged() {

  }

  onRouteChanged() {
    this.menuOverlayPanel.hide();
    this.avatarOverlayPanel.hide();
  }
  
}
