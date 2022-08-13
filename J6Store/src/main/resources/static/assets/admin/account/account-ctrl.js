app.controller("account-ctrl", function ($scope, $http) {
	$scope.items = [];
	$scope.form = {};

	$scope.initialize = function() {
		// load accounts
		$http.get("/rest/accounts").then(resp => {
			$scope.items = resp.data;
			console.log($scope.items);
		});
	}
	// Khởi đầu
	$scope.initialize();

	// Xóa form
	$scope.reset = function () {
		$scope.form = {
			photo: 'user.png'
		};
	}
	$scope.reset();
	// Hiển thị lên form
	$scope.edit = function (item) {
		$scope.form = angular.copy(item);
		$('.nav-tabs button[data-bs-target="#home"]').tab('show');
		$('#confirmPassword').val($scope.form.password);
	}
	// Thêm tài khoản mới
	$scope.create = function () {
		if ($scope.form.password == $("#confirmPassword").val()) {
			var item = angular.copy($scope.form);
			console.log(item);
			$http.post(`/rest/accounts`, item).then(resp => {
				$scope.items.push(resp.data);
				$scope.reset();
				alert("Thêm mới account thành công!");
			}).catch(error => {
				alert("Lỗi thêm mới account!");
				console.log("Error", error);
			});
			
			console.log($scope.form.username);
			$scope.grant_authority($scope.form.username);
		} else {
			alert("Thêm mới thất bại!");
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
	// Cập nhật sản phẩm
	$scope.update = function () {
		var item = angular.copy($scope.form);
		$http.put(`/rest/accounts/${item.username}`, item).then(resp => {
			var index = $scope.items.findIndex(p => p.username == item.username);
			$scope.items[index] = item;
			alert("Cập nhật tài khoản thành công!");
		}).catch(error => {
			alert("Lỗi cập nhật tài khoản!");
			console.log("Error", error);
		});
	}
	// Xóa sản phẩm
	$scope.delete = function (item) {
		var result = confirm("Bạn có muốn xóa tài khoản này?");
		if (result) {
			$http.delete(`/rest/accounts/${item.username}`, item).then(resp => {
				var index = $scope.items.findIndex(p => p.username == item.username);
				$scope.items.splice(index, 1);
				$scope.reset();
				alert("Xóa sản phẩm thành công!");
			}).catch(error => {
				alert("Lỗi xóa sản phẩm!");
				console.log("Error", error);
			})
		}
	}
	
	// Upload hình
	$scope.imageChanged = function (files) {
		var data = new FormData();
		data.append('file', files[0]);
		$http.post('/rest/upload/avatar', data, {
			transformRequest: angular.identity,
			headers: { 'Content-Type': undefined }
		}).then(resp => {
			$scope.form.photo = resp.data.name;
		}).catch(error => {
			alert("Lỗi upload hình ảnh");
			console.log("Error", error);
		});
	}
	
	$scope.pager = {
		page: 0,
		size: 10,
		get items() {
			var start = this.page * this.size;
			return $scope.items.slice(start, start + this.size);
		},
		get count() {
			return Math.ceil(1.0 * $scope.items.length / this.size);
		},
		first() {
			this.page = 0;
		},
		prev() {
			this.page--;
			if (this.page < 0) {
				this.last();
			}
		},
		next() {
			this.page++;
			if (this.page > this.count - 1) {
				this.first();
			}
		},
		last() {
			this.page = this.count - 1;
		}
	}
});