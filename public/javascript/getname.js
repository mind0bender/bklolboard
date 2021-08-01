let getName = (cb) => {
  let name;
  const nameinp = document.getElementById("nameinp");
  const joinbtn = document.getElementById("joinbtn");
  nameinp.onkeyup = (e) => {
    if (e.key == "Enter") {
      name = nameinp.value;
      if (name.length > 20) {
        alert("username must contain less than 20 characters");
      } else {
        cb(name);
      }
    }
  };
  joinbtn.onclick = () => {
    name = nameinp.value;
    if (name.length > 20) {
      alert("username must contain less than 20 characters");
    } else {
      cb(name);
    }
  };
};
