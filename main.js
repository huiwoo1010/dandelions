const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const TOTAL = 100
const petalArray = []

const petalImg = new Image()
petalImg.src = './wings.png'
petalImg.onload = () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal())
  }
  render()
} //이미지 불러오기가 끝난 후 애니메이션이 실행되도록

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  petalArray.forEach(petal => {
    petal.animate()
  })

  window.requestAnimationFrame(render) //재귀, 반복실행
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

// 벚꽃 잎 클래스
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height * 2 - canvas.height
    this.w = 30 + Math.random() * 15
    this.h = 20 + Math.random() * 10
    this.opacity = this.w / 45
    this.xSpeed = 2 + Math.random()
    this.ySpeed = 1 + Math.random() * 0.5
    this.flip = Math.random()
    this.flipSpeed = Math.random() * 0.02
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) { //씨앗이 화면 밖으로 날아가면 다시 그리기
      this.x = -petalImg.width
      this.y = Math.random() * canvas.height * 2 - canvas.height
      this.xSpeed = 2 + Math.random()
      this.ySpeed = 1 + Math.random() * 0.5
      this.flip = Math.random()
    }
    ctx.globalAlpha = this.opacity  //멀리 있는 씨앗 흐리게 보이기
    ctx.drawImage(
      petalImg,
      this.x,
      this.y,
      this.w * (0.66 + (Math.abs(Math.cos(this.flip)) / 4)),
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 3)),
    )
  }

  animate() {
    this.x += this.xSpeed
    this.y += this.ySpeed
    this.draw()
    this.flip += this.flipSpeed
  }
}