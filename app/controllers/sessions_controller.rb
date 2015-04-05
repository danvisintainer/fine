class SessionsController < ApplicationController

  def worldwide
    gon.tweets = get_matching_tweets
  end

  def worldwidepie
    gon.tweets = get_matching_tweets
  end

end
