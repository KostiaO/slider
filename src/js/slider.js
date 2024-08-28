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
   class Slider {

    constructor(element, data) {

        this.data = data.map((entity, index) => {
            return {
                ...entity,
                id: `${entity.btnName}${index}`
            };
        });

        this.currentSlide = 0;

        this.selector = $(element).attr('class');

        // Main container element
        this.main = $(`.${this.selector}`);

        // Initial load
        this._init();
    }
    _init(){
        this.slider();
    }
    slider(){
       this.initSlider();
    }

    initSlider() {
        this.setSliderImage(this.data[this.currentSlide].bcgUrl);

        this.initBtns();

        for (let i = 0; i < this.data.length; i++) {
           $(`#${this.data[i].id}`).on("click", () => {
               this.handleClassRemoveActive(this.currentSlide);
               this.changeSlide(i);
               this.handleClassSetActive(i);
               this.setSliderImage(this.data[this.currentSlide].bcgUrl);
               this.initOverlayGroup(i);
           });

           this.handleClassSetActive(i);
           this.initOverlayGroup(i);
        }
    }

    initBtns() {
        const buttons = this.data.map((entity) => {
            return `<button class="${entity.btnClassName}" id="${entity.id}">${entity.btnName}</button>`;
        });

        this.main.append(`<div class="${this.selector}_buttons">${buttons.join('')}</div>`);
    }

    clearOverlayGroups() {
        $(".slide").remove();
    }

    initOverlayGroup(index) {
        if (index === this.currentSlide) {
            this.clearOverlayGroups();

            const pickedSlide = this.data[index].overlayGroup;

            const overlayData = pickedSlide ? pickedSlide : null;

            if (overlayData) {
                this.main.overlayArea(overlayData);
            }
        }
    }

    changeSlide(slideNum) {
       this.currentSlide = slideNum;
    }

    handleClassSetActive(index) {
       if (index === this.currentSlide) {
           $(`#${this.data[index].id}`).addClass('is-active');
       }
    }

    handleClassRemoveActive(index) {
       $(`#${this.data[index].id}`).removeClass('is-active');
    }

    setSliderImage(url) {
       this.main.css('background-image', 'url(' + url + ')');
    }
   }

   // Wrapper for the plugin
   $.fn.slider = function (data) {
      new Slider(this, data);

      return this;
   };
}));
