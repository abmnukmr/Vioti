import {NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import { MyApp } from './app.component';
import { QRCodeComponent} from '../angular2-qrcode/angular2-qrcode.component.ts';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import {WalletPage} from "../pages/wallet/wallet";
import {Abmnu} from "../providers/abmnu";
import {TransitionPage} from "../pages/transition/transition";
import {ProfilePage} from "../pages/Profile/profile";
import {ConnectivityService} from "../providers/connectivity-service";
import {SearchPage} from "../pages/search/search";
import {WendorPage} from "../pages/wendor/wendor";
import { DynamicComponentModule } from 'ng-dynamic';
import {FiterPage} from "../pages/fiter/fiter";
import {CommonModule} from "@angular/common";
import {LocationTracker} from "../providers/location-tracker";
import {ChooslocPage} from "../pages/choosloc/choosloc";
import {AuthPage} from "../pages/auth/auth";
import {SignupPage} from "../pages/signup/signup";
import {ForgotPage} from "../pages/forgot/forgot";
import {LocPage} from "../pages/loc/loc";
import {TitlecontactPage} from "../pages/titlecontact/titlecontact";
import {TitleeditorPage} from "../pages/titleeditor/titleeditor";
import {TitlediscriptionPage} from "../pages/titlediscription/titlediscription";
import {TitleitemPage} from "../pages/titleitem/titleitem";
import {AdditemPage} from "../pages/additem/additem";
import {ShopopenPage} from "../pages/shopopen/shopopen";
import {AuthProviders, AuthMethods, AngularFireModule} from "angularfire2";
import * as firebase from "firebase";
import {Auth} from "../providers/auth";
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import {SearchlocPage} from "../pages/searchloc/searchloc";
import {EdititemPage} from "../pages/edititem/edititem";
import {ProfilephotoPage} from "../pages/profilephoto/profilephoto";
import {QrcodePage} from "../pages/qrcode/qrcode";
import {BarcodereadPage} from "../pages/barcoderead/barcoderead";
import {OnemorePage} from "../pages/onemore/onemore";
import {LocationeditPage} from "../pages/locationedit/locationedit";
import {OrderByPipe} from "../pipes/order-by-pipe";
import {AbmnuPage} from "../pages/abmnu/abmnu";
import {BarcodePage} from "../pages/barcode/barcode";
import {Shopdata} from "../providers/shopdata";
import {Favourite} from "../providers/favourite";
import {PhoneverPage} from "../pages/phonever/phonever";
import {OtpPage} from "../pages/otp/otp";
import {TermsPage} from "../pages/terms/terms";
import {ShopdetPage} from "../pages/shopdet/shopdet";
import {Otp} from "../providers/otp";
import {AphoneverPage} from "../pages/aphonever/aphonever";
import {AotpPage} from "../pages/aotp/aotp";
import {MorelocalPage} from "../pages/morelocal/morelocal";
import {MorecurPage} from "../pages/morecur/morecur";
import {Adver} from "../providers/adver";
import {Notification} from "../providers/notification";
import {AuthProvider} from "../providers/auth-provider";
import {ChatbotPagePage} from "../pages/chatbot/chatbot";
import {ChatlistPagePage} from "../pages/chatlist/chatlist";
//import {IonicStorageModule } from '@ionic/storage/es2015/storage.d.ts';

export const firebaseConfig = {

  apiKey: "AIzaSyDIotYzX--YIEEvA97mYorkPYyTuirdM_Y",
  authDomain: "viotiservices.firebaseapp.com",
  databaseURL: "https://viotiservices.firebaseio.com",
  storageBucket: "viotiservices.appspot.com",
  messagingSenderId: "553959685910"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
}


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '5eeb68f0'
  },
  'auth': {
    'google': {
      'webClientId': '414670723734-vodt1lsumg541g82gcbt6qpdfd7hrre7.apps.googleusercontent.com',
      'scope': []
    }
  },
  'push': {
    'sender_id': '553959685910',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#cb1b58'
      }
    }
  }
}


firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    MorelocalPage,
    MorecurPage,
    AphoneverPage,
    AotpPage,
    QRCodeComponent,
    AboutPage,
    OrderByPipe,
    ContactPage,
    WalletPage,
    HomePage,
    TabsPage,
    TransitionPage,
    ProfilePage,
    SearchPage,
    WendorPage,
    FiterPage,
    AuthPage,
    ChooslocPage,
    SignupPage,
    ForgotPage,
    LocPage,
    TitlecontactPage,
    TitleeditorPage,
    TitlediscriptionPage,
    TitleitemPage,
    AdditemPage,
    ShopopenPage,
    SearchlocPage,
    EdititemPage,
    ProfilephotoPage,
    QrcodePage,
    BarcodereadPage,
    OnemorePage,
    OtpPage,
    LocationeditPage,
    AbmnuPage,
    BarcodePage,
    PhoneverPage,
    TermsPage,
    ShopdetPage,
    ChatlistPagePage,
    ChatbotPagePage



  ],
  imports: [
    DynamicComponentModule,
    DynamicComponentModule.forRoot({
      imports: [CommonModule, IonicModule]}),
    CloudModule.forRoot(cloudSettings),
//    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
      platforms: {
        android: {
          tabsPlacement: 'bottom',
          tabsHideOnSubPages: true,
          iconMode:"ios",
          pageTransitionDelay:'16',
          activator:"highlight",
          pageTransition:"ios-transition"
        },
        ios: {
          tabsPlacement: 'bottom',
          tabsHideOnSubPages: true,
          showCancelButton:true,
          pageTransitionDelay:'16',
          activator:"highlight",
          pageTransition:"ios-transition"
        },
        windows:
        {
          tabsPlacement: 'bottom',
          tabsHideOnSubPages: true,
          pageTransitionDelay:'16',
          activator:"highlight",
          pageTransition:"ios-transition"
        }
      }
    }
    )
  ],

  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MorelocalPage,
    MorecurPage,
    AphoneverPage,
    AotpPage,
    AboutPage,
    WalletPage,
    QRCodeComponent,
    ContactPage,
    HomePage,
    TabsPage,
    TransitionPage,
    ProfilePage,
    SearchPage,
    WendorPage,
    FiterPage,
    AuthPage,
    SignupPage,
    ChooslocPage,
    ForgotPage,
    LocPage,
    TitlecontactPage,
    TitleeditorPage,
    TitlediscriptionPage,
    TitleitemPage,
    AdditemPage,
    ShopopenPage,
    SearchlocPage,
    EdititemPage,
    ProfilephotoPage,
    QrcodePage,
    BarcodereadPage,
    OnemorePage,
    OtpPage,
    LocationeditPage,
    PhoneverPage,
    TermsPage,
    ShopdetPage,
    ChatlistPagePage,
    ChatbotPagePage

  ],
  providers:[Shopdata,Abmnu,ConnectivityService,LocationTracker,Auth,Favourite,Otp,Notification,AuthProvider],
 // directives:[Focuser],
  schemas:     [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
