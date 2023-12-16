var product = new Vue({
  el: "#app",
  data: {
    products: [
      {
        productId: 1,
        productTitle: "White Sneakers",
        productPrice: 900000,
        discountPrice: 500000,
        productImage: "image/1683139150-8-6452aa4a0a4d1.png",
        sizeOptions: [38, 39, 40],
      },

      {
        productId: 2,
        productTitle: "Homyped",
        productPrice: 1000000,
        discountPrice: 400000,
        productImage: "image/1683139150-8-6452aa4a0a4d1.png",
        sizeOptions: [36, 38, 42],
      },
    ],

    selectedShoes: {
      productId: 1,
      productTitle: "",
      productPrice: 0,
      discountPrice: 0,
      productImage: "",
      sizeOptions: [],
    },
    plusMessage:
      "Klik tombol ini atau tekan tombol panah ke atas pada kolom disamping!",
    minusMessage:
      "Klik tombol ini atau tekan tombol panah ke bawah pada kolom disamping!",
    carts: [
      // {
      //   id: 0,
      //   productTitle: "Testttt",
      //   quantity: 1,
      // },

      // {
      //   id: 1,
      //   productTitle: "asdasdasdasdasdasd",
      //   quantity: 1,
      // },
    ],
    qty: 0,
    specialRequest: "",
    packaging: "Normal",
    size: 0,
  },
  methods: {
    addToCart() {
      for (var i = 0; i < this.carts.length; i++) {
        if (this.selectedShoes.productId === this.carts[i].id) {
          this.carts[i].quantity += parseInt(this.qty);
          this.resetData();
          return;
        }
      }
      this.carts.push({
        id: this.selectedShoes.productId,
        productTitle: this.selectedShoes.productTitle,
        quantity: parseInt(this.qty),
        discountPrice: this.selectedShoes.discountPrice,
        sizeOptions: parseInt(this.size),
        packaging: this.packaging,
        specialRequest: this.specialRequest
      });
      this.resetData();
    },
    removeCart(id){
      let indexToRemove = this.carts.findIndex(function(cart) {
        return cart.id === id;
      });
    
      if (indexToRemove !== -1) {
        this.carts.splice(indexToRemove, 1);
      }

    },
    selectShoes(id) {
      let data = this.products.find(function (element) {
        return element.productId === id;
      });
      this.selectedShoes = data;
    },
    qty_minus() {
      if (this.qty > 0) {
        this.qty -= 1;
      }
    },
    qty_plus() {
      this.qty += 1;
    },

    buyNow() {
      window.location.href =
        "https://wa.me/62895805000702?text=Hallo%2C%20Saya%20ingin%20memesan%20%0AProduk%3A%20" +
        this.selectedShoes.productTitle +
        "%0AUkuran%3A%20" +
        this.size +
        "%0AJumlah%3A%20" +
        this.qty +
        "%0ASpecial%20Request%3A%20" +
        this.specialRequest +
        "%0APackaging%3A%20" +
        this.packaging +
        "%0A%0ATerimakasih";
    },
    cartBuy() {
      var message = "Hallo, saya ingin memesan";
      for (const element of this.carts) { 
        message += "%0AProduk%3A%20" + element.productTitle;
        message += "%0AUkuran%3A%20" + element.sizeOptions;
        message += "%0AJumlah%3A%20" + element.quantity;
        message += "%0ASpecial%20Request%3A%20" + element.specialRequest;
        message += "%0APackaging%3A%20" + element.packaging;
      }

      message += "%0ATerima kasih";
      
      window.location.href = "https://wa.me/62895805000702?text=" + message
    },
    resetData() {
      this.qty = 0;
      this.specialRequest = "";
      this.size = 0;
      this.packaging = "Normal";
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
  computed: {
    getTotalPrice: function() {
      return this.carts.reduce((total, cart) => {
        return total + (cart.quantity * cart.discountPrice);
      }, 0);
    }
  }
});
