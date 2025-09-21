export interface Concierto {
  _id?: string;      // MongoDB id (opcional en frontend durante creación)
  titulo: string;
  artista: string;
  fecha: string;     // ISO date string (yyyy-mm-dd) — usaremos input type="date"
  lugar: string;
  precio?: number;
  genero?: string;
  descripcion?: string;
  imagenUrl?: string; // 👈 aquí la añadimos
}
