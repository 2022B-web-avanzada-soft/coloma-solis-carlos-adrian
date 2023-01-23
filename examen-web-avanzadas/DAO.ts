export default abstract class DAO<T>{
    protected filePath = "datos.txt"

    abstract crear(entidad: T)
    abstract leer(id: number) : T
    abstract actualizar(entidad: T)
    abstract eliminar(id: number) : boolean
}