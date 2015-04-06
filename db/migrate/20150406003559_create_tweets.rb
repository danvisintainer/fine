class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets do |t|
      t.integer :twitter_id
      t.string :text
      t.string :user
      t.string :uri
      t.string :feeling

      t.timestamps null: false
    end
  end
end
