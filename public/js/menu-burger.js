function toggleMobileNav() {
	var x = document.getElementById("toggle-mobile-nav");
	var y = document.getElementById("menu");

	/* Show/hide nav */
	if (x.style.display === "block") {
		x.style.display = "none";
		y.style.background = "#242428";
		y.style.border = "3px solid #242428";
	} else {
		x.style.display = "block";
		y.style.border = "3px solid #f5f5f5";
		y.style.background = "#c3073f";
	}
}
