// Formulir Transaksi 
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formTransaksi");

  if (!form) return;

  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    // Ambil semua input, select, textarea wajib 
    const fields = form.querySelectorAll("input[required], select[required]");

    fields.forEach((field) => {
      const errorSpan = document.getElementById(field.id + "Error");

      if (field.value.trim() === "") {
        isValid = false;
        field.style.borderColor = "#e74c3c";
        if (errorSpan) {
          errorSpan.textContent = "Must be filled";
          errorSpan.style.display = "block";
        }
      } else {
        field.style.borderColor = "#1abc9c";
        if (errorSpan) {
          errorSpan.style.display = "none";
        }
      }
    });

    // jumlah harus angka positif
    const jumlahField = document.getElementById("jumlah");
    if (jumlahField && jumlahField.value && Number(jumlahField.value) <= 0) {
      isValid = false;
      jumlahField.style.borderColor = "#e74c3c";
      const errorSpan = document.getElementById("jumlahError");
      if (errorSpan) {
        errorSpan.textContent = "Total must be more than 0";
        errorSpan.style.display = "block";
      }
    }

    if (!isValid) {
      formMessage.textContent = "Failed to save! Please complete the datas";
      formMessage.style.color = "#e74c3c";
      return;
    }

    // Jika valid
    const namaTransaksi = document.getElementById("namaTransaksi").value;
    const jumlah = document.getElementById("jumlah").value;
    const kategori = document.getElementById("kategori").value;
    const tanggal = document.getElementById("tanggal").value;

    const transaksiBaru = { namaTransaksi, jumlah, kategori, tanggal };

    const dataLama = JSON.parse(localStorage.getItem("daftarTransaksi")) || [];
    dataLama.push(transaksiBaru);
    localStorage.setItem("daftarTransaksi", JSON.stringify(dataLama));

    formMessage.textContent = "The transaction is saved!";
    formMessage.style.color = "#1abc9c";
    form.reset();
  });
});

// Menampilkan Daftar Transaksi 
function tampilkanDaftarTransaksi() {
  const tbody = document.getElementById("tbodyTransaksi");
  if (!tbody) return;

  const dataTransaksi = JSON.parse(localStorage.getItem("daftarTransaksi")) || [];

  if (dataTransaksi.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No Transaction</td></tr>`;
    return;
  }

  tbody.innerHTML = "";
  dataTransaksi.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td data-label="Nama Transaksi">${item.namaTransaksi}</td>
      <td data-label="Jumlah">Rp ${Number(item.jumlah).toLocaleString("id-ID")}</td>
      <td data-label="Kategori">${item.kategori}</td>
      <td data-label="Tanggal">${item.tanggal}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", tampilkanDaftarTransaksi);

// ===== Validasi Form Login sederhana =====
document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("formLogin");
  if (!loginForm) return;

  const loginMessage = document.getElementById("loginMessage");

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
      loginMessage.textContent = "Username and password must be filled";
      loginMessage.style.color = "#e74c3c";
      return;
    }

    loginMessage.textContent = "Login succeed! Welcome to My Pocket, " + username + ".";
    loginMessage.style.color = "#1abc9c";
    loginForm.reset();
  });
});
