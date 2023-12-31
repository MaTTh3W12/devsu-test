import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Productos } from 'src/app/interfaces/products.interface';
import { ProductosService } from 'src/app/services/productos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  productos: Productos[] = [];

  producto: Productos | undefined = {
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
              private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return
    }


    this.activatedRoute.params.subscribe( param => {
      let id = param['id'];
      this.product.getProductosPorId(id).subscribe( res => {
        this.productos = res;
        const productoEdit = this.productos.find(producto => producto.id === id);
        if (!productoEdit === undefined) {
          return
        }
        this.producto = productoEdit;
        const fecha1 = this.datePipe.transform(this.producto?.date_release, 'yyyy-MM-dd');
        const fecha2 = this.datePipe.transform(this.producto?.date_revision, 'yyyy-MM-dd');
        this.myForm.patchValue({...this.producto!, date_release: fecha1, date_revision: fecha2});
        // this.addDataToForm(this.producto);
        console.log(this.producto);
      });
    });

  }

  crearProducto() {
    console.log(this.myForm.value);
    if (this.producto?.id) {
      //Acctualizar
      this.product.editarProducto(this.myForm.value).subscribe(res => {
        console.log('Datos actualizados correctamente', res);
        this.router.navigate(['/listado']);
      });
    }
    else {
      this.product.agregarProductos(this.myForm.value).subscribe( res => {
        console.log('Datos insertados correctamente', res);
        this.router.navigate(['/listado']);
      });
    }
  }

}
