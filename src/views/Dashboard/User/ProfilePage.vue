<script>
import { mapActions, mapState } from "pinia";
import d$user from "@/stores/user";

import { object as y$object, string as y$string, ref as y$ref } from "yup";

export default {
  metaInfo: () => ({
    title: "Profil Pengguna",
  }),
  setup() {
    const schema = y$object({
      password: y$string().min(5).required().label("Sandi lama"),
      new_password: y$string().min(5).required().label("Sandi Baru"),
      repeat_password: y$string()
        .oneOf([y$ref("new_password")], "Sandi Baru Tidak Cocok")
        .required()
        .label("Konfirmasi Sandi Baru"),
    });
    return {
      schema,
    };
  },
  data: () => ({
    pageTitle: "Profil",
    // Input
    input: {
      password: "",
      new_password: "",
      repeat_password: "",
      nama_pengguna: "",
      email: "",
      nomor_telepon: "",
      alamat: "",
      nama_peternakan: "",
      foto: "",
      fotoUrl: "",
    },
    // UI
    modal: {
      changePw: false,
      editProfile: false,
      daftarBod: false,
      hapusAkun: false,
    },
  }),
  computed: {
    ...mapState(d$user, ["g$userDetail", "g$userPeternakan"]),
    modals() {
      return Object.values(this.modal).includes(true);
    },
  },
  watch: {
    modals(val) {
      if (!val) {
        this.clearInput();
      } else {
        this.input.nama_pengguna = this.g$userDetail.nama_pengguna;
        this.input.email = this.g$userDetail.email;
        this.input.nomor_telepon = this.g$userDetail.nomor_telepon;
        this.input.alamat = this.g$userPeternakan.alamat;
        this.input.nama_peternakan = this.g$userPeternakan.nama_peternakan;
      }
    },
  },
  async mounted() {
    await this.a$userDetail().catch((error) => this.notify(error, false));
  },
  methods: {
    ...mapActions(d$user, [
      "a$userChangePw",
      "a$userDetail",
      "a$userChangeProfile",
      "a$userRegisterBod",
      "a$hapusAkun",
    ]),
    async clearInput() {
      this.input = {
        password: "",
        new_password: "",
        repeat_password: "",
      };
    },
    resetImage() {
      this.input.fotoUrl = "";
      this.input.foto = "";
    },
    // Daftar akun BoD
    async registerBod() {
      const { email } = this.input;
      const data = {
        email,
      };
      await this.a$userRegisterBod(data)
        .then(() => {
          this.notify(
            "Masuk sebagai BoD dengan email dan password yang ada pada pesan email",
            true
          );
          this.modal.daftarBod = false;
        })
        .catch((error) => this.notify(error, false));
    },

    //edit password
    async editPassword() {
      try {
        const { password, new_password, repeat_password } = this.input;
        const data = {
          kata_sandi: password,
          kata_sandi_baru: new_password,
          ulangi_kata_sandi_baru: repeat_password,
        };
        // await this.schema.validate(data);
        await this.a$userChangePw(data);
        console.log(data);
        this.modal.changePw = false;
        this.notify("Edit Sandi Sukses!");
      } catch (error) {
        this.notify(error, false);
      } finally {
        this.a$userDetail();
      }
    },
    //edit profile
    async editProfile() {
      try {
        const { nama_pengguna, nomor_telepon, alamat, nama_peternakan } =
          this.input;
        const data = {
          nama_pengguna,
          nomor_telepon,
          alamat,
          nama_peternakan,
        };
        // await this.schema.validate(data);
        await this.a$userChangeProfile(data);
        console.log(data);
        this.modal.editProfile = false;
        this.notify("Edit Profil Sukses!");
        this.a$userDetail();
      } catch (error) {
        this.notify(error, false);
      }
    },
    async hapusAkun() {
      try {
        const { password } = this.input;
        const data = {
          kata_sandi: password,
        };
        await this.a$hapusAkun(data);
        console.log(data);
        this.modal.hapusAkun = false;
        this.notify("Hapun akun berhasil!");
        this.a$userDetail();
      } catch (error) {
        this.notify(error, false);
      }
    },
    handleFileUpload() {
      const file = this.$refs.foto.files[0];
      this.input.foto = file;
      this.input.fotoUrl = URL.createObjectURL(this.input.foto);
    },
  },
};
</script>

