import {
    ConnectedSocket,
    MessageBody, OnGatewayConnection,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Socket, Server} from "socket.io";
import {DISCONNECT_EVENT} from "@nestjs/websockets/constants";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

interface Participante {
    nombre: string;
}

interface Sala {
    id: string;
    participantes: Participante[],
    bitmap: string[][]
}

const heightBitmap = 50;
const widthBitmap = 50;

function crearBitmap(): string[][] {
    let bitmap: string[][] = [];
    for (let i = 0; i < heightBitmap; i++) {
        bitmap.push([]);
        for (let j = 0; j < widthBitmap; j++) {
            bitmap[i].push("white")
        }
    }

    //console.log("Se creo el bitmap ", bitmap)
    return bitmap;
}

class SalasManager {
    idActual = 0;
    salas: Sala[] = [];

    crearSala(): Sala {
        this.idActual++;
        let nuevaSala: Sala = {id: this.idActual.toString(), participantes: [], bitmap: crearBitmap()};
        this.salas.push(nuevaSala)

        return nuevaSala;
    }

    getParticipantes(salaId: string): Participante[] {
        return this.salas.find(sala => sala.id === salaId)?.participantes;
    }

    addParticipante(salaId: string, participante: Participante) {
        this.salas.find(sala => sala.id === salaId).participantes.push(participante)
        console.log("Participante añadido", participante)
    }

    getRoom(socket: Socket): string {
        let salaId: string;
        this.salas.forEach(sala => {
            if (socket.rooms.has(sala.id)) {
                salaId = sala.id;
            }
        })

        return undefined;
    }
}

const salasManager = new SalasManager();

@WebSocketGateway(11202, {cors: {origin: '*'}})
export class EventosGateway implements OnGatewayConnection<Socket> {
    handleConnection(client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>, ...args: any[]) {
        client.on('disconnect', () => {
            this.handleDisconnect(client);
        })
    }

    @WebSocketServer()
    server: Server;
    @SubscribeMessage('crear-sala')
    crearSala(@MessageBody() message: {salaId: string, nick: string}, @ConnectedSocket() socket: Socket) : {salaId: string}{
        //console.log('Mensaje del cliente', message);
        const salaCreada : Sala = salasManager.crearSala()
        socket.join(salaCreada.id);
        salasManager.addParticipante(salaCreada.id, {nombre: message.nick});
        console.log("Se ha creado la sala")
        return {salaId: salaCreada.id};
    }

    @SubscribeMessage('unirse-sala')
    unirseASala(@MessageBody() message: {salaId: string, nick: string}, @ConnectedSocket() socket: Socket) : {exito: boolean}{
        const participantes = salasManager.getParticipantes(message.salaId);
        if(participantes){
            const participante: Participante = {nombre: message.nick};
            participantes.push(participante);
            socket.join(message.salaId);
            socket.broadcast.to(message.salaId).emit('participantes', {participantes: participantes})

            socket.emit('bitmap', {bitmap: salasManager.salas.find(sala => sala.id === message.salaId).bitmap})

            return {exito: true};
        }else{
            return {exito: false};
        }
    }

    @SubscribeMessage('participantes')
    getParticipantes(@MessageBody() message: {salaId: string}, @ConnectedSocket() socket: Socket) : {participantes: Participante[]}{
        console.log('Participantes')
        const participantes = salasManager.getParticipantes(message.salaId);
        if(participantes){
            return {participantes: participantes};
        }else{
            return {participantes: []};
        }
    }

    @SubscribeMessage('dibujar')
    dibujar(@MessageBody() message: {x: number, y: number, color: string}, @ConnectedSocket() socket: Socket) : void{
        const roomDelSocket = [...socket.rooms][1]
        //console.log("Dibujar", message, roomDelSocket, socket.rooms)
        const sala = salasManager.salas.find(sala => sala.id === roomDelSocket)
        //console.log(sala.bitmap.length, sala.bitmap[0].length)
        sala.bitmap[message.y][message.x] = message.color;
        //console.log(`se dibujo en ${message.x}, ${message.y} el color ${message.color}`)
        socket.broadcast.to(roomDelSocket).emit('dibujar', {x: message.x, y: message.y, color: message.color})

    }

    @SubscribeMessage('bitmap')
    getBitmap(@MessageBody() message, @ConnectedSocket() socket: Socket) : {bitmap: string[][]}{
        const roomDelSocket = [...socket.rooms][1]
        //console.log("Bitmap", message, roomDelSocket, socket.rooms)
        const sala = salasManager.salas.find(sala => sala.id === roomDelSocket)

        //console.log("Se envio el bitmap ", sala.bitmap)
        return {bitmap: sala.bitmap};
    }

    handleDisconnect(client: Socket): any {
        const roomDelSocket = [...client.rooms][1]
        console.log("Disconnect", client.rooms)
        const sala = salasManager.salas.find(sala => sala.id === roomDelSocket)
        if(sala){
            const participantes = sala.participantes;
            const participante = participantes.find(participante => participante.nombre === client.id)
            if(participante){
                const indiceParticipante = participantes.indexOf(participante);
                participantes.splice(indiceParticipante, 1);
                client.broadcast.to(roomDelSocket).emit('participantes', {participantes: participantes})
            }
        }
    }





}