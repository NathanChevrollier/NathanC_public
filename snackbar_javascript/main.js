function snackbar() {
  //  Debut du Code
    const snackbar = document.getElementById("snackbar");
    snackbar.classList.add("animation")
 
    setTimeout(function() {
      snackbar.classList.remove("animation")
    }, 3000);  
}