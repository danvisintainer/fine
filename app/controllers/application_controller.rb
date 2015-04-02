class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
    end
  end

  def go

    r = client.search("\"i feel\"", result_type: "recent").take(200).collect do |t|
      "#{t.text}"
    end

    r.delete_if do |t|
      !!(t =~ /(can't feel)|(RT @)|(how i feel)|(what i feel)|(way i feel)|(feel like)|(feel it)|(feel you)|(feel u)|(feel ya)|(feel for)|(feel my)|(feel that)|(feel this)|(feel the)|(feel when)|(feel i)|(feel a)|(feel to)|(should i feel)|(feel\.)/i) ||
      !!!(t =~ /feel\b/i)
    end


    result = {}

    r.each do |t|
      puts "Processing: [#{t}]"
      a = t.downcase.split
      word_index = a.index("feel") + 1
      

      while !!(a[word_index] =~ /so\b|very\b|really\b|extremely\b|completely\b|as\b|more\b|kinda\b/i) && word_index <= a.length
        word_index += 1
      end

      next if !!(a[word_index] =~ /\@/i) || a[word_index].nil? # remove invalid words

      if result[a[word_index]].nil?
        result[a[word_index]] = 1
        puts "Adding '#{a[word_index]}'"
      else
        result[a[word_index]] = result[a[word_index]] + 1
        puts "Adding to '#{a[word_index]}'"
      end
    end

  end



end
