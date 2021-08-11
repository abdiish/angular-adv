import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent implements OnInit{

  public auth2:any;

  public loginForm = this.fb.group({

    email: [ localStorage.getItem('email') || '', [Validators.required, Validators.email] ],
    password: ['', Validators.required],
    remember: [false]

  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }


  ngOnInit(): void {
    this.renderButton();
  }



  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        if ( this.loginForm.get('remember')?.value) {
          localStorage.setItem('email',this.loginForm.get('email')?.value);
        }else {
          localStorage.removeItem('email');
        }

        //Navegar al Dashboard
        this.router.navigateByUrl('/');
        
      }, (err) =>{
        Swal.fire('Error', err.error.msg, 'error');
      });

    // Recuperar valores capturados en formulario
    // console.log( this.loginForm.value);
    // this.router.navigateByUrl('/');
    
  }
  

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp () {
    gapi.load('auth2', () => {
      // Retrieve the singleton for the GoogleAuth library and set up the client.
      this.auth2 = gapi.auth2.init({
        client_id: '1056251519311-kmb08883e7bdgke6l1ld1l0b1kiod3m2.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        // Request scopes in addition to 'profile' and 'email'
        //scope: 'additional_scope'
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser: any) => {
        const id_token = googleUser.getAuthResponse().id_token;
        this.usuarioService.loginGoogle(id_token).subscribe(
          resp => { this.router.navigateByUrl('/');  });  //Navegar al Dashboard
      }, (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}
