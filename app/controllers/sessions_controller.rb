class SessionsController < ApplicationController

  def worldwide
    gon.tweets = Tweet.group(:feeling).count

    @today_count = Tweet.where("created_at >= ?", Time.zone.now.beginning_of_day).count
    @positive_count = Tweet.where("created_at >= ?", Time.zone.now.beginning_of_day).where(polarity: "P").count
    @negative_count = Tweet.where("created_at >= ?", Time.zone.now.beginning_of_day).where(polarity: "N").count

  end

  def show_word
    @client = client
    @word = params["word"]
    @word_list = Tweet.where(feeling: params["word"]).limit(20)
  end
end
