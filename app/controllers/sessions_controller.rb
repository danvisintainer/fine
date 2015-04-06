class SessionsController < ApplicationController

  def worldwide
    gon.tweets = Tweet.group(:feeling).count
  end
end
