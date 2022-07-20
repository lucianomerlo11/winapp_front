import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComplejoService } from 'src/app/servicios/complejo.service';

@Component({
  selector: 'app-modificar-complejo',
  templateUrl: './modificar-complejo.component.html',
  styleUrls: ['./modificar-complejo.component.scss']
})
export class ModificarComplejoComponent implements OnInit {
  public formModificarComplejo !: FormGroup;
  constructor(private formBuilder: FormBuilder, private complejosService: ComplejoService) { }

  ngOnInit(): void {
    this.formModificarComplejo = this.formBuilder.group({
      nombreComplejo: ['Win',[
        Validators.required
      ]],
      nombreCalle: ['Gines Garcia',[
        Validators.required
      ]],
      numCalle: ['4135',[
        Validators.required
      ]],
      cp: ['5009',[
        Validators.required
      ]],
      dpto: ['Cordoba',[
        Validators.required
      ]],
      barrio: ['Urca',[
        Validators.required
      ]],
      buffet: [true],
      mesas: [true],
      parrillas: [false],
      banos: [true],
      duchas: [false],
    }
    )
    this.getDatosComplejo()
  }

  getDatosComplejo(){
    this.complejosService.getDatos(1).subscribe((res:any) => {
      //this.formModificarComplejo.patchValue(res);
      //this.formModificarComplejo.get('nombreCalle')?.setValue(res.nombreBack)
    })
  }
}
