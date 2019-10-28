(function ($) {
  Drupal.behaviors.jobform = {
    attach : function(context) {
      target = "input.js-text-full";
      $(target, context).keypress(function(event) {
        if ( event.which == 13 ) { // Enter key
          event.preventDefault();
          set = $(target);
          for (i = 0; i < set.length; i++) {
            if (set[i] == this) {
              if (i + 1 == set.length) {
                // On the last item, focus on first
                $(set[0]).focus();
              }
              else {
                // Focus on next item
                $(set[i + 1]).focus();
              }
            }
          }
        }
      });
    }
  };
})(jQuery);