var featuresToTemplates = function(data) {
  for (i=0;i<data.length;i++) {
    if (
      data[i].workflow_status.name == "In Backlog" || 
      data[i].workflow_status.name == "Sprint Backlog"
      )
    {
      $("#backlog-template").tmpl(data[i]).appendTo("#backlog").delay(1500).slideDown("slow");
    } else if (
      data[i].workflow_status.name == "Working..." || 
      data[i].workflow_status.name == "Testing issues" || 
      data[i].workflow_status.name == "Code review"
      )
    {
      $("#in-progress-template").tmpl(data[i]).appendTo("#in-progress").delay(1600).slideDown("slow");
    } else if (
      data[i].workflow_status.name == "On Staging"
      )
    {
      $("#staging-template").tmpl(data[i]).appendTo("#staging").delay(1700).slideDown("slow");
    } else if (
      data[i].workflow_status.name == "Ready to ship" || 
      data[i].workflow_status.name == "Shipped"
      )
    {
      $("#done-template").tmpl(data[i]).appendTo("#done").delay(1800).slideDown("slow")
    }
  }
}

var buildTeamDataArray = function(data) {
  teamData = [];
  for (i=0;i<data.length;i++) {
    if (data[i].assigned_to_user) {
      teamData[i] = {
        "name": data[i].assigned_to_user.name, 
        "workflow_status": data[i].workflow_status.name, 
        "points_assigned": data[i].original_estimate || 0,
        "points_remaining": data[i].remaining_estimate || 0
      };
    } else {
      teamData[i] = {
        "name": "unassigned", 
        "workflow_status": data[i].workflow_status.name, 
        "points_assigned": data[i].original_estimate || 0,
        "points_remaining": data[i].remaining_estimate || 0
      };
    }
  }
}

function teamToTemplate() {
  function sum(numbers) {
    return _.reduce(numbers, function(result, current) {
      return result + parseFloat(current);
    }, 0);
  }
  var releaseTeam = _.chain(teamData)
    .groupBy("name")
    .map(function(value, key) {
      return {
        name: key,
        points_assigned: sum(_.pluck(value, "points_assigned")),
        points_remaining: sum(_.pluck(value, "points_remaining"))
      }
    })
    .value();
  $("#team-template").tmpl(releaseTeam).appendTo("#team").delay(800).slideDown("slow");
}
