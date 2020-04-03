window.addEventListener('DOMContentLoaded', (event) => {
  if (document.getElementById('buyout')) {
    document.getElementById('buyout').addEventListener('click', (event) => {
      event.preventDefault()
      window.alert('Envoie les sous')
    })
  }
})
