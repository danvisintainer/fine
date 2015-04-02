class SessionsController < ApplicationController

  def worldwide
    @tweets = get_matching_tweets
  end
end
