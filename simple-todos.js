MyTasks = new Mongo.Collection("mongoTable");

if (Meteor.isClient) 
{
  // counter starts at 0
  Session.setDefault('counter', 3);

  Template.hello.helpers
  ({
    counter: function () 
    {
      return Session.get('counter');
    }
  });

  Template.hello.events
  ({
    'click button': function () 
    {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.body.helpers
  ({
  tasks: 
  [
    { text: "This is task 1" },
    { text: "This is task 2" },
    { text: "This is task 3" },
    { text: "End of tasks" }
  ]
  });

  // This code only runs on the client
  Template.body.helpers
  ({
    mongoTasks: function () 
    {
      return MyTasks.find({}, {sort: {createdAt: +1}});  // Sort -1 or +1
    }
  });

  Template.body.events
  ({
    "submit .new-task": function (event) 
    {
      // Prevent default browser form submit
      event.preventDefault();
 
      // Get value from form element
      var text = event.target.textName.value;
 
      // Insert a task into the collection
      MyTasks.insert
      ({
        text: text,
        createdAt: new Date() // current time
      });
 
      // Clear form
      event.target.textName.value = "";
    }
  });

   Template.task.events
   ({
    "click .toggle-checked": function () 
    {
      // Set the checked property to the opposite of its current value
      MyTasks.update(this._id, {$set: {checked: ! this.checked}});
    },

    "click .delete": function () 
    {
      MyTasks.remove(this._id);
    }
  });
}

if (Meteor.isServer) 
{
  Meteor.startup(function () 
  {
    // code to run on server at startup
  });
}
