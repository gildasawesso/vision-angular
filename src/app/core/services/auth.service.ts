import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {ApiService} from './api.service';
import {Credential} from '../models/app-models/credential';
import {Signup} from '../models/app-models/signup';
import {BehaviorSubject} from 'rxjs';
import {DecodedToken} from '../models/app-models/decoded-token';
import {Router} from '@angular/router';
import {apiConstants} from '../constants/api.constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userBehaviorSubject = new BehaviorSubject<User>(null);
  private user$ = this.userBehaviorSubject.asObservable();

  constructor(private api: ApiService, private router: Router) {
  }

  get user() {
    return this.user$;
  }

  get userRemote(): Promise<User> {
    return this.api.get(`/users/me`).toPromise();
  }

  get isUserAuthenticated() {
    return !!localStorage.getItem('credentials');
  }

  get currentUser() {
    return this.userBehaviorSubject.value;
  }

  set currentUser(user: User) {
    this.userBehaviorSubject.next(user);
    if (user == null) {
      this.credentials = null;
    }
  }

  get credentials() {
    const credentialsString = localStorage.getItem('credentials');
    return JSON.parse(credentialsString);
  }

  set credentials(credential: Credential) {
    if (credential == null) {
      localStorage.removeItem('credentials');
    } else {
      localStorage.setItem('credentials', JSON.stringify(credential));
    }
  }

  async updateUser(user: User) {
    return this.api.update(`/r/users/${user._id}`, user).toPromise();
  }

  initializeUser() {
    this.getCurrentUser();
  }

  async getCurrentUser(): Promise<User> {
    const saveUser = this.userBehaviorSubject.value;
    if (saveUser) {
      return Promise.resolve(saveUser);
    } else {
      if (this.isUserAuthenticated) {
        try {
          const user = await this.api.get(`/users/me`).toPromise();
          this.currentUser = user;
          return user;
        } catch (e) {
          console.log(e);
          await this.router.navigateByUrl(apiConstants.signin);
        }
      } else {
        await this.router.navigateByUrl(apiConstants.signin);
      }
    }
  }

  async renewToken(refreshToken) {
    const credentials = await this.api.post(apiConstants.renewToken, {refreshToken}).toPromise();
    this.credentials = credentials;
    return credentials;
  }

  async signin(username: string, password: string) {
    this.credentials = await this.api.post(apiConstants.signin, {username, password}).toPromise();
    return this.getCurrentUser();
  }

  async signup(signupInfo: Signup) {
    this.credentials = await this.api.post(apiConstants.signup, signupInfo).toPromise();
    return this.getCurrentUser();
  }

  async signout() {
    this.currentUser = null;
    await this.router.navigateByUrl(apiConstants.signin);
    location.reload();
  }

  decodeToken(token: string): DecodedToken {
    const tokenDecoded = atob(token.split('.')[1]);
    return JSON.parse(tokenDecoded);
  }
}
