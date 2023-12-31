import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Productos } from 'src/app/interfaces/products.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  productos: Productos[] = [];

  constructor(private router: Router, private productoService: ProductosService) { }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(res => {
      this.productos = res;
      console.log('Respuesta del servidor', this.productos);
    })
  }

  add() {
    this.router.navigate(['/crear']);
  }

}
