import * as singleSpa from 'single-spa';
import { environment } from '../environments/environment';
// <block-oauth2-authorization-service-start>
var loginGuard = require('./login-guard.js');
loginGuard.checkSecuritContext(
	function() {
		singleSpa.declareChildApplication('userProfileMgmt', () => import('../user-profile-management/app.js'), hashPrefix('/userProfileMgmt'));
		// <block-oauth2-authorization-service-end>
		singleSpa.declareChildApplication('dashboard', () => import('../dashboard/app.js'), hashPrefix('/dashboard'));		
		singleSpa.declareChildApplication('reactApp', () => import('../react-app/app.js'), hashPrefix('/reactApp'));

		singleSpa.start();

		setUserName('Anonymous User');
		// <block-oauth2-authorization-service-start>
		setUserName(loginGuard.getPrincipal());
	},
	function() {
		window.location.href = environment.loginUrl;
	}
);
// <block-oauth2-authorization-service-end>

function hashPrefix(prefix) {
	return function(location) {
		return location.hash.startsWith(`#${prefix}`);
	}
}

function setUserName(principal) {
	document.getElementById('txtUsername').innerText = principal.lastName;
}