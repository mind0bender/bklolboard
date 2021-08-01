let notify = (msg) => {
  const notification = document.getElementById("notification");
  notification.classList.remove("opacity-0", "hidden", "translate-x-96");
  notification.innerText = msg;
  setTimeout(() => {
    notification.classList.add("translate-x-96", "opacity-0");
    setTimeout(() => {
      notification.classList.add("hidden");
    }, 300);
  }, 2000);
};
