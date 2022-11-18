export class Reunion {
    constructor(
        public id: number,
        public motivo: string,
        public asunto: string,
        public prioridad: string,
        public fecha_reunion: Date,
        public estado?: number,
        public usuarios_id?: number,
        public estado_reunion?: number,
        public created_at?: string,
        public updated_at?: string
    ) { }
}