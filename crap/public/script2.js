const idin = document.querySelector("#idin")
const textin = document.querySelector("#quotein")
const authorin = document.querySelector("#authorin")

document.querySelector("form").addEventListener('submit', async (e) => {
    e.preventDefault()
    const data = {
        id: idin.value,
        text: textin.value,
        author: authorin.value
    }
    
    const response = await fetch("/api/quote", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        // ...
      });
      
})