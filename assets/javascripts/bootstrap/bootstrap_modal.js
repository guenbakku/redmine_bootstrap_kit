$(window).resize(function() {
  $(".ui-dialog-content").dialog("option", "position", ['center', 'center']);
});

function openModalBox(element, type) {
  var buttons = {};

  if (type == 'modal-box') {
    var label_save   = $('#modal-box').data('label-save');
    var label_cancel = $('#modal-box').data('label-cancel');
    buttons[label_save]   = function(){ $(this).find('form').submit(); };
    buttons[label_cancel] = function(){ $(this).dialog('close'); };
  } else {
    var label_ok = $('#modal-box').data('label-ok');
    buttons[label_ok] = function(){ $(this).dialog('close'); };
  }

  $('#modal-box').dialog({
    resizable: false,
    autoOpen: false,
    height: 'auto',
    width: 'auto',
    modal: true,
    hide: {
      effect: "fade",
      duration: 500
    },
    buttons: buttons
  });

  var title = $(element).html();
  $.get($(element).attr('href'), function(data){
    $('#modal-box').html(data);
    $('#modal-box').dialog('option', 'title', title);
    $('#modal-box').dialog('open');
  });
}


// Transform div in Dialog box
// Backward compatibility
function initModalBoxes(modals){
  
  $(modals.modal_list).each(function() {

    var buttons_list = {};

    if (this.mode == 'standard'){
      buttons_list[modals.label_save]   = function(){$(this).find('form').submit();};
      buttons_list[modals.label_cancel] = function(){$(this).dialog('close');};
    } else if (this.mode == 'close-only'){
      buttons_list[modals.label_ok] = function(){$(this).dialog('close');};
    }

    $(this.target).dialog({
      resizable: false,
      autoOpen: false,
      height: 'auto',
      width: 'auto',
      modal: true,
      hide: {
        effect: "fade",
        duration: 500
      },
      buttons: buttons_list,
    });

    setUpModalBox(this.source, this.target);
  });
}


// Bind links on Dialog box
// Backward compatibility
function setUpModalBox(source, target) {
  $(source).each(function() {
    $(this).on('click', function() {
      var title = $(this).html();
      $.get($(this).attr('href'), function(data){
        $(target).html(data);
        $(target).dialog('option', 'title', title);
        $(target).dialog('open');
      });
      return false;
    });
  });
}