import Mixin from '@ember/object/mixin';
import raw from 'ember-macro-helpers/raw';
import conditional from 'ember-awesome-macros/conditional';
import collect from 'ember-awesome-macros/collect';
import join from 'ember-awesome-macros/array/join';
import compact from 'ember-awesome-macros/array/compact';

export default Mixin.create({

  separator: ' ',
  classPrefix: 'col',
  classSeparator: '-',

  fit: false,
  xs: '',
  sm: '',
  md: '',
  lg: '',
  align: '',
  justify: '',
  alignContent: '',

  fitClass: conditional('fit', raw('flexi-fit'), raw(null)),
  xsClass: join(collect('classPrefix', raw('xs'), 'xs'), 'classSeparator'),
  smClass: join(collect('classPrefix', raw('sm'), 'sm'), 'classSeparator'),
  mdClass: join(collect('classPrefix', raw('md'), 'md'), 'classSeparator'),
  lgClass: join(collect('classPrefix', raw('lg'), 'lg'), 'classSeparator'),
  alignClass: join(collect(raw('align'), 'align'), 'classSeparator'),
  justifyClass: join(collect(raw('justify'), 'justify'), 'classSeparator'),
  alignContentClass: join(collect(raw('align-content'), 'alignContent'), 'classSeparator'),

  xsBreakpoint: conditional('xs', 'xsClass', raw(null)),
  smBreakpoint: conditional('sm', 'smClass', raw(null)),
  mdBreakpoint: conditional('md', 'mdClass', raw(null)),
  lgBreakpoint: conditional('lg', 'lgClass', raw(null)),
  alignClassName: conditional('align', 'alignClass', raw(null)),
  justifyClassName: conditional('justify', 'justifyClass', raw(null)),
  alignContentClassName: conditional('alignContent', 'alignContentClass', raw(null)),

  compactedClasses: compact(collect('fitClass', 'xsBreakpoint', 'smBreakpoint', 'mdBreakpoint', 'lgBreakpoint', 'alignClassName', 'justifyClassName', 'alignContentClassName')),

  flexiClasses: join('compactedClasses', 'separator')

});
