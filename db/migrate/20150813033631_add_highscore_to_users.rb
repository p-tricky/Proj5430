class AddHighscoreToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :highgame, index: true, foreign_key: true
  end
end
