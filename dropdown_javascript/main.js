const dropdowns = Array.from(document.querySelectorAll(".dropdown-btn"));

dropdowns.map((dropdown) => {
  dropdown.addEventListener("click", function() {
    const dropdownContainer = this.nextElementSibling;

    if (dropdownContainer.style.display === "block") {
      dropdownContainer.style.display = "none";
    } 
    else {

      dropdowns.forEach((otherDropdown) => {
        const otherDropdownContainer = otherDropdown.nextElementSibling;
        
        if (otherDropdown !== dropdown) {
          otherDropdownContainer.style.display = "none";
        }
      });

      dropdownContainer.style.display = "block";
    }
  });
});


document.querySelectorAll(".dropdown-container a").forEach(link => {
  link.addEventListener("click", function() {

    this.closest('.dropdown-container').style.display = "none";
  });
});

document.addEventListener("click", function(event) {
  dropdowns.forEach((dropdown) => {
    const dropdownContainer = dropdown.nextElementSibling;
    if (!dropdown.contains(event.target) && !dropdownContainer.contains(event.target)) {
      dropdownContainer.style.display = "none";
    }
  });
});