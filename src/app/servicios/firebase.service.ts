import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private authFB: AngularFireAuth) { }

  async registrar(email: string, password: string){
    try {
      return await this.authFB.createUserWithEmailAndPassword(email, password);
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }

  async login(email: string, password: string){
    try {
      return await this.authFB.signInWithEmailAndPassword(email, password);
    }
    catch(err) {
      console.log(err);
      return null;
    }
  }

  getUserLogged(){
    return this.authFB.authState;
  }

  logout(){
    this.authFB.signOut();
  }
}
