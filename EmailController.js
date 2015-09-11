angular.module("myMail", [])
	   .controller(EmailController, EmailController)


function EmailController($scope) {
	  var vm = this;
	  vm.composeEmail = {};
	  vm.activeTab = "inbox";
	  vm.isPopupVisible = false;
	  vm.isComposePopupVisible = false;
	  vm.showPopup = showPopup;
	  vm.closePopup = hidePopup;
	  vm.showComposePopup = showComposePopup;
	  vm.closeComposePopup =  closeComposePopup;
	  vm.sendEmail = sendEmail;
	  vm.forward = forwardMail;
	  vm.reply = replyMail;

	  ///////
	  function showPopup(email) {
	  	vm.isPopupVisible = true;
	  	vm.selectedEmail = email;
	  }

	  function hidePopup() {
	  	vm.isPopupVisible = false;
	  }

	  function showComposePopup() {
	    vm.composeEmail = {};
	  	vm.isComposePopupVisible = true;
	  }

	  function closeComposePopup() {
	  	vm.isComposePopupVisible = false;
	  }

	  function sendEmail() {
	  	vm.isComposePopupVisible = false;
	  	vm.composeEmail.date = new Date();
	  	vm.sentEmails.splice(0,0,vm.composeEmail);
	  };

	  function forwardMail() {
	  	vm.isPopupVisible = false;
	  	vm.composeEmail = {};
	  	angular.copy(vm.selectedEmail, vm.composeEmail);
	  	vm.composeEmail.body = 
	        "\n-------------------------------\n" 
	        + "from: " + vm.composeEmail.from + "\n"
	        + "sent: " + vm.composeEmail.date + "\n"
	        + "to: " + vm.composeEmail.to + "\n"
	        + "subject: " + vm.composeEmail.subject + "\n"
	        + vm.composeEmail.body;
	    vm.composeEmail.subject = "FW: " + vm.composeEmail.subject;  
	    vm.composeEmail.to = vm.composeEmail.from;  
	    vm.composeEmail.from = "me";
	    vm.isComposePopupVisible = true;
	  }

	  function replyMail() {
	  	vm.isPopupVisible = false;
	  	vm.composeEmail = {};
	  	angular.copy(vm.selectedEmail, vm.composeEmail);
	  	vm.composeEmail.body = 
	        "\n-------------------------------\n" 
	        + "from: " + vm.composeEmail.from + "\n"
	        + "sent: " + vm.composeEmail.date + "\n"
	        + "to: " + vm.composeEmail.to + "\n"
	        + "subject: " + vm.composeEmail.subject + "\n"
	        + vm.composeEmail.body;
	    vm.composeEmail.subject = "RE: " + vm.composeEmail.subject;  
	    vm.composeEmail.to = vm.composeEmail.from;  
	    vm.composeEmail.from = "me";
	    vm.isComposePopupVisible = true;
	  }

	  ////////
	  vm.emails = [
	    { 
	    	from: 'John',
	    	to: 'me', 
	    	subject: 'I love angular', 
	    	date: 'Jan 1',
	    	body: 'hello world!' 
	    },
	    { 
	    	from: 'Jack', 
	    	to: 'me', 
	    	subject: 'Angular and I are just friends', 
	    	date: 'Feb 15',
	    	body: 'just kidding' 
	    },
	    { 
	    	from: 'Ember', 
	    	to: 'me', 
	    	subject: 'I hate you Angular!', 
	    	date: 'Dec 8',
	    	body: 'wassup dude' 
	    }
	  ];

	  ////// sent mail data

	  vm.sentEmails = [];

}