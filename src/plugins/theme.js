import SidebarPlugin from '@/components/SidebarPlugin';

import GlobalComponents from './globalComponents';
import GlobalDirectives from './globalDirectives';

import '@/assets/sass/argon.scss';

import '@/assets/vendor/fontawesome-free/css/all.min.css';
import '@/assets/vendor/multiselect/vue-multiselect.min.css';
import '@/assets/vendor/flatpickr/style.css';
import '@/assets/vendor/flatpickr/monthStyle.css';

import 'bootstrap/dist/js/bootstrap.min';

export default {
  install(app) {
    app.use(SidebarPlugin);
    app.use(GlobalComponents);
    app.use(GlobalDirectives);
  },
};
