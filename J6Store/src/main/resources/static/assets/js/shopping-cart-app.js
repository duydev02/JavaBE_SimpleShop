const app = angular.module("shopping-cart-app", []);

app.controller("shopping-cart-ctrl", function ($scope, $http) {
	/* QUẢN LÝ GIỎ HÀNG */
	$scope.cart = {
		items: [],
		// Thêm vào giỏ hàng
		add(id) {
			var item = this.items.find(item => item.id == id);
			if (item) {
				item.qty++;
				this.saveToLocalStorage();
			}
			else {
				$http.get(`/rest/products/${id}`).then(resp => {
					resp.data.qty = 1;
					this.items.push(resp.data);
					this.saveToLocalStorage();
				})
			}
		},
		// Xóa sản phẩm khỏi giỏ hàng
		remove(id) {
			var index = this.items.findIndex(item => item.id == id);
			this.items.splice(index, 1);
			this.saveToLocalStorage();
		},
		//Xóa sạch các mặt hàng trong giỏ
		clear() {
			this.items = [];
			this.saveToLocalStorage();
		},
		// Tính thành tiền của 1 sản phẩm
		amt_of(item) { },
		// Tính thành tiền các mặt hàng trong giỏ
		get count() {
			return this.items
				.map(item => item.qty)
				.reduce((total, qty) => total += qty, 0);
		},
		// Tổng thành tiền các mặt hàng trong giỏ
		get amount() {
			return this.items
				.map(item => item.qty * item.price)
				.reduce((total, qty) => total += qty, 0);
		},
		// Lưu giỏ hàng vào local storage
		saveToLocalStorage() {
			var json = JSON.stringify(angular.copy(this.items));
			localStorage.setItem("cart", json);
		},
		// Đọc giỏ hàng từ local storage
		loadFromLocalStorage() {
			var json = localStorage.getItem("cart");
			this.items = json ? JSON.parse(json) : [];
		}
		
	}
	
	$scope.cart.loadFromLocalStorage();
	
	$scope.order = {
		createDate: new Date(),
		address: "",
		account: {username: $("#username").text()},
		get orderDetails(){
			return $scope.cart.items.map(item => {
				return {
					product:{id: item.id},
					price: item.price,
					quantity: item.qty
				}
			});
		},
		purchase() {
			var order = angular.copy(this);
			// Thực hiện đặt hàng
			$http.post("/rest/orders", order).then(resp => {
				alert("Đặt hàng thành công!");
				$scope.cart.clear();
				location.href = "/order/detail/" + resp.data.id;
			}).catch(error => {
				alert("Đặt hàng lỗi!");
				console.log(error);
			})
		}
	}
});

app.controller("log-up-ctrl", function($scope, $http) {
	$scope.role = {
		id: 'STAF',
		name: 'Staffs'
	}
	$scope.form = {
		photo: 'user.png'
	};
	$scope.signup = function() {
		var item = angular.copy($scope.form);
		var item2 = angular.copy($scope.role);
		if ($scope.form.password == $("#confirmPassword").val()) {
			$http.post(`/rest/accounts`, item).then(resp => {
				alert("Đăng ký thành công!");
			}).catch(error => {
				alert("Đăng ký thất bại!");
				console.log("Error", error);
			});

			$scope.grant_authority($scope.form.username);
		} else {
			alert("Đăng ký thất bại!");
			console.log("Confirm password do not correct");
		}
	}
	// Thêm mới authority
	$scope.grant_authority = function (username) {
		$http.post(`/rest/authorities/register/${username}`).then(resp => {
			alert("Cấp quyền sử dụng thành công");
		}).catch(error => {
			alert("Cấp quyền sử dụng thất bại");
			console.log("Error", error);
		});
	}
});