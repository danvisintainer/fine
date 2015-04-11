class SessionsController < ApplicationController

  def worldwide
    binding.pry
    # gon.tweets = Tweet.group(:feeling).count

    params["days"] = 0 if params["days"].nil?

    gon.tweets = Tweet.where("DATE(created_at) <= ?", Date.today - params["days"]).group(:feeling).count

    @today_count = Tweet.where("created_at >= ?", Time.zone.now.beginning_of_day).count
    @positive_count = Tweet.where("created_at >= ?", Time.zone.now.beginning_of_day).where(polarity: "P").count
    @negative_count = Tweet.where("created_at >= ?", Time.zone.now.beginning_of_day).where(polarity: "N").count
  end

  def show_word
    @client = client
    @word = params["word"]
    @word_list = Tweet.where(feeling: params["word"]).limit(20)

    this_past_week = []
    for i in 0..6
      this_past_week << [(Date.today - i).strftime('%a'), Tweet.where("DATE(created_at) = ?", Date.today - i).where(feeling: @word).count]
    end

    gon.this_past_week = this_past_week
  end
end
