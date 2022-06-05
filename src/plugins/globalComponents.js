import MainLayout from '@/layout/MainLayout.vue';
import EmptyResult from '@/components/EmptyResult.vue';

import Badge from '@/components/BadgeComp.vue';
import BaseButton from '@/components/BaseButton.vue';
import BaseCheckbox from '@/components/Inputs/BaseCheckbox.vue';
import BaseDropdown from '@/components/BaseDropdown.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import BaseInput from '@/components/Inputs/BaseInput.vue';
import BaseNav from '@/components/Navbar/BaseNav.vue';
import BasePagination from '@/components/BasePagination.vue';
import BaseProgress from '@/components/BaseProgress.vue';
import BaseRadio from '@/components/Inputs/BaseRadio.vue';
import BaseSwitch from '@/components/BaseSwitch.vue';
import Card from '@/components/Cards/Card.vue';
import StatsCard from '@/components/Cards/StatsCard.vue';
import Modal from '@/components/ModalComp.vue';

import BaseTable from '@/components/BaseTable.vue';
import BaseMap from '@/components/BaseMap.vue';

import { Field, Form } from 'vee-validate';

import DataTable from '@/components/DataTable.vue';
import VueMultiselect from 'vue-multiselect';
import VueFlatPickr from 'vue-flatpickr-component';

const GlobalComponents = {
  install(app) {
    // Base Layout
    app.component('MainLayout', MainLayout);
    app.component('EmptyResult', EmptyResult);
    // Base Component
    app.component('BadgeComp', Badge);
    app.component('BaseButton', BaseButton);
    app.component('BaseCheckbox', BaseCheckbox);
    app.component('BaseDropdown', BaseDropdown);
    app.component('BaseInput', BaseInput);
    app.component('BaseNav', BaseNav);
    app.component('BaseHeader', BaseHeader);
    app.component('BasePagination', BasePagination);
    app.component('BaseProgress', BaseProgress);
    app.component('BaseRadio', BaseRadio);
    app.component('BaseSwitch', BaseSwitch);
    app.component('CardComp', Card);
    app.component('ModalComp', Modal);
    app.component('StatsCard', StatsCard);
    // Map
    app.component('BaseMap', BaseMap);
    app.component('BaseTable', BaseTable);
    // Form Comps
    app.component('FieldForm', Field);
    app.component('FormComp', Form);
    // Multi Select
    app.component('DataTable', DataTable);
    app.component('MultiSelect', VueMultiselect);
    app.component('FlatPickr', VueFlatPickr);
  },
};

export default GlobalComponents;
