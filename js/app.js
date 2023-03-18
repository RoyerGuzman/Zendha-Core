document.addEventListener("DOMContentLoaded", () => {
        
    // navegacion
    let navOpen = document.getElementById('navOpen');
    let navClose = document.getElementById('navClose');
    let navMenu = document.getElementById('navMenu');

    navOpen.addEventListener('click', ()=> navMenu.classList.add('active'));
    navClose.addEventListener('click', ()=> navMenu.classList.remove("active"));


    // botones ver mas

    let bottonBody = document.getElementsByClassName('bottonBody');
    
    for (let key = 0; key < bottonBody.length; key++) {
        // const element = bottonBody[key];
        bottonBody[key].addEventListener('click', function(){
            
            let contenedorPadre = this.closest('.pregunta');
            
            if (this.classList.contains("openBody")) {
                
                this.classList.add('closeBody')
                this.classList.remove('openBody')
                this.innerHTML  = '<button>Contraer</button>';
                contenedorPadre.classList.add('active');
                
            } else {
                this.classList.remove('closeBody')
                this.classList.add('openBody')
                this.innerHTML  = '<button>Ver completo</button>';
                contenedorPadre.classList.remove('active');
                
            }
        })
        
    }

    // interaciones selectores 
    let porEtiquetas = document.getElementById('porEtiquetas');
    let porClase = document.getElementById('porClase');
    let porId = document.getElementById('porId');
    
    let parrafosPrueba = document.getElementById('parrafosPrueba').children;
    let cajasCodigoSelectores = document.getElementById('cajasCodigoSelectores').children;
        
    porEtiquetas.addEventListener('click', ()=> {
        for (let key = 0; key < parrafosPrueba.length; key++) {
            if (!parrafosPrueba[key].classList.contains("active")) {
                parrafosPrueba[key].classList.add('active')
            }
            key == 0?cajasCodigoSelectores[key].classList.add('active'):cajasCodigoSelectores[key].classList.remove('active');            
        }                
    });
    porClase.addEventListener('click', ()=> {        
        // let parrafosPrueba = document.getElementById('parrafosPrueba');
        for (let key = 0; key < parrafosPrueba.length; key++) {
            if (parrafosPrueba[key].classList.contains("parafoConClase")) {
                parrafosPrueba[key].classList.add('active')
            } else {
                parrafosPrueba[key].classList.remove('active')
            }
            key == 1?cajasCodigoSelectores[key].classList.add('active'):cajasCodigoSelectores[key].classList.remove('active');
        } 
    });
    porId.addEventListener('click', ()=> {        

        for (let key = 0; key < parrafosPrueba.length; key++) {
            if (parrafosPrueba[key].id == "parafoConId") {
                parrafosPrueba[key].classList.add('active')
            } else {
                parrafosPrueba[key].classList.remove('active')        
            }
            key == 2?cajasCodigoSelectores[key].classList.add('active'):cajasCodigoSelectores[key].classList.remove('active');
        }
    });


    // funcion api
    // fetch('https://backend.zendha.core.fundatusitioweb.com/api/puestos',{
    let SelectApiRest = document.getElementById('SelectApiRest');
    fetch('https://backzendha.test/api/puestos',{
            method: 'GET',            
    })
        .then(res => res.json())
        .then(data=> {
            for (const puesto of data) {                
                const option = document.createElement('option');
                option.value= puesto.id;
                option.text = puesto.puesto;                
                SelectApiRest.appendChild(option);
            }
                        
            
        })

    let formularioApi = document.getElementById('formularioApi');
    let resultadosConsulta = document.getElementById('resultadosConsulta');

    formularioApi.addEventListener('submit', function(e){
        e.preventDefault();
        const datosFormulario = new FormData(formularioApi);        
        // fetch('https://backend.zendha.core.fundatusitioweb.com/api/empleados',{
        fetch('https://backzendha.test/api/empleados',{
            method: 'POST',
            body: datosFormulario
        })
            .then(res => res.json())
            .then(data=> {
                let valorSelect = document.getElementById('SelectApiRest');
                valorSelect = valorSelect.options[valorSelect.selectedIndex].text;
                
                let stringHeader = `<tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Salario</th>
                        <th>Puesto</th>
                    </tr>`;
                let stringRow = '';
                if(data.length > 0){

                    for (const empleado of data) {                
                        stringRow += `
                        <tr>
                        <td>${empleado.id}</td>
                        <td>${empleado.nombre}</td>
                        <td>${empleado.salario}</td>
                        <td>${valorSelect}</td>
                        </tr>
                        `;                  
                    }
                } else {
                    stringRow += `
                    <tr>
                    <td></td>
                    <td>'Sin Resultados'</td>
                    <td></td>
                    <td></td>
                    </tr>
                    `;   
                    
                }

                let resultado = stringHeader + stringRow;
                resultadosConsulta.innerHTML = resultado;
             
                
            })
    })


});

