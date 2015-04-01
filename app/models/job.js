var mongoose = require('mongoose');
var Promise = require('bluebird');

var jobSchema = mongoose.Schema({
  title: { type: String },
  description: { type: String }
});

var Job = mongoose.model('Job', jobSchema);

// NOTE export this seed function until we've added POSTing capability to the api
function seedJobs(resolve) {
  return new Promise(function (resolve, reject) {
    Job.find({})
      .exec(function (err, collection) {
        if (collection.length === 0) {
          Job.create({ title: 'Cook', description: 'You will be making bagels' });
          Job.create({ title: 'Waiter', description: 'You will be putting food on tables' });
          Job.create({ title: 'Programmer', description: 'You will be typing, googling and arguing' });
          Job.create({
            title: 'Blacksmith', description: 'You will be making horse shoes and axe heads'
          }, resolve);
        }
      });
  });
};

module.exports = {
  seedJobs: seedJobs
};
