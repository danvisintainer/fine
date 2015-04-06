# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'twitter'

class FetchTweets

  def client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
    end
  end

  def get_matching_tweets

    r = client.search("\"i feel\"", result_type: "recent").take(200)

    r.delete_if do |t|
      !!(t =~ /(can't feel)|(RT @)|(how i feel)|(what i feel)|(way i feel)|(feel like)|(feel left)|(feel how)|(feel from)|(feel now)|(feel and)|(feel he)|(feel with)|(feel she)|(feel no)|(feel we)|(feel but)|(feel they)|(feel him)|(feel her)|(feel it)|(feel you)|(feel back)|(feel u)|(feel ya)|(feel for)|(feel my)|(feel our)|(feel their)|(feel out)|(feel that)|(feel this)|(feel the)|(feel self)|(feel when)|(feel than)|(feel i)|(feel what)|(feel a)|(feel to)|(should i feel)|(feel\.)|(feel \.)/i) ||
      !!!(t =~ /feel\b/i)
    end

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

      result[a[word_index]] = 1
    end

  end

end