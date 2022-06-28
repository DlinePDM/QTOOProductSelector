//scripts for controling the menus/image and bom population/datasheet exports
window.addEventListener("load", function() {

    //establish that user is not in the item selection menu
    var menuclick = false;
    var selection = false;
  
    //events that occur if menu is clicked
    $(".sidebar-navigation nav li a").on('click', function() {
  
      //menu hierarchy setup
      var parentLevel = $(this).parents('ul').length - 1;
      var currentMenu = $(this).closest('ul');
      var currentListItem = $(this).parent('li');
      var parentMenu = $('.level-' + parentLevel);
      var subMenu = $(this).next('ul');
  
      //hide slideshow and starting menu title when the menu is clicked initially
      $("#container img").css("visibility", "hidden");
      $(".image-styled").css("visibility", "hidden");
      $(".sidebar-navigation .title").css("visibility", "hidden");
  
      //establish that user is in the item selection menu
      menuclick = true;
  
  
      //back button hit
      if (currentListItem.hasClass('back')) {
  
        //clear arrays
        var itemNumbers = [];
        var itemQuantities = [];
        var itemDescriptions = [];
        var desc = [];
        var itemNumbers = [];
        var chi = [];
        var par = [];
        var pos = [];
        var locations = [];
  
        //deactivate submenu, unhide main menu
        currentMenu.removeClass('active');
        parentMenu.removeClass('hidden');
  
        //make slideshow and start menu title visible
        $("#container img").css("visibility", "visible");
        $(".image-styled").css("visibility", "visible");
        $(".sidebar-navigation .title").css("visibility", "visible");
  
        //hide the BOM section
        $('.BOM').show().animate({
          'width': '0'
        }, 200);
  
        //hide user selected images 
        $(".itemimage").attr("src", "");
  
        //establish that user is not in the item selection menu
        menuclick = false;
        $('.selects').val("");
        window.content = [];
      }
  
      //user enters submenu
      else if (currentListItem.children('ul').length > 0) {
  
        //hide main menu, activate submenu
        subMenu.toggleClass('active');
        currentMenu.addClass('hidden');
  
        //assign the image path for built in kit for selected layout (bomimage), to initial layer of user selected product graphics (baseitem)
        var currentImage = $(this).attr("bomimage");
        $("#baseitem").attr("src", currentImage + ".svg")
  
        //determine which layout was selected and expand the appropriate BOM panel
        var currentBOM = $(this).attr('bom-id');
        var BOM = $(this);
        $('#' + currentBOM).show().animate({
          'width': '300'
        }, 200);
  
        //determine amount of selection boxes in window
        var lengthe = $(this).attr('amount');
  
  
        //create arrays the length of the election box amount
        var itemNumbers = new Array(lengthe);
        var itemQuantities = new Array(lengthe);
        var itemDescriptions = new Array(lengthe);
        var desc = new Array(lengthe);
        var locations = new Array(lengthe);
        var chi = new Array(lengthe);
        var par = new Array(lengthe);
        var pos = new Array(lengthe);
  
        //setup 0'th element of all arrays as base item attributes
        itemNumbers[0] = $(this).attr('itemnumber');
        itemQuantities[0] = $(this).attr('quantity');
        itemDescriptions[0] = $(this).attr('base');
        desc[0] = itemNumbers[0] + itemQuantities[0] + " - " + itemDescriptions[0];
        chi[0] = $(this).attr('childPosition');
        par[0] = $(this).attr('parentID');
        pos[0] = ""
        locations[0] = $(this).attr('bomimage');
        var i=0;
                  //loop through selection boxes
                  function mainfunction(){  
                    $(".selects").each(function() {
                      //only consider values of selects in current BOM layout
                      if ($(this).attr('bom-id') == currentBOM) {
                        i++;
                        itemNumbers[i] = $("option:selected", this).attr('itemnumber');
                        
                        desc[i] = itemNumbers[i] + $("option:selected", this).attr('quantity') + " - " + $("option:selected", this).text();
                        chi[i] = $("option:selected", this).attr('childPosition');
                        par[i] = $(this).attr('parentID');
                        pos[i] = chi[parseInt(par[i])];
                        if (itemNumbers[i] == "") {
                          itemNumbers[i] = "blank";
                        }
                      }
                    });
                    
                    i = 0;
                    for (let a = 1; a < lengthe; a++) {
                      pos[a] = chi[parseInt(par[a])];
                      if (typeof pos[a] == "undefined") {
                        pos[a] = "";
                      }
                      locations[a] = "SVG/items/" + itemNumbers[a] + pos[a] + ".svg";
                      console.log(locations[a]);
                    }
                    i = 0;
                    $(".selects").each(function() {
                      i++
                      var currentCount2 = $('option:selected', this).attr('itemcount');
                      $("#item" + currentCount2).attr("src", locations[i]);
                      $("#item" + currentCount2).offset($("#baseitem").offset())
                    });
                    i = 0;
                    //retrieve selection text
                    var items = $("option:selected", this).text();

                    //retrieve selection id for further determining the BOM line for selection text
            
                    //retrieve selection quantity for output
                    var itemquantity = $('option:selected', this).attr('quantity');
            
                    //retrieve selection image source for selection
                    var currentSelection = $('option:selected', this).attr('imagesrc');
            
                    //retrieve item number for export
                    var currentNumber = $('option:selected', this).attr('itemnumber');
            
                    //retrieve item count number for placement into the image container
            
            
                    //define the BOM line for selection text
            
                    //place selection text into the BOM line
          
            
                    //Create new arrays for determining paths based on parent children relations
                    //Create function if changed item is a parent
                    //Create a loop to update paths after each change with respect to paths
            
                    //change image source for the respective image in the image container to selection source
            
            
                    //stich image layers
            
            
                    //populate arrays for output
                    //itemNumbers=currentNumber;
                    itemQuantities = itemquantity;
                    itemDescriptions = items;
            
                    var currentCount = $('option:selected', this).attr('itemcount');
            
                    desc[parseInt(currentCount)] = "a"//itemNumbers + itemQuantities + " - " + itemDescriptions;
                    var desc2 = "";
            
                    for (let a = 0; a < lengthe; a++) {
                      if(typeof desc[a]!=="undefined"){
                      desc2 = desc2 + desc[a] + "\n"
                      //console.log(desc2);
                    }
                    }
                    //file download function
            
                    window.content = desc2;
                  }
        mainfunction();
  
        //events that occur when changing a selection box
        $('.selects').on('change', function() {
          var i=0;
          itemselection = $('option:selected', this).attr('id');
          item = $("option:selected", this).text();
          console.log(item);
          BOM = currentBOM + itemselection;
          $("#" + BOM).text(item);
          mainfunction();
        });
        
      }
  
  
    });
  
    function download(filename, text) {
      var element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
  
      element.style.display = 'none';
      document.body.appendChild(element);
  
      element.click();
  
      document.body.removeChild(element);
    }
  
    $("#exporter").click(function() {
      download("output.txt", content);
    });
  
    $(".sidebar-navigation nav li a").on('mouseover', function() {
      var currentImage = $(this).attr('data-image');
      if (menuclick == false) {
        $("#container img").css("visibility", "visible");
        $("#layout").attr("src", currentImage)
      }
    })
    $(".sidebar-navigation nav li a").on('mouseout', function() {
      if (menuclick == false) {
        $("#container img").css("visibility", "hidden");
      }
    })
  
    $('.sidebar-navigation').hover(function() {
      if (menuclick == false) {
        $('.sidebar-navigation').show().animate({
          'left': '0'
        }, 200);
      }
    }, function() {
      if (menuclick == false) {
        $('.sidebar-navigation').animate({
          'left': '-250'
        }, 200, function() {});
      }
    });
  
  });
  