const URL = "https://class-server.herokuapp.com/collections/cchico_contacts/";

function FormController ($scope, $http) {
      $scope.contacts = [];
      $scope.errors = {};

function init() {
  $http.get(URL).then(function(resp){
      console.log(resp.data);
      $scope.contacts = resp.data;
  });
};

init();

$scope.validateName = function(name) {
  if (name === '') {
    $scope.errors.name = "Name cannot be left empty"
  };
};

$scope.validateEmail = function(email) {
  if (!email.includes('@')) {
    $scope.errors.email = "Email must have/contain an '@'"
    return false;
  }
  if (email === '') {
    $scope.errors.email = "Email cannot be left empty"
  }
  return true;
  };

$scope.validateUrl = function(url) {
  if (!url.startsWith('http')) {
    $scope.errors.url = "Website must start with http://"
    return false;
  }

  if (url === '') {
    $scope.errors.url = '';
  }
  return true;
};

$scope.validateMssg = function(mssg) {
  if (mssg === '') {
    $scope.errors.mssg = "Message cannot be left empty"
  };
};

$scope.addContact = function(contact) {
  $http.post(URL, contact).then(function (resp) {
    let contact = resp.data;
    $scope.contacts.push(contact);
    console.log($scope.contacts);
  });
  // if ($scope.validateName(contact.name)) {
// }
console.log("hello from addContact function");
};


};



FormController.$inject = ['$scope', '$http'];
export { FormController };
