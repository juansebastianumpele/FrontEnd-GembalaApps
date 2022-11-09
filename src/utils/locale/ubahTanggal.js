export const ubahTanggal = (tanggal) => new Intl.DateTimeFormat('id-ID', {dateStyle: 'full'}).format(new Date(tanggal));
export const umurTernak = (umur) => {
    const bulan = Math.floor(umur / 30.4);
    const hari = Math.round(umur % 30.4);
    return `${bulan} bln ${hari} hr`;
}
