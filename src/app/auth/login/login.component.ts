import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css'
  ]
})
export class LoginComponent {

  public loginForm = this.fb.group({

    email: ['alancr@gmail.com', [Validators.required, Validators.email] ],
    password: ['123456', Validators.required],
    remember: [false]

  });

  constructor( private router: Router,
               private fb: FormBuilder,
               private usuarioService: UsuarioService ) { }



  login() {

    this.usuarioService.login( this.loginForm.value )
      .subscribe( resp => {
        console.log(resp);
        
      }, (err) =>{
        Swal.fire('Error', err.error.msg, 'error');
      });

    // Recuperar valores capturados en formulario
    // console.log( this.loginForm.value);
    // this.router.navigateByUrl('/');
    
  }

}
