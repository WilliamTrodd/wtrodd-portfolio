type DotType = {
  x: number
  y: number
  color: string
  bearing: number
  move: Function
  draw: Function
}
type LineType = {
  dot1: DotType
  dot2: DotType
  distance: number
  distanceToCursor: number
  opacity: number
}

const canvas = document.getElementById('canvas') as HTMLCanvasElement
const cont = document.getElementById('canvas-container') as HTMLDivElement
canvas.width = cont.clientWidth
canvas.height = cont.clientHeight
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

const dots: DotType[] = []
let lines: LineType[] = []

const cursor = {
  x: -400,
  y: -400,
}

canvas.addEventListener('mousemove', (e) => {
  cursor.x = e.clientX
  cursor.y = e.clientY - canvas.offsetTop
})

canvas.addEventListener('mouseleave', () => {
  cursor.x = -400
  cursor.y = -400
})

const createDots = () => {
  for (let i = 0; i < 500; i++) {
    const dot = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      color: i % 75 === 0 ? '#fe3e57' : '#264b75',
      bearing: Math.random() * Math.PI * 2,
      move: () => {
        if (dot.x < 0) dot.x = canvas.width
        if (dot.x > canvas.width) dot.x = 0
        if (dot.y < 0) dot.y = canvas.height
        if (dot.y > canvas.height) dot.y = 0
        dot.x += Math.cos(dot.bearing) * 0.2
        dot.y += Math.sin(dot.bearing) * 0.2
      },
      draw: () => {
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2, false)
        ctx.fillStyle = dot.color
        ctx.fill()
      },
    }
    dots.push(dot)
  }
}

const createLines = () => {
  lines = []
  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots.length; j++) {
      const dot1 = dots[i]
      const dot2 = dots[j]
      const distance = Math.sqrt(
        Math.pow(dot1.x - dot2.x, 2) + Math.pow(dot1.y - dot2.y, 2)
      )
      const distanceToCursor = Math.sqrt(
        Math.pow(cursor.x - dot1.x, 2) + Math.pow(cursor.y - dot1.y, 2)
      )
      if (distanceToCursor < 50 && distance < 50) {
        console.log(distanceToCursor)
        lines.push({
          dot1,
          dot2,
          distance,
          distanceToCursor,
          opacity: 1 - distance / 50,
        })
      }
      if (distanceToCursor < 50) {
        lines.push({
          dot1,
          dot2: {
            x: cursor.x,
            y: cursor.y,
            color: '#062b60',
            bearing: 0,
            move: () => {},
            draw: () => {},
          },
          distance,
          distanceToCursor,
          opacity: 0.7 - distanceToCursor / 70,
        })
      }
    }
  }
}

createDots()
animate()

function animate() {
  requestAnimationFrame(animate)
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  dots.forEach((dot) => {
    dot.move()
    dot.draw()
  })
  createLines()
  lines.forEach((line) => {
    ctx.beginPath()
    ctx.moveTo(line.dot1.x, line.dot1.y)
    ctx.lineTo(line.dot2.x, line.dot2.y)
    ctx.strokeStyle = `rgba(170, 170, 254, ${line.opacity})`
    ctx.stroke()
  })
}
