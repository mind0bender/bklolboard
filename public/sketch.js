let socket;
let username;
let maincanvas;

function setup() {
  getName((name) => {
    maincanvas = createCanvas(window.innerWidth, window.innerHeight);
    socket = io({
      query: {
        username: name,
      },
    });
    socket.on("joinconfirmed", (user) => {
      username = user.username;
      const namepopup = document.getElementById("namepopup");
      namepopup.classList.add("hidden");
      notify(`Joined as \"${username}\"`);
    });
  });
}

function draw() {
  background(220);
}
