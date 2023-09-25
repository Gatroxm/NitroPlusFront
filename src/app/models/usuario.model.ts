
export class Usuario {

    constructor(
            public id?:any,
            public nombre?:any,
            public apellido?:any,
            public nombreCorto?:any,
            public idEstado?:any,
            public fechaNacimiento?:any,
            public idNacionalidad?:any,
            public instagram?:any,
            public ciudad?:any,
            public departamento?:any,
            public idPaisResidencia?:any,
            public resena?:any,
            public correoElectronico?:any,
            public password?:any,
            public whatsapp?:any,
            public create_at?:any,
            public update_at?:any,
            public idMando?:any,
            public discordId?:any,
            public nombreDiscord?:any,
            public canal_twitch?:any,
            public canal_facebook?:any,
            public canal_youtube?:any,
            public aceptaCondiciones?:any,
            public aceptaCorreos?:any,
            public aceptaWhatsapp?:any,
        
    ){}
    imprimirNombre(){
        return this.nombre;
    }

    imprimeId(){
        return this.id
    }
}