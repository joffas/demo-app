import Component from '@ember/component';
import { get, set } from '@ember/object';
import { next, bind } from '@ember/runloop';
import $ from 'jquery';
const { min, max, trunc } = Math;

export default Component.extend({

  tagName:    'hbox',
  classNames: ['ui-tabs'],

  _resizeListener: null,
  _clickTabListner: null,

  wrapperElement:   null,
  containerElement: null,
  activeTabElement: null,
  tabsElements:     null,

  wrapperElementWidth:   null,
  containerElementWidth: null,
  activeTabElementWidth: null,
  elementWidth:          null,

  offset:    150,
  oldOffset: 0,

  shouldPaginate: false,

  didInsertElement() {
    this._super(...arguments);

    this.findElements();

    next(this, this.handleResize);
    this._resizeListener = bind(this, this.handleResize);
    $(window).on('resize', this._resizeListener);

    this._clickTabListner = bind(this, this.handleTabClick);
    $('.ui-tab').on('click', this._clickTabListner);
  },

  willDestroyElement(){
    this._super(...arguments);
    $(window).off('resize', this._resizeListener);
    $('.ui-tab').off('click', this._clickTabListner);
  },

  findElements() {
    const [ wrapperElement ] = $('.ui-tabs-wrapper');
    const [ containerElement ] = $('.ui-tabs-container');
    const [ activeTabElement ] = $('.ui-tab.active');
    const tabsElements = $('.ui-tab');

    set(this, 'wrapperElement', wrapperElement);
    set(this, 'containerElement', containerElement);
    set(this, 'activeTabElement', activeTabElement);
    set(this, 'tabsElements', tabsElements);
  },

  handleResize(){
    this.calculateElementsWidth();
    const containerElementWidth = get(this, 'containerElementWidth');
    const elementWidth = get(this, 'elementWidth');

    const shouldPaginate = containerElementWidth > elementWidth;
    set(this, 'shouldPaginate', shouldPaginate);
    if(shouldPaginate){
      this.paginate();
    }else{
      this.removePagination();
    }
    const wrapperElement = get(this, 'wrapperElement');
    const wrapperElementWidth = this.getElementWidth(wrapperElement);
    set(this, 'wrapperElementWidth', wrapperElementWidth);
  },

  calculateElementsWidth(){
    const wrapperElement = get(this, 'wrapperElement');
    const wrapperElementWidth = this.getElementWidth(wrapperElement);
    set(this, 'wrapperElementWidth', wrapperElementWidth);

    const containerElement = get(this, 'containerElement');
    const containerElementWidth = this.getElementWidth(containerElement);
    set(this, 'containerElementWidth', containerElementWidth);

    const activeTabElement = get(this, 'activeTabElement');
    const activeTabElementWidth = this.getElementWidth(activeTabElement);
    set(this, 'activeTabElementWidth', activeTabElementWidth);

    const elementWidth = this.getElementWidth(this.element);
    set(this, 'elementWidth', elementWidth);
  },

  getElementWidth(element) {
    return trunc(element.getBoundingClientRect().width);
  },

  paginate(){
    const wrapperElement = get(this, 'wrapperElement');
    if(!wrapperElement.classList.contains('col-xs-10')){
      wrapperElement.classList.add('col-xs-10');
    }
    this.scrollToTab(get(this, 'activeTabElement'));
  },

  removePagination(){
    const wrapperElement = get(this, 'wrapperElement');
    if(wrapperElement.classList.contains('col-xs-10')){
      wrapperElement.classList.remove('col-xs-10');
    }
    this.resetContainerTransform();
  },

  resetContainerTransform(){
    const containerElement = get(this, 'containerElement');
    containerElement.style.transform = 'translateX(0px)';
  },

  scrollToTab(tabElement){
    const containerElement = get(this, 'containerElement');
    const wrapperElementWidth = get(this, 'wrapperElementWidth');

    const minOffset =  wrapperElementWidth - tabElement.offsetLeft - tabElement.offsetWidth;
    const newOffset = min(minOffset, 0);

    set(this, 'oldOffset', newOffset);
    containerElement.style = `transform: translateX(${newOffset}px)`;
  },

  handleTabClick(event) {
    const tabElement = event.currentTarget;
    set(this, 'activeTabElement', tabElement);
    this.scrollToTab(tabElement);
  },

  scroll(offset) {
    const containerElement = get(this, 'containerElement');
    const containerElementWidth = get(this, 'containerElementWidth');
    const wrapperElementWidth = get(this, 'wrapperElementWidth');

    const oldOffset = get(this, 'oldOffset');

    const minOffset =  wrapperElementWidth - containerElementWidth;
    const newOffset = min( max( (oldOffset + offset), minOffset ), 0 );

    set(this, 'oldOffset', newOffset);
    containerElement.style = `transform: translateX(${newOffset}px)`;
  },

  actions: {

    scrollLeft() {
      const offset = get(this, 'offset');
      this.scroll(offset);
    },

    scrollRight() {
      const offset = get(this, 'offset');
      this.scroll(-offset);
    }

  }

});
