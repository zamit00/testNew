// אנימציה כאשר הגולל מגיע לחלקים שונים של האתר
function chng(x){

    x.classList.toggle("change");
    var btn=document.getElementsByClassName('ser');
    Array.from(btn).forEach(element=>{
      if(element.className==="ser"){element.className="ser sera"}
      else{element.className="ser"}
     
      
  });
  var allDropdowns = document.querySelectorAll('.dropdown-content');
  allDropdowns.forEach(function(dropdown) {dropdown.style.display = "none";});
  }

  function taf(button) {

    var allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(function(dropdown) {
      if (dropdown !== button.nextElementSibling) {
        dropdown.style.display = "none";
        
      }
    });
  
    var dropdownContent = button.nextElementSibling;
    if (dropdownContent.style.display === "none" || dropdownContent.style.display === "") {
      
      dropdownContent.style.display = "block";  
    } else {
      dropdownContent.style.display = "none";   
    }
    if(window.innerWidth>768){  hover();}
    
  }

  function hisht(x) {

    const screenw=window.innerWidth;
    const screenh=window.innerHeight;
    const maxw=Math.min(screenw*0.95,800);
    const maxh=Math.min(screenh*0.95,600);
    const windowf=`width=${maxw},height=${maxh},resizable=yes,scrollbars=yes`;
    
    // פתיחת הקובץ בחלון חדש
    window.open( x, '_blank',  windowf
    );
  
    // סגירת תפריט ההמבורגר
    var hamburgerMenu = document.getElementById("tafrit");
    if (hamburgerMenu.classList.contains("change")) {
      hamburgerMenu.classList.remove("change");
    }
  
    // החזרת הכפתורים למצבם הרגיל
    var btns = document.getElementsByClassName('btn');
    Array.from(btns).forEach(function(btn) {
      if (btn.classList.contains("btna")) {
        btn.classList.remove("btna");
      }
    });
  
    // הסתרת כל התפריטים הפתוחים
    var allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(function(dropdown) {
      dropdown.style.display = "none";
    });
  }
