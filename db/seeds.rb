# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require 'twitter'
require 'pry'

class FetchTweets

  def call
    get_matching_tweets
  end

  def client
    @client ||= Twitter::REST::Client.new do |config|
      config.consumer_key = ENV['TWITTER_KEY']
      config.consumer_secret = ENV['TWITTER_SECRET']
    end
  end

  def get_matching_tweets

    r = client.search("\"i feel\"", result_type: "recent").take(200)

    r.delete_if do |t|
      !!(t.full_text =~ /(can't feel)|(RT @)|(how i feel)|(what i feel)|(way i feel)|(feel like)|(feel left)|(feel how)|(feel from)|(feel now)|(feel and)|(feel he)|(feel with)|(feel she)|(feel no)|(feel we)|(feel but)|(feel they)|(feel him)|(feel her)|(feel it)|(feel you)|(feel back)|(feel u)|(feel ya)|(feel for)|(feel my)|(feel our)|(feel their)|(feel out)|(feel that)|(feel this)|(feel the)|(feel self)|(feel when)|(feel than)|(feel i)|(feel what)|(feel a)|(feel to)|(should i feel)|(feel\.)|(feel \.)/i) ||
      !!!(t.full_text =~ /feel\b/i)
    end

    r.each do |t|
      puts "Processing: [#{t.full_text}]"
      puts "Splitting #{t.full_text.downcase.gsub(/[^a-z\s]/i, '')}"
      a = t.full_text.downcase.gsub(/[^a-z\s]/i, '').split
      next if !a.include?("feel")
      word_index = a.index("feel") + 1
      
      while !!(a[word_index] =~ /so\b|very\b|really\b|rly\b|fucking\b|fuckin\b|extremely\b|completely\b|some\b|as\b|more\b|kinda\b|even\b|somewhat\b|way\b|damn\b|fully\b|personally\b|(a bit)\b|\bso+\b|\b[a-z]\b|much\b/i) && word_index <= a.length
        word_index += 1
      end

      next if !!(a[word_index] =~ /\@|http|\brn\b|\bon\b|\band\b|\bdo\b|\bwill\b|\blol\b/i) || a[word_index].nil? # remove invalid words

      if !!(a[word_index] =~ /happy|go+d|\bbless|proud|great|good|better|amazing|fantastic|warm|special|\blove|young|fine|clean|pretty|new|encouraged|\bon\b|right|comfortable|productive|determined|\brespect|\bsmart|\bhonor|\bpeace|\bsuper|safe|free|complete|\bsuccess/i)
        polarity = 'P'
      elsif !!(a[word_index] =~ /bad|sad|\bsick|terrible|awful|horrible|cold|defeated|discouraged|\bdisgust|lost|alone|old|nervous|ashamed|\bshame|guilty|sorry|stupid|depressed|hungover|off|dumb|gross|uncomfortable|worse|miserable|weird|useless|\bdisrespect|cheated|tricked|betrayed|low|drained|fat|\bshit|empty|awkward|mean|lonely/i)
        polarity = 'N'
      else
        polarity = 'U'
      end
        
      puts "Adding #{polarity}: #{a[word_index]}"
      
      Tweet.create(twitter_id: t.id.to_s, text: t.full_text, user: t.user.screen_name, uri: t.uri.to_s, feeling: a[word_index], polarity: polarity)
    end

    Tweet.destroy_all(['created_at < ?', 8.days.ago])
    puts "Tweet fetch completed without errors."
  end

end