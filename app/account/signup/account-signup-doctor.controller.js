(function() {
    'use strict';

    angular.module('app.account')
           .controller('accountSignUpDoctorController', accountSignUpDoctorController);

    accountSignUpDoctorController.$inject = [
        'memberDoctorService',
        'Logger'
    ];

    function accountSignUpDoctorController(memberDoctorService, Logger) {
        // Logger object
        var logger = Logger.getInstance('app - account - signup - doctor');
        var vm = this;

        // state variable: doctor
        vm.doctor = { user_info : {} };
        vm.signUp = signUp;

        /* public functions */
        function signUp() {
            var promise;
            var signUpSuccessCallback = (function() {
                return function(account) {
                    // TODO add handling code
                    // create failed
                    if (!account) {
                        logger.error('signUp', 'Invalid account in response!');
                        return;
                    }

                    logger.log('signUp', 'Sign Up Succeeded');
                    // create succeeded
                };
            })();
            var signUpFailCallback = (function() {
                return function(error) {
                    logger.error('signUp', 'Sign Up Failed');

                    // if error message isn't empty
                    if (error.message)
                        logger.debug('signUp', 'Error Message: ' + error.message);
                };
            })();

            // TODO check doctor fields
            if (!vm.doctor.username || !vm.doctor.password || !vm.doctor.email || !vm.doctor.confirmPassword) {
                logger.error('signUp', 'Missing credentials: username, password, or email');
                logger.debug('signUp', 'Username: {0}, Password: {1}, Email: {2}, Confirm Password: {3}',
                                        [ vm.doctor.username, vm.doctor.password, vm.doctor.email, vm.doctor.confirmPassword ]);
                return;
            }

            if (vm.doctor.password !== vm.doctor.confirmPassword) {
                logger.error('signUp', 'Password should be the same as Confirm Password');
                logger.debug('signUp', 'Password: {0}, Confirm Password: {1}', [ vm.doctor.password, vm.doctor.confirmPassword ]);
                return;
            }

            var info = vm.doctor.user_info;

            // FIXME gender field temperarily disabled
            if (!info.name || !info.phone_number || !info.address ||
                !info.category || !info.current_hospital || !info.title || !info.college ||
                !info.specialty || !info.available_time) {
                logger.error('signUp', 'Missing doctor info fields!');
            }

            if (!info.facebook_account) {
                info.facebook_account = '';
            }

            if (!info.blog_url) {
                info.blog_url = '';
            }

            logger.log('signUp', 'Doctor account information validation done! Signing Up ...');
            try {
                promise = memberDoctorService.createDoctor(vm.doctor);
                promise
                    .then(signUpSuccessCallback)
                    .catch(signUpFailCallback);
            } catch (error) {
                // TODO input error
                logger.error('signUp', 'Invalid Input: Credentials');
            }
        }
    }

})();