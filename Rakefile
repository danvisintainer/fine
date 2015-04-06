# Add your own tasks in files placed in lib/tasks ending in .rake,
# for example lib/tasks/capistrano.rake, and they will automatically be available to Rake.

require File.expand_path('../config/application', __FILE__)
require_relative 'db/seeds.rb'

Rails.application.load_tasks

task :c => :environment do
  require 'pry'
  binding.pry
end

task :seed => :environment do

  FetchTweets.new.call
end