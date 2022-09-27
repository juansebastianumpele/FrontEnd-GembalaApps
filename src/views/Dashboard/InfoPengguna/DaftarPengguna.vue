<script>
export default {
  metaInfo: () => ({
    title: "Info Pengguna",
  }),
  data: () => ({
    pageTitle: "Data Pengguna",
    dt: {
      column: [
        {
          name: "username",
          th: "Username",
        },
        {
          name: "nama_peternakan",
          th: "Nama Peternakan",
        },
        {
          name: "alamat",
          th: "Alamat",
        },
        {
          name: "email",
          th: "Email",
        },
        {
          name: "nomor_telepon",
          th: "Nomor Telepon",
        },
        {
          name: "level_akun",
          th: "Level Akun",
        },
      ],
      action: [
        {
          text: "Detail",
          color: "info",
          event: "detail-kandang",
        },
        {
          text: "Ubah",
          color: "warning",
          event: "ubah-kandang",
        },
        {
          text: "Delete",
          color: "danger",
          event: "hapus-kandang",
        },
      ],
    },
  }),
};
</script>

<template>
  <main-layout :title="pageTitle" disable-padding>
    <template #header>
      <div class="row align-items-center">
        <div class="col-auto">
          <h3>Daftar {{ pageTitle }}</h3>
        </div>
      </div>
      <br />
      <div>
        <base-dropdown
          menu-on-left
          class="nav-item"
          tag="div"
          title-tag="button"
          title="Level Akun"
          title-classes="btn btn-success"
        >
          <div class="dropdown-item">test 1</div>
          <div class="dropdown-item">test 2</div>
        </base-dropdown>
      </div>
    </template>
    <template #body>
      <empty-result v-if="0" :text="`${pageTitle}`" />
      <data-table
        v-else
        :index="true"
        :data="g$kandangList"
        :columns="dt.column"
        :actions="dt.action"
      />
    </template>
  </main-layout>
</template>
