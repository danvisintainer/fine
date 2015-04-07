class SessionsController < ApplicationController

  def worldwide
    gon.tweets = Tweet.group(:feeling).count
  end

  def show_word
    @client = client
    @word = params["word"]
    @word_list = Tweet.where(feeling: params["word"]).limit(20)
  end
end