<template>
  <main-layout :title="pageTitle">
    <template #header>
      <div class="text-center">
        <img :src="siteMeta.profile" alt="profile" class="rounded-circle" style="width: 200px; height: 200px" />
      </div>
      <div class="row align-items-center">
        <div class="col">
          <h3>{{ pageTitle }}</h3>
        </div>
        <div class="col text-right">
          <base-button type="primary" @click="modal.daftarBod = true">
            Daftarkan Akun BoD
          </base-button>
          <base-button type="success" @click="modal.editProfile = true">
            Edit Profile
          </base-button>
          <base-button type="warning" @click="modal.changePw = true">
            Ganti Sandi
          </base-button>
          <base-button type="danger" @click="modal.hapusAkun = true">
            Hapus Akun
          </base-button>
        </div>
      </div>
    </template>
    <template #body>
      <form-comp :validation-schema="schema">
        <div class="row">
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.nama_pengguna" type="text" name="nama_pengguna">
              <base-input v-bind="field" placeholder="Nama Pengguna" label="Nama Penguna" disabled></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userPeternakan.nama_peternakan" type="text"
              name="nama_peternakan">
              <base-input v-bind="field" placeholder="Nama Peternakan" label="Nama Peternakan" disabled></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model.number="g$userDetail.email" type="email" name="email">
              <base-input v-bind="field" placeholder="Email" type="email" label="Email" disabled></base-input>
            </field-form>
          </div>
          <div class="col-6">
            <field-form v-slot="{ field }" v-model="g$userDetail.nomor_telepon" type="number" name="nomor_telepon">
              <base-input v-bind="field" placeholder="Nomor Telepon" label="Nomor Telepon" disabled></base-input>
            </field-form>
          </div>
          <div class="col-12">
            <field-form v-slot="{ field }" v-model="g$userPeternakan.alamat" type="text" name="alamat">
              <base-input v-bind="field" placeholder="Alamat" label="Alamat" disabled></base-input>
            </field-form>
          </div>
        </div>
      </form-comp>
    </template>

    <template #modal>
      <!-- Daftar BoD -->
      <modal-comp v-model:show="modal.daftarBod" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Daftar Akun Board of Directors</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.daftarBod" :validation-schema="schema">
            <div class="row">
              <!-- Email BoD -->
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.email" type="email" name="email">
                  <base-input v-bind="field" type="email" placeholder="Email" label="Email Akun Board of Directors"
                    addon-left-icon="fas fa-envelope" required></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.daftarBod = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="registerBod()">
            Daftarkan
          </base-button>
        </template>
      </modal-comp>

      <!-- Edit profil -->
      <modal-comp v-model:show="modal.editProfile" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Edit Profile</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.editProfile" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_pengguna" type="text" name="nama_pengguna">
                  <base-input v-bind="field" type="text" placeholder="Nama Pengguna" label="Nama Penguna"
                    addon-left-icon="fas fa-user"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nomor_telepon" type="text" name="nomo_telepon">
                  <base-input v-bind="field" type="text" placeholder="Nomor Telepon" label="Nomor Telepon"
                    addon-left-icon="fas fa-phone"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.alamat" type="text" name="alamat">
                  <base-input v-bind="field" type="text" placeholder="Alamat" label="Alamat"
                    addon-left-icon="fas fa-location-arrow"></base-input>
                </field-form>
              </div>
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.nama_peternakan" type="text" name="nama_peternakan">
                  <base-input v-bind="field" type="text" placeholder="Nama Peternakan" label="Nama Peternakan"
                    addon-left-icon="fas fa-user"></base-input>
                </field-form>
              </div>
              <div class="col-12" v-if="!this.input.foto">
                <div class="form-group has-label">
                  <label class="form-control-label">Foto</label>
                  <input class="form-control file" id="foto" type="file" ref="foto" accept="image/*"
                    @change="handleFileUpload()" />
                </div>
              </div>
              <div class="col-6" v-if="this.input.fotoUrl">
                <div class="text-center pb-2">
                  <base-button type="danger" size="sm" @click="resetImage()">
                    Reset Image
                  </base-button>
                </div>
                <div class="text-center">
                  <img width="250" v-if="input.fotoUrl" :src="input.fotoUrl" />
                </div>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.editProfile = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editProfile()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- Ganti sandi -->
      <modal-comp v-model:show="modal.changePw" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Ganti Sandi</h3>
        </template>
        <template #body>
          <form-comp v-if="modal.changePw" :validation-schema="schema">
            <div class="row">
              <div class="col-12">
                <field-form v-slot="{ field }" v-model="input.password" type="password" name="password">
                  <base-input v-bind="field" type="password" placeholder="Sandi Lama" label="Sandi Lama" password>
                  </base-input>
                </field-form>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.new_password" type="new_password" name="new_password">
                  <base-input v-bind="field" type="password" placeholder="Sandi Baru" label="Sandi Baru" password>
                  </base-input>
                </field-form>
              </div>
              <div class="col-6">
                <field-form v-slot="{ field }" v-model="input.repeat_password" type="repeat_password"
                  name="repeat_password">
                  <base-input v-bind="field" type="password" placeholder="Konfirmasi Sandi Baru"
                    label="Konfirmasi Sandi Baru" password></base-input>
                </field-form>
              </div>
            </div>
          </form-comp>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.changePw = false">
            Tutup
          </base-button>
          <base-button type="primary" @click="editPassword()">
            Simpan Perubahan
          </base-button>
        </template>
      </modal-comp>

      <!-- Hapus akun -->
      <modal-comp v-model:show="modal.hapusAkun" modal-classes="modal-md">
        <template #header>
          <h3 class="modal-title">Hapus Akun</h3>
        </template>
        <template #body>
          <div class="col-12">
            <field-form v-slot="{ field }" v-model="input.password" type="password" name="password">
              <base-input v-bind="field" type="password" placeholder="Kata sandi" label="Masukkan kata sandi" password>
              </base-input>
            </field-form>
            <p class="text-danger text-sm">
              Apakah anda yakin akan menghapus akun anda? Setelah dihapus, Anda tidak dapat memulihkan akun anda!
            </p>
          </div>
        </template>
        <template #footer>
          <base-button type="secondary" @click="modal.hapusAkun = false">
            Tutup
          </base-button>
          <base-button type="danger" @click="hapusAkun()">Hapus</base-button>
        </template>
      </modal-comp>
    </template>
  </main-layout>
</template>
