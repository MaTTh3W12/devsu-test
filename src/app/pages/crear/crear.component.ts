import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/interfaces/products.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  productos: Productos[] = [];

  producto: Productos = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  }


  myForm: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)] ],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', Validators.required],
    date_release: ['', Validators.required],
    date_revision: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, 
              private product: ProductosService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }


    this.activatedRoute.params.subscribe( param => {
      let id = param['id'];
      this.product.getProductosPorId(id).subscribe( res => {
        this.productos = res;
        const productoEdit = this.productos.find(producto => producto.id === id)
        console.log(productoEdit);
      })
    })
  }

  crearProducto() {
    console.log(this.myForm.value);
    this.product.agregarProductos(this.myForm.value).subscribe( res => {
      console.log('Datos insertados correctamente', res);
      this.router.navigate(['/listado']);
    })
  }

}
