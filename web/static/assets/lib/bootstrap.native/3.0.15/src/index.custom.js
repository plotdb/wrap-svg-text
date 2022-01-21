// usage
// npm run custom
// INPUTFILE:src/index.yourFILE.js,
// OUTPUTFILE:dist/bootstrap-native-yourFileName.js,
// MIN:false,
// FORMAT:umd

import { one } from 'shorter-js/src/event/one.js';
import initCallback from './util/initCallback.js';
// import removeDataAPI from './util/removeDataAPI.js'

import componentsInit from './util/componentsInit.js';
// import Util from './util/util.js'
import { version as Version } from '../package.json';

// import Alert from './components/alert-native.js';
// import Button from './components/button-native.js';
import Carousel from './components/carousel-native.js';
// import Collapse from './components/collapse-native.js';
// import Dropdown from './components/dropdown-native.js';
// import Modal from './components/modal-native.js';
// import Offcanvas from './components/offcanvas-native.js';
// import Popover from './components/popover-native.js';
// import ScrollSpy from './components/scrollspy-native.js';
// import Tab from './components/tab-native.js';
// import Toast from './components/toast-native.js';
// import Tooltip from './components/tooltip-native.js';

// componentsInit.Alert = [ Alert, '.alert'];
// componentsInit.Button = [ Button, '[data-bs-toggle="button"]'];
componentsInit.Carousel = [Carousel, '.carousel'];
// componentsInit.Collapse = [ Collapse, '.collapse']
// componentsInit.Dropdown = [ Dropdown, '[data-bs-toggle="dropdown"]']
// componentsInit.Modal = [ Modal, '.modal'];
// componentsInit.Offcanvas = [ Modal, '.offcanvas'];
// componentsInit.Popover = [ Popover, '[data-bs-toggle="popover"],[data-bs-tip="popover"]'];
// componentsInit.ScrollSpy = [ ScrollSpy, '[data-bs-spy="scroll"]'];
// componentsInit.Tab = [ Tab, '[data-bs-toggle="tab"]'];
// componentsInit.Toast = [ Toast, '.toast'];
// componentsInit.Tooltip = [ Tooltip, '[data-bs-toggle="tooltip"],[data-bs-tip="tooltip"]'];

// bulk initialize all components
if (document.body) initCallback();
else one(document, 'DOMContentLoaded', initCallback);

export default {
  // Alert,
  // Button,
  Carousel,
  // Collapse,
  // Dropdown,
  // Modal,
  // Popover,
  // ScrollSpy,
  // Tab,
  // Toast,
  // Tooltip,

  // initCallback,
  // removeDataAPI,
  // componentsInit,
  // Util,
  Version,
};
