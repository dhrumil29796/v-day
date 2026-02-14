let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()
    createFallingHearts()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.4
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'

    // Continuous confetti bursts
    setInterval(launchConfetti, 8000)
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00', '#e91e63', '#f06292']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst from center
    confetti({
        particleCount: 200,
        spread: 120,
        origin: { x: 0.5, y: 0.4 },
        colors,
        shapes: ['circle', 'square'],
        scalar: 1.2
    })

    // Heart-shaped confetti burst
    setTimeout(() => {
        confetti({
            particleCount: 80,
            spread: 70,
            origin: { x: 0.5, y: 0.5 },
            colors: ['#ff1493', '#ff69b4', '#e91e63'],
            shapes: ['circle'],
            scalar: 1.5
        })
    }, 500)

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        // Left cannon
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 60,
            origin: { x: 0, y: 0.7 },
            colors,
            scalar: 1.1
        })

        // Right cannon
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 60,
            origin: { x: 1, y: 0.7 },
            colors,
            scalar: 1.1
        })
    }, 250)
}

function createFallingHearts() {
    const container = document.getElementById('falling-hearts')
    const hearts = ['💕', '💗', '💖', '💝', '💓', '❤️', '💘', '💞', '🩷', '♥️']

    function createHeart() {
        const heart = document.createElement('div')
        heart.className = 'falling-heart'
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        heart.style.left = Math.random() * 100 + 'vw'
        heart.style.fontSize = (Math.random() * 20 + 14) + 'px'
        heart.style.animationDuration = (Math.random() * 4 + 4) + 's'
        heart.style.opacity = Math.random() * 0.5 + 0.3
        container.appendChild(heart)

        // Remove heart after animation
        setTimeout(() => {
            heart.remove()
        }, 8000)
    }

    // Create hearts continuously
    setInterval(createHeart, 200)

    // Initial burst of hearts
    for (let i = 0; i < 20; i++) {
        setTimeout(createHeart, i * 100)
    }
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}
