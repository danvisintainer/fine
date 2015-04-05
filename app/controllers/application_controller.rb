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

  def get_matching_tweets

    r = client.search("\"i feel\"", result_type: "recent").take(600).collect do |t|
      "#{t.text}"
    end

    r.delete_if do |t|
      !!(t =~ /(can't feel)|(RT @)|(how i feel)|(what i feel)|(way i feel)|(feel like)|(feel left)|(feel how)|(feel from)|(feel now)|(feel and)|(feel he)|(feel with)|(feel she)|(feel no)|(feel we)|(feel but)|(feel they)|(feel him)|(feel her)|(feel it)|(feel you)|(feel back)|(feel u)|(feel ya)|(feel for)|(feel my)|(feel our)|(feel their)|(feel out)|(feel that)|(feel this)|(feel the)|(feel self)|(feel when)|(feel than)|(feel i)|(feel what)|(feel a)|(feel to)|(should i feel)|(feel\.)|(feel \.)/i) ||
      !!!(t =~ /feel\b/i)
    end

    result = {}

    r.each do |t|
      puts "(feel) Processing: [#{t}]"
      t.gsub!(/[^a-z\s]/i, '')
      a = t.downcase.split
      next if !a.include?("feel")
      word_index = a.index("feel") + 1
      
      while !!(a[word_index] =~ /so\b|very\b|really\b|rly\b|fucking\b|fuckin\b|extremely\b|completely\b|some\b|as\b|more\b|kinda\b|even\b|somewhat\b|way\b|damn\b|fully\b|(a bit)\b|\bso+\b|\b[a-z]\b|much\b/i) && word_index <= a.length
        word_index += 1
      end

      next if !!(a[word_index] =~ /\@|http|\brn\b|\bon\b|\band\b|\bdo\b|\bwill\b/i) || a[word_index].nil? # remove invalid words

      if result[a[word_index]].nil?
        result[a[word_index]] = 1
        puts "Adding '#{a[word_index]}'"
      else
        result[a[word_index]] = result[a[word_index]] + 1
        puts "Adding to '#{a[word_index]}'"
      end
      
    end

    # binding.pry

    puts "Checking for I'm Feeling"

    r = client.search("\"i'm feeling\"", result_type: "recent").take(600).collect do |t|
      "#{t.text}"
    end

    r.delete_if do |t|
      !!(t =~ /(can't feeling)|(RT @)|(feeling only)|(how i feeling)|(what i feeling)|(way i feeling)|(feeling like)|(feeling left)|(feeling how)|(feeling from)|(feeling now)|(feeling and)|(feeling he)|(feeling with)|(feeling she)|(feeling no)|(feeling we)|(feeling but)|(feeling they)|(feeling him)|(feeling her)|(feeling it)|(feeling you)|(feeling back)|(feeling u)|(feeling ya)|(feeling for)|(feeling my)|(feeling our)|(feeling their)|(feeling out)|(feeling that)|(feeling this)|(feeling the)|(feeling self)|(feeling when)|(feeling than)|(feeling i)|(feeling what)|(feeling a)|(feeling to)|(should i feeling)|(feeling\.)|(feeling \.)/i) ||
      !!!(t =~ /feeling\b/i)
    end

    r.each do |t|
      puts "(feeling) Processing: [#{t}]"
      t.gsub!(/[^a-z\s]/i, '')
      a = t.downcase.split
      next if !a.include?("feeling")
      word_index = a.index("feeling") + 1
      
      while !!(a[word_index] =~ /so\b|very\b|really\b|rly\b|fucking\b|fuckin\b|extremely\b|completely\b|some\b|as\b|more\b|kinda\b|even\b|somewhat\b|way\b|damn\b|fully\b|(a bit)\b|\bso+\b|\b[a-z]\b|much\b/i) && word_index <= a.length
        word_index += 1
      end

      next if !!(a[word_index] =~ /\@|http|\brn\b|\bon\b|\band\b|\bdo\b|\bwill\b/i) || a[word_index].nil? # remove invalid words

      if result[a[word_index]].nil?
        result[a[word_index]] = 1
        puts "Adding '#{a[word_index]}'"
      else
        result[a[word_index]] = result[a[word_index]] + 1
        puts "Adding to '#{a[word_index]}'"
      end
      
    end

    result.delete_if {|k, v| v < 2}
  end



end
