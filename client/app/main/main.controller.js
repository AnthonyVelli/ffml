'use strict';

(function() {

	class MainController {

		constructor(Auth, $state, $mdMedia) {
			this.user = {};
			this.$mdMedia = $mdMedia;
			this.errors = {};
			this.submitted = false;

			this.Auth = Auth;
			this.$state = $state;
		}

		login() {
			this.submitted = true;
			this.Auth.login({
				email: this.user.email,
				password: this.user.password
			})
			.then(() => this.$state.go('home'))
			.catch(err => {
				this.errors.other = err.message; 
			})
		}

		signup() {
			this.submitted = true;
			this.Auth.createUser({
				email: this.user.email,
				password: this.user.password
			})
			.then(() => this.$state.go('home'))
			.catch(err => {
				err = err.data;
				this.errors = {};	
			});
		}
	}

	angular.module('ffmlApp')
	.component('main', {
		templateUrl: 'app/main/main.html',
		controller: MainController
	});
})();
