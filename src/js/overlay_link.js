/*!
 * slider 1.0.0
 * Made with create-jquery-plugin
 *
 * Created by KostiaO <kostiaomelcenko@gmail.com>
 *
 * @license MIT
 */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                // require('jQuery') returns a factory that requires window to
                // build a jQuery instance, we normalize how we use modules
                // that require this pattern but the window provided is a noop
                // if it's defined (how jquery works)
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    class OverlayLink {
        static TOP_SHIFT = 45;
        static LEFT_SHIFT = 30;
        static PERCANTAGE_REGULATOR = 10;

        static totalOverlays = 0;

        constructor(element, data) {
            const slide = $('<div>', 
                { 
                    class: 'slide',
                });

            for (const overlayElement of data) {
                const { 
                    left, 
                    top,
                    title,
                    description,
                } = overlayElement;

                OverlayLink.totalOverlays++;

                const overlayLinkCLass = `overlay-link-${OverlayLink.totalOverlays}`;
                const overlayClass = `overlay-${OverlayLink.totalOverlays}`;
                

                const button = this.createOverlayLink(overlayLinkCLass, left, top, title)
                                        .on("click", () => this.showHide(overlayClass));


                const overlay = this.createOverlay(overlayClass, title, description, left, top);

                slide.append(button, overlay);
            }

            $(element).append(slide);
        }

        createOverlayLink(className, left, top, title) {
            return $('<button>', {
                class: className,
                css: {
                    position: 'absolute',
                    left: `${left}`,
                    top: `${top}`,
                },
                text: `${title}`
            });
        }

        showHide(overlayClass) {
            const hiddenVaule = $(`.${overlayClass}`).attr("hidden");

            $(`.${overlayClass}`).attr("hidden", !hiddenVaule);
        }

        createOverlay(className, title, description, left, top) {
            const measureIdentifierIndexTop = top.includes("p") ? top.indexOf('p') : top.indexOf('%');
            const measureIdentifierIndexLeft = left.includes('p') ? left.indexOf('p') : left.indexOf('%');

            const clearTopNumber = Number(top.slice(0, measureIdentifierIndexTop));
            const measureMentsTop = top.slice(measureIdentifierIndexTop, top.length);

            const clearLeftNumber = Number(left.slice(0, measureIdentifierIndexLeft));
            const measureMentsLeft = left.slice(measureIdentifierIndexLeft, left.length);

            const topShift = measureMentsTop === "%" 
                ? OverlayLink.TOP_SHIFT / OverlayLink.PERCANTAGE_REGULATOR 
                : OverlayLink.TOP_SHIFT;

            const leftShift = measureMentsLeft === "%" 
                ? OverlayLink.LEFT_SHIFT / OverlayLink.PERCANTAGE_REGULATOR
                : OverlayLink.LEFT_SHIFT;
            
            return $('<div>', {
                class: className,
                hidden: true,
                css: {
                    position: 'absolute',
                    left: `${clearLeftNumber + leftShift}${measureMentsLeft}`,
                    top: `${clearTopNumber + topShift}${measureMentsTop}`
                }
            }).append(
                `${title}`,
                `${description}`
            );
        }
    }

   // Wrapper for the plugin
   $.fn.overlayArea = function (data) {
      new OverlayLink(this, data);
      return this;
   };
}));
