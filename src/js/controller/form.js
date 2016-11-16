const URL = "https://class-server.herokuapp.com/collections/cchico_contacts/";

function FormController ($scope, $http) {
      $scope.contacts = [];
      $scope.contact = {};
      $scope.errors = {};

function init() {
  $http.get(URL).then(function (resp){
      console.log(resp.data);
      $scope.contacts = resp.data;
  });
};

init();

$scope.validateForm = function() {
        console.log($scope.validateName($scope.contact.name))
        console.log($scope.validateEmail($scope.contact.email))
        console.log($scope.validateUrl($scope.contact.url))
        console.log($scope.validateMssg($scope.contact.mssg))
    if ( ($scope.validateName($scope.contact.name))&&
        ($scope.validateEmail($scope.contact.email))&&
        ($scope.validateUrl($scope.contact.url))&&
        ($scope.validateMssg($scope.contact.mssg)) )
      {
      return false;
    }
      return true;
};

$scope.validateName = function (name) {
  // console.log($scope.contact.name)
  if (!name) {
    $scope.errors.name = "Name cannot be left empty"
    return false;
  } else {
    $scope.errors.name = ""
    return true;
  }
};

$scope.validateEmail = function (email) {
  if (!email){
      $scope.errors.email = "Email cannot be left empty ";
      return false;
    }
    else
     if (!email.includes("@")) {
      $scope.errors.email ="Email must include @";
      return false
    } else {
        $scope.errors.email ="";
          return true;
    }
  };

  $scope.validateUrl = function (url) {
    if (!url) {
        $scope.errors.url = "Website cannot be empty ";
        return false;
      }
      else if (!url.startsWith('http://') && !url.startsWith('https://')) {
        $scope.errors.url = "Website must start with http:// or https://";
        return false;
      } else {
        $scope.errors.url = "";
          return true;
      }
  };

  $scope.validateMssg = function (mssg) {
    if (!mssg || mssg === '') {
      $scope.errors.mssg = "Message cannot be left empty"
      return false;
    } else {
      $scope.errors.mssg = "";
      return true;
    }
  };

$scope.addContact = function (contact) {
        $http.post(URL, contact).then(function(resp) {
          let contact = resp.data;
          $scope.contacts.unshift(contact);
            // $scope.contacts.push(contact);
        });
};

$scope.deleteMe = function (contact) {
  $http.delete(URL + contact._id).then(function (resp) {
    // console.log(resp);
    $scope.contacts = $scope.contacts.filter(function(x) {
        return x._id !== contact._id;
    });
//  $scope.contacts = $scope.contacts.filter(x ==> x._id !== contact._id);
  })
}

};

FormController.$inject = ['$scope', '$http'];
export { FormController };
