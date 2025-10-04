/**
 * Enhanced Passive Events Fix
 * This script provides a comprehensive fix for passive event listener warnings
 * It patches both native addEventListener and jQuery's event handling
 */

(function() {
    'use strict';
    
    
    // Store original methods
    var originalAddEventListener = EventTarget.prototype.addEventListener;
    var originalRemoveEventListener = EventTarget.prototype.removeEventListener;
    
    // Events that should be passive for better performance
    var passiveEvents = [
        'touchstart',
        'touchmove', 
        'touchend',
        'touchcancel',
        'wheel',
        'mousewheel',
        'DOMMouseScroll'
    ];
    
    // Function to ensure passive option
    function ensurePassive(type, options) {
        if (passiveEvents.indexOf(type) !== -1) {
            if (typeof options === 'boolean') {
                return { capture: options, passive: true };
            } else if (!options) {
                return { passive: true };
            } else if (options.passive === undefined) {
                return Object.assign({}, options, { passive: true });
            }
        }
        return options;
    }
    
    // Patch addEventListener
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        options = ensurePassive(type, options);
        return originalAddEventListener.call(this, type, listener, options);
    };
    
    // Patch removeEventListener  
    EventTarget.prototype.removeEventListener = function(type, listener, options) {
        options = ensurePassive(type, options);
        return originalRemoveEventListener.call(this, type, listener, options);
    };
    
    // Wait for jQuery to load and patch it too
    function patchJQuery() {
        if (typeof jQuery !== 'undefined' && jQuery.fn && jQuery.fn.on) {
            
            // Store original jQuery methods
            var originalJQueryOn = jQuery.fn.on;
            var originalJQueryOff = jQuery.fn.off;
            
            // Patch jQuery's on method
            jQuery.fn.on = function(types, selector, data, fn) {
                // Handle different argument patterns
                if (typeof selector === 'function') {
                    fn = selector;
                    selector = undefined;
                }
                if (typeof data === 'function') {
                    fn = data;
                    data = undefined;
                }
                
                // If it's a passive event, ensure passive option
                var eventTypes = types.split(' ');
                for (var i = 0; i < eventTypes.length; i++) {
                    if (passiveEvents.indexOf(eventTypes[i]) !== -1) {
                        // Add passive option to the event data
                        if (!data) data = {};
                        if (typeof data === 'object' && !data.passive) {
                            data.passive = true;
                        }
                        break;
                    }
                }
                
                return originalJQueryOn.call(this, types, selector, data, fn);
            };
            
            // Patch jQuery's off method
            jQuery.fn.off = function(types, selector, fn) {
                return originalJQueryOff.call(this, types, selector, fn);
            };
            
        } else {
            // If jQuery isn't loaded yet, try again later
            setTimeout(patchJQuery, 50);
        }
    }
    
    // Start patching jQuery
    patchJQuery();
    
    // Also patch when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Enhanced passive events fix applied
    });
    
})();
