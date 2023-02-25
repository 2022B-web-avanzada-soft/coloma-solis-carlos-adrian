import {MouseEventHandler, useEffect, useRef, useState} from "react";
import {getSocket} from "../utils/socket";
import {Container} from "@mui/material";

const tamPixel = 10

function getPosicionEnBitMap(x: number, y: number){
    const xPixel = Math.floor(x / tamPixel)
    const yPixel = Math.floor(y / tamPixel)
    return {xPixel, yPixel}
}

class Canvas{
    bitmap: string[][] = []
    constructor(public canvas: HTMLCanvasElement, public height: number, public width: number, bitmap: string[][] = []) {
        this.canvas = canvas
        this.bitmap = bitmap
        if(bitmap.length != 0){
            this.dibujarBitmap()
        }else{
            this.inicializarBitmap()
        }

    }

    private inicializarBitmap(){
        console.log("Se va a inicializar el bitmap")
        for(let i = 0; i < this.height; i++){
            this.bitmap.push([])
            for(let j = 0; j < this.width; j++){
                this.bitmap[i].push('white')
            }
        }
    }

    dibujarBitmap(){
        console.log(`width ${this.width} height ${this.height}`)
        for(let i = 0; i < this.width; i++){
            for(let j = 0; j < this.height; j++){
                const color = this.bitmap[i][j]
                console.log("Se va a dibujar un pixel en x: " + j + " y: " + i + " color: " + color)
                this.dibujarPixel(j * tamPixel, i * tamPixel, color)
            }
        }
    }
    dibujarPixel(x: number, y: number, color: string) {
        const context = this.canvas.getContext('2d')
        context.fillStyle = color
        let {xCanvas, yCanvas} = this.getPosicionEnCanvas(x, y)
        context.fillRect(xCanvas, yCanvas, tamPixel, tamPixel)
        const {xPixel, yPixel} = getPosicionEnBitMap(xCanvas, yCanvas)
        this.bitmap[yPixel][xPixel] = color
        console.log("Se dibujo un pixel en x: " + x + " y: " + y )
    }

    dibujarEnBitmap(x: number, y: number, color: string){
        this.dibujarPixel(x * tamPixel, y * tamPixel, color)
    }
    private getPosicionEnCanvas(x: number, y: number){
        x = Math.floor(x)
        y = Math.floor(y)

        let xCanvas = x
        let yCanvas = y
        if (x % tamPixel != 0) {
            do{
                xCanvas = xCanvas - 1
            }while (xCanvas % tamPixel != 0)
        }

        if (y % tamPixel != 0) {
            do{
                yCanvas = yCanvas - 1
            }while (yCanvas % tamPixel != 0)
        }

        console.log(`Posicion entrada x: ${x} y: ${y} Posicion salida x: ${xCanvas} y: ${yCanvas} `)

        return {xCanvas, yCanvas}
    }



}

const canvasHeight = 500
const canvasWidth = 500
export default function CanvasComponent({color} : {color: string}){
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [bitmap, setBitmap] = useState<string[][]>([])

    let canvas = new Canvas(canvasRef.current, canvasHeight / tamPixel, canvasWidth / tamPixel);

    useEffect(() => {
        canvas = new Canvas(canvasRef.current, canvasHeight / tamPixel, canvasWidth / tamPixel);
        getSocket().on('dibujar', ({x, y, color}: {x: number, y: number, color: string}) => {
            canvas.dibujarEnBitmap(x, y, color)
        })


        getSocket().emit('bitmap', {}, ({bitmap}) => {
            console.log("Se recibio el bitmap", bitmap)
            canvas.bitmap = bitmap
            canvas.dibujarBitmap()

        })

    }, [])

    const handleMouseMove = (event) =>{
        console.log("Se movio el mouse")
        const canvasTemp = canvasRef.current
        const context = canvasTemp.getContext('2d')
        const rect = canvasTemp.getBoundingClientRect()

        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        canvas.dibujarPixel(x, y, color)
        const {xPixel, yPixel} = getPosicionEnBitMap(x, y)
        getSocket().emit('dibujar', {x: xPixel, y: yPixel, color: color})
    }


    return (
        <>
            <Container style={{marginTop: '20px'}}>
                <canvas
                    ref={canvasRef}
                    width={canvasHeight}
                    height={canvasWidth}

                    onClick={handleMouseMove}
                    style={{border: "1px solid black"}}
                />
            </Container>

        </>

    )
}